import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Stage, Layer, Line } from "react-konva";
import Konva from "konva";
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import { useHistory } from "../../hooks/useHistory";
import {
  getLineGuideStops,
  getObjectSnappingEdges,
  getGuides,
} from "../../utils/snapping";
import {
  createSvgDataUrl,
  getSvgDimensions, // <-- Import getSvgDimensions
} from "../../utils/svgUtils";
import { exportToPdf, exportToImage } from "../../utils/exportUtils";

import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/common/KonvaPitchImage";
import KonvaToolbar from "../../components/common/KonvaToolbar";
import EditableText from "../../components/common/EditableText";

Konva._fixTextRendering = true;

const Home = () => {
    const {
        pitch,
        draggedEquipmentSrc,
        setDraggedEquipmentSrc,
        setAddEquipment,
        setExportFunctions,
        getNotesDeltaFunc,
    } = useSvg();
    const containerRef = useRef(null);
    const stageRef = useRef(null);
    const { width, height } = useDimensions(containerRef);

    const [droppedEquipment, setDroppedEquipment, undo, redo, canUndo, canRedo] = useHistory([]);
    const [selectedId, setSelectedId] = useState(null);
    const [guides, setGuides] = useState([]);

    const textColors = useMemo(() => [
        { bg: "#000000", line: "#000000" },
        { bg: "#FFFFFF", line: "#FFFFFF" },
        { bg: "#FDE100", line: "#FDE100" },
        { bg: "#DC052D", line: "#DC052D" },
        { bg: "#22274A", line: "#22274A" },
        { bg: "#6B7280", line: "#6B7280" },
    ], []);

    const handleExportPDF = useCallback(async () => {
        if (!stageRef.current || !getNotesDeltaFunc) {
            console.error("PDF export dependencies are not ready.");
            return;
        }
        const notesDelta = getNotesDeltaFunc();
        exportToPdf(stageRef.current, notesDelta, width, height);
    }, [getNotesDeltaFunc, width, height]);

    const handleExportImage = useCallback((format) => {
        exportToImage(stageRef.current, format);
    }, []);

    useEffect(() => {
        setExportFunctions({
            png: () => handleExportImage("png"),
            jpg: () => handleExportImage("jpg"),
            pdf: handleExportPDF,
        });
    }, [setExportFunctions, handleExportImage, handleExportPDF]);
    
    const handleItemChange = (newAttrs) => {
        const items = droppedEquipment.map((item) => {
            if (item.id === newAttrs.id) {
                return { ...item, ...newAttrs };
            }
            return item;
        });
        setDroppedEquipment(items, true);
    };

// src/pages/Home/Home.jsx

const handleDrop = (e) => {
  e.preventDefault();
  if (!draggedEquipmentSrc) return;

  stageRef.current.setPointersPositions(e);
  const position = stageRef.current.getPointerPosition();

  // Get the actual dimensions of the SVG
  const { width: svgWidth, height: svgHeight } = getSvgDimensions(
    draggedEquipmentSrc.content
  );
  const dataUrl = createSvgDataUrl(draggedEquipmentSrc.content);
  const newId = Date.now().toString();

  const newEquipment = {
    id: newId,
    dataUrl,
    x: position.x,
    y: position.y,
    width: svgWidth, // Use the actual width
    height: svgHeight, // Use the actual height
    rotation: 0,
    locked: false,
    scaleX: 1,
    scaleY: 1,
    type: draggedEquipmentSrc.type,
    text: draggedEquipmentSrc.text,
    name: "object",
  };

  setDroppedEquipment((prev) => [...prev, newEquipment]);
  setDraggedEquipmentSrc(null);
  setSelectedId(newId);
};

    const handleDragStart = (e) => {
        const id = e.target.id();
        setDroppedEquipment((prev) => {
            const items = [...prev];
            const item = items.find((i) => i.id === id);
            const index = items.indexOf(item);
            items.splice(index, 1);
            items.push(item);
            return items;
        }, true);
    };

    const handleDragMove = (e) => {
        const target = e.target;
        const newGuides = getGuides(getLineGuideStops(stageRef.current, target), getObjectSnappingEdges(target));

        if (newGuides.length) {
            const absPos = { ...target.absolutePosition() };
            newGuides.forEach((lg) => {
                if (lg.orientation === "V") absPos.x = lg.lineGuide + lg.offset;
                else if (lg.orientation === "H") absPos.y = lg.lineGuide + lg.offset;
            });
            target.absolutePosition(absPos);
            setGuides(newGuides);
        } else {
            setGuides([]);
        }
    };

    const handleDragEnd = (e) => {
        setGuides([]);
        setDroppedEquipment((prev) => {
            return prev.map(item =>
                item.id === e.target.id() ? { ...item, x: e.target.x(), y: e.target.y() } : item
            );
        });
    };

    const selectedEquipment = useMemo(() => droppedEquipment.find((item) => item.id === selectedId), [droppedEquipment, selectedId]);

    const handleToolbarAction = (newAttrs) => {
        if (!selectedEquipment) return;
        setDroppedEquipment(prev => 
            prev.map(item => 
                item.id === selectedId ? { ...item, ...newAttrs } : item
            )
        );
    };

    const handleDuplicate = () => {
        if (selectedEquipment && !selectedEquipment.locked) {
            const newId = Date.now().toString();
            const duplicatedItem = { ...selectedEquipment, id: newId, x: selectedEquipment.x + 20, y: selectedEquipment.y + 20 };
            setDroppedEquipment((prev) => [...prev, duplicatedItem]);
            setSelectedId(newId);
        }
    };

    const handleDelete = () => {
        if (selectedEquipment && !selectedEquipment.locked) {
            setDroppedEquipment((prev) => prev.filter((item) => item.id !== selectedId));
            setSelectedId(null);
        }
    };
    
    useEffect(() => {
        const addEquipmentToStage = (item, type, dimensions) => {
            const newId = Date.now().toString();
            if (type === "text") {
                const newText = { id: newId, x: width / 2 - 100, y: height / 2 - 50, rotation: 0, locked: false, name: "object", ...item };
                setDroppedEquipment(prev => [...prev, newText]);
                setSelectedId(newId);
            } else {
                const dataUrl = createSvgDataUrl(item);
                const newEquipment = {
                  id: newId,
                  dataUrl,
                  x: width / 2 - 50,
                  y: height / 2 - 50,
                  width: dimensions ? dimensions.width : 100,
                  height: dimensions ? dimensions.height : 100,
                  rotation: 0,
                  locked: false,
                  scaleX: 1,
                  scaleY: 1,
                  type: type,
                  name: "object",
                };
                setDroppedEquipment(prev => [...prev, newEquipment]);
                setSelectedId(newId);
            }
        };
        setAddEquipment(() => addEquipmentToStage);
    }, [setAddEquipment, width, height, setDroppedEquipment]);

    return (
          <div
            className="w-full h-[80vh]"
            ref={containerRef}
        >
            <div 
              className="absolute inset-0" 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <Stage
                  width={width}
                  height={height}
                  ref={stageRef}
                  onMouseDown={(e) => e.target === e.target.getStage() && setSelectedId(null)}
                  onTouchStart={(e) => e.target === e.target.getStage() && setSelectedId(null)}
              >
                <Layer>
                    {pitch && <KonvaPitchImage pitch={pitch} width={width} height={height} />}
                    {droppedEquipment.map((item) => {
                        const commonProps = {
                            key: item.id,
                            isSelected: item.id === selectedId,
                            onSelect: () => setSelectedId(item.id),
                            onTransform: (newAttrs) => handleItemChange(newAttrs),
                            onDragStart: handleDragStart,
                            onDragMove: handleDragMove,
                            onDragEnd: handleDragEnd,
                        };
                        return item.type === "text" ? (
                            <EditableText {...commonProps} shapeProps={item} onChange={(newAttrs) => handleItemChange(newAttrs)} />
                        ) : (
                            <KonvaEquipmentImage {...commonProps} equipment={item} />
                        );
                    })}
                </Layer>
                <Layer>
                    {guides.map((guide, i) => (
                        <Line
                            key={i}
                            points={guide.orientation === "H" ? [-6000, 0, 6000, 0] : [0, -6000, 0, 6000]}
                            stroke="rgb(0, 161, 255)"
                            strokeWidth={1}
                            dash={[4, 6]}
                            x={guide.orientation === "V" ? guide.lineGuide : 0}
                            y={guide.orientation === "H" ? guide.lineGuide : 0}
                        />
                    ))}
                </Layer>
            </Stage>
            </div>

            <KonvaToolbar
                selectedEquipment={selectedEquipment}
                onUndo={undo}
                onRedo={redo}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onLockUnlock={() => handleToolbarAction({ locked: !selectedEquipment.locked })}
                onRotate={() => handleToolbarAction({ rotation: (selectedEquipment.rotation + 45) % 360 })}
                canUndo={canUndo}
                canRedo={canRedo}
                onTextColorChange={(colorIndex) => handleToolbarAction({ fill: textColors[colorIndex].line })}
                textColors={textColors}
                onTextResize={(e) => handleToolbarAction({ fontSize: parseInt(e.target.value, 10) })}
            />

             {!pitch && droppedEquipment.length === 0 && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <h1 className="text-3xl font-bold text-gray-400">
                        Select a pitch or drag equipment here
                    </h1>
                </div>
            )}
        </div>
    );
};


export default Home;