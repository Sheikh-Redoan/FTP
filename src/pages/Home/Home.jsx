import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Stage, Layer, Line } from "react-konva";
import Konva from "konva"; // Import Konva
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/common/KonvaPitchImage";
import KonvaToolbar from "../../components/common/KonvaToolbar";
import { createSvgDataUrl } from "../../utils/svgUtils";
import EditableText from "../../components/common/EditableText";

Konva._fixTextRendering = true; // Add this line to fix potential rendering issues

const GUIDELINE_OFFSET = 5;

const Home = () => {
  const {
    pitch,
    draggedEquipmentSrc,
    setDraggedEquipmentSrc,
    playerColor,
    setAddEquipment,
  } = useSvg();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const { width, height } = useDimensions(containerRef);

  const [droppedEquipment, setDroppedEquipment] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);

  const [guides, setGuides] = useState([]);

  const textColors = useMemo(
    () => [
      { bg: "#000000", line: "#000000" },
      { bg: "#FFFFFF", line: "#FFFFFF" },
      { bg: "#FDE100", line: "#FDE100" },
      { bg: "#DC052D", line: "#DC052D" },
      { bg: "#22274A", line: "#22274A" },
      { bg: "#6B7280", line: "#6B7280" },
    ],
    []
  );

  const handleTextColorChange = (colorIndex) => {
    const selectedItem = droppedEquipment.find(
      (item) => item.id === selectedId
    );
    if (!selectedItem || selectedItem.type !== "text") return;

    const newColor = textColors[colorIndex].line;
    const items = droppedEquipment.map((item) =>
      item.id === selectedId ? { ...item, fill: newColor } : item
    );
    setDroppedEquipment(items);
  };

  const addEquipmentToStage = useCallback(
    (svgContent, type) => {
      const dataUrl = createSvgDataUrl(svgContent);
      const newId = Date.now().toString();

      const newEquipment = {
        id: newId,
        dataUrl,
        x: width / 2 - 50,
        y: height / 2 - 50,
        width: 100,
        height: 100,
        rotation: 0,
        locked: false,
        type: type,
        name: "object",
      };

      setDroppedEquipment((prev) => [...prev, newEquipment]);
      setSelectedId(newId);
    },
    [width, height]
  );

  useEffect(() => {
    setAddEquipment(() => (item, type) => {
      if (type === "text") {
        const newId = Date.now().toString();
        const newText = {
          id: newId,
          x: width / 2 - 100,
          y: height / 2 - 50,
          rotation: 0,
          locked: false,
          name: "object",
          ...item,
        };
        setDroppedEquipment((prev) => [...prev, newText]);
        setSelectedId(newId);
      } else {
        addEquipmentToStage(item, type);
      }
    });
  }, [setAddEquipment, addEquipmentToStage, width, height]);

  useEffect(() => {
    if (
      JSON.stringify(history[historyStep]) !== JSON.stringify(droppedEquipment)
    ) {
      const newHistory = history.slice(0, historyStep + 1);
      setHistory([...newHistory, droppedEquipment]);
      setHistoryStep(newHistory.length);
    }
  }, [droppedEquipment, history, historyStep]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedEquipmentSrc) return;

    stageRef.current.setPointersPositions(e);
    const position = stageRef.current.getPointerPosition();
    const dataUrl = createSvgDataUrl(draggedEquipmentSrc.content);
    const newId = Date.now().toString();

    const newEquipment = {
      id: newId,
      dataUrl,
      x: position.x,
      y: position.y,
      width: 100,
      height: 100,
      rotation: 0,
      locked: false,
      type: draggedEquipmentSrc.type,
      text: draggedEquipmentSrc.text,
      name: "object",
    };

    setDroppedEquipment((prev) => [...prev, newEquipment]);
    setDraggedEquipmentSrc(null);
    setSelectedId(newId);
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleItemChange = (newAttrs) => {
    const items = droppedEquipment.map((item) =>
      item.id === newAttrs.id ? newAttrs : item
    );
    setDroppedEquipment(items);
  };

  const handleSelectEquipment = (id) => {
    setSelectedId(id);
    const equipment = droppedEquipment.find((item) => item.id === id);
    if (equipment && equipment.type === "player" && !equipment.locked) {
      const newSvgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="${playerColor}" stroke="white" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="30">${equipment.text}</text></svg>`;
      const newDataUrl = createSvgDataUrl(newSvgContent);

      const updatedEquipment = droppedEquipment.map((item) => {
        if (item.id === id) {
          return { ...item, dataUrl: newDataUrl };
        }
        return item;
      });
      setDroppedEquipment(updatedEquipment);
    }
  };

  const selectedEquipment = droppedEquipment.find(
    (item) => item.id === selectedId
  );

  const handleUndo = () => {
    if (historyStep > 0) {
      const newHistoryStep = historyStep - 1;
      setHistoryStep(newHistoryStep);
      setDroppedEquipment(history[newHistoryStep]);
      setSelectedId(null);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const newHistoryStep = historyStep + 1;
      setHistoryStep(newHistoryStep);
      setDroppedEquipment(history[newHistoryStep]);
      setSelectedId(null);
    }
  };

  const handleDuplicate = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      const newId = Date.now().toString();
      const duplicatedItem = {
        ...selectedEquipment,
        id: newId,
        x: selectedEquipment.x + 20,
        y: selectedEquipment.y + 20,
      };
      setDroppedEquipment((prev) => [...prev, duplicatedItem]);
      setSelectedId(newId);
    }
  };

  const handleDelete = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      setDroppedEquipment((prev) =>
        prev.filter((item) => item.id !== selectedId)
      );
      setSelectedId(null);
    }
  };

  const handleLockUnlock = () => {
    if (selectedEquipment) {
      setDroppedEquipment((prev) =>
        prev.map((item) =>
          item.id === selectedId ? { ...item, locked: !item.locked } : item
        )
      );
    }
  };

  const handleRotate = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      setDroppedEquipment((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? { ...item, rotation: (item.rotation + 45) % 360 }
            : item
        )
      );
    }
  };

  // snapping logic
  const getLineGuideStops = (skipShape) => {
    const vertical = [0, width / 2, width];
    const horizontal = [0, height / 2, height];

    stageRef.current.find(".object").forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      const box = guideItem.getClientRect();
      vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
      horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    };
  };

  const getObjectSnappingEdges = (node) => {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: "start",
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: "center",
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: "end",
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: "start",
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: "center",
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: "end",
        },
      ],
    };
  };

  const getGuides = (lineGuideStops, itemBounds) => {
    const resultV = [];
    const resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    const guides = [];
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: "V",
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: "H",
        snap: minH.snap,
      });
    }
    return guides;
  };

  const handleDragMove = (e) => {
    const target = e.target;
    const lineGuideStops = getLineGuideStops(target);
    const itemBounds = getObjectSnappingEdges(target);
    const newGuides = getGuides(lineGuideStops, itemBounds);

    if (newGuides.length) {
      const absPos = target.absolutePosition();
      newGuides.forEach((lg) => {
        switch (lg.orientation) {
          case "V": {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case "H": {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
          default:
            break;
        }
      });
      target.absolutePosition(absPos);
      setGuides(newGuides);
    }
  };

  const handleDragEnd = () => {
    setGuides([]);
  };

  return (
    <div
      className="w-full h-[80vh] flex justify-center items-center bg-white relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      ref={containerRef}
    >
      <Stage
        width={width}
        height={height}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className="absolute top-0 left-0"
      >
        <Layer>
          {pitch && (
            <KonvaPitchImage pitch={pitch} width={width} height={height} />
          )}
          {droppedEquipment.map((item) => {
            if (item.type === "text") {
              return (
                <EditableText
                  key={item.id}
                  shapeProps={item}
                  isSelected={item.id === selectedId}
                  onSelect={() => handleSelectEquipment(item.id)}
                  onChange={handleItemChange}
                  onTransform={handleItemChange}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
                />
              );
            }
            return (
              <KonvaEquipmentImage
                key={item.id}
                equipment={item}
                isSelected={item.id === selectedId}
                onSelect={() => handleSelectEquipment(item.id)}
                onTransform={handleItemChange}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </Layer>
        <Layer>
          {guides.map((guide, i) => (
            <Line
              key={i}
              points={
                guide.orientation === "H"
                  ? [-6000, 0, 6000, 0]
                  : [0, -6000, 0, 6000]
              }
              stroke="rgb(0, 161, 255)"
              strokeWidth={1}
              dash={[4, 6]}
              x={guide.orientation === "V" ? guide.lineGuide : 0}
              y={guide.orientation === "H" ? guide.lineGuide : 0}
            />
          ))}
        </Layer>
      </Stage>

      <KonvaToolbar
        selectedEquipment={selectedEquipment}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onLockUnlock={handleLockUnlock}
        onRotate={handleRotate}
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
        onTextColorChange={handleTextColorChange}
        textColors={textColors}
      />

      {!pitch && droppedEquipment.length === 0 && (
        <h1 className="text-3xl font-bold text-gray-400">
          Select a pitch or drag equipment here
        </h1>
      )}
    </div>
  );
};

export default Home;