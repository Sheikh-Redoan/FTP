// src/pages/Home/Home.jsx
import { useRef, useState, useEffect, useCallback } from "react";
import { Stage, Layer } from "react-konva";
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/common/KonvaPitchImage";
import KonvaToolbar from "../../components/common/KonvaToolbar";
import { createSvgDataUrl } from "../../utils/svgUtils";
import EditableText from "../../components/common/EditableText"; // Import the new component

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

  // This function is for SVG-based equipment
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
      };

      setDroppedEquipment((prev) => [...prev, newEquipment]);
      setSelectedId(newId);
    },
    [width, height]
  );

  // We are re-purposing the `addEquipment` from the context to add our text.
  // A more robust solution might involve a dedicated `addText` function in the context.
  useEffect(() => {
    setAddEquipment(() => (item, type) => {
      if (type === 'text') {
        const newId = Date.now().toString();
        const newText = {
          id: newId,
          x: width / 2 - 100,
          y: height / 2 - 50,
          rotation: 0,
          locked: false,
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
              />
            );
          })}
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