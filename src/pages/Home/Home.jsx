import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Stage, Layer, Line } from "react-konva";
import Konva from "konva";
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import {
  getLineGuideStops,
  getObjectSnappingEdges,
  getGuides,
} from "../../utils/snapping";
import {
  createSvgDataUrl,
  getSvgDimensions,
} from "../../utils/svgUtils";
import { exportToPdf, exportToImage } from "../../utils/exportUtils";

import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/common/KonvaPitchImage";
import KonvaToolbar from "../../components/common/KonvaToolbar";
import EditableText from "../../components/common/EditableText";

Konva._fixTextRendering = true;

// Helper function to get distance between two points for pinch-zoom
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Helper function to get the center of two points for pinch-zoom
function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}


const Home = () => {
    const {
        activeDrill, // Get the whole activeDrill object
        draggedEquipmentSrc,
        setDraggedEquipmentSrc,
        setAddEquipment,
        setExportFunctions,
        droppedEquipment,
        setDroppedEquipment,
        undo,
        redo,
        canUndo,
        canRedo
    } = useSvg();
    const containerRef = useRef(null);
    const stageRef = useRef(null);
    const { width, height } = useDimensions(containerRef);

    const pitch = activeDrill?.pitch; // Get pitch from the active drill

    const [selectedId, setSelectedId] = useState(null);
    const [guides, setGuides] = useState([]);
    const [stageRotation, setStageRotation] = useState(0);

    const [stage, setStage] = useState({
        scale: 1,
        x: 0,
        y: 0,
    });
    const [lastDist, setLastDist] = useState(0);


    const textColors = useMemo(() => [
        { bg: "#000000", line: "#000000" },
        { bg: "#FFFFFF", line: "#FFFFFF" },
        { bg: "#FDE100", line: "#FDE100" },
        { bg: "#DC052D", line: "#DC052D" },
        { bg: "#22274A", line: "#22274A" },
        { bg: "#6B7280", line: "#6B7280" },
    ], []);

    // Updated to get notes from the active drill
    const handleExportPDF = useCallback(async () => {
        if (!stageRef.current) {
            console.error("PDF export dependencies are not ready.");
            return;
        }
        const notesDelta = activeDrill?.notes;
        exportToPdf(stageRef.current, notesDelta, width, height);
    }, [activeDrill, width, height]);

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

const handleDrop = (e) => {
  e.preventDefault();
  if (!draggedEquipmentSrc) return;

  stageRef.current.setPointersPositions(e);
  const position = stageRef.current.getPointerPosition();

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
    width: svgWidth,
    height: svgHeight,
    offsetX: svgWidth / 2, // Add this for centered rotation
    offsetY: svgHeight / 2, // Add this for centered rotation
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

const handleRotate = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
        handleToolbarAction({ rotation: (selectedEquipment.rotation + 45) % 360 });
    } else if (!selectedEquipment) {
        const stage = stageRef.current;
        const currentRotation = stage.rotation();
        const newRotation = (currentRotation + 45) % 360;
        stage.rotation(newRotation);

        const stageWidth = stage.width();
        const stageHeight = stage.height();
        stage.offsetX(stageWidth / 2);
        stage.offsetY(stageHeight / 2);
    }
};

    const handleWheel = (e) => {
        e.evt.preventDefault();
        if (e.evt.ctrlKey) {
            const scaleBy = 1.2;
            const stageInstance = e.target.getStage();
            const oldScale = stageInstance.scaleX();
            const pointer = stageInstance.getPointerPosition();

            const mousePointTo = {
                x: (pointer.x - stageInstance.x()) / oldScale,
                y: (pointer.y - stageInstance.y()) / oldScale,
            };

            const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

            setStage({
                scale: newScale,
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            });
        }
    };
    
    const handleTouchMove = (e) => {
        const touch1 = e.evt.touches[0];
        const touch2 = e.evt.touches[1];
        const stageInstance = e.target.getStage();

        if (touch1 && touch2) {
            e.evt.preventDefault();
            const dist = getDistance(
                { x: touch1.clientX, y: touch1.clientY },
                { x: touch2.clientX, y: touch2.clientY }
            );

            if (!lastDist) {
                setLastDist(dist);
                return;
            }

            const oldScale = stageInstance.scaleX();
            const newScale = oldScale * (dist / lastDist);

            const center = getCenter(
                { x: touch1.clientX, y: touch1.clientY },
                { x: touch2.clientX, y: touch2.clientY }
            );

            const pointer = {
                x: center.x - stageInstance.container().getBoundingClientRect().left,
                y: center.y - stageInstance.container().getBoundingClientRect().top
            };

            const mousePointTo = {
                x: (pointer.x - stageInstance.x()) / oldScale,
                y: (pointer.y - stageInstance.y()) / oldScale,
            };

            setStage({
                scale: newScale,
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            });
            setLastDist(dist);
        }
    };

    const handleTouchEnd = () => {
        setLastDist(0);
    };
    
useEffect(() => {
    const addEquipmentToStage = (item, type, dimensions) => {
        const newId = Date.now().toString();
        if (type === "text") {
            const newText = {
                id: newId,
                x: width / 2,
                y: height / 2,
                rotation: 0,
                locked: false,
                name: "object",
                ...item,
                offsetX: item.width / 2, // for centered rotation
                offsetY: item.height / 2, // for centered rotation
            };
            setDroppedEquipment(prev => [...prev, newText]);
            setSelectedId(newId);
        } else {
            const dataUrl = createSvgDataUrl(item);
            const newEquipment = {
              id: newId,
              dataUrl,
              x: width / 2,
              y: height / 2,
              width: dimensions ? dimensions.width : 100,
              height: dimensions ? dimensions.height : 100,
              offsetX: dimensions ? dimensions.width / 2 : 50, // for centered rotation
              offsetY: dimensions ? dimensions.height / 2 : 50, // for centered rotation
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
                  onTouchStart={(e) => {
                      if (e.target === e.target.getStage()) {
                          setSelectedId(null)
                      }
                  }}
                  rotation={stageRotation}
                  scaleX={stage.scale}
                  scaleY={stage.scale}
                  x={stage.x}
                  y={stage.y}
                  onWheel={handleWheel}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  draggable
                  onDragEnd={(e) => {
                    if (e.target === e.target.getStage()) {
                        setStage({ ...stage, x: e.target.x(), y: e.target.y() });
                    }
                  }}
                  offsetX={stageRotation ? width / 2 : 0}
                  offsetY={stageRotation ? height / 2 : 0}
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
                onRotate={handleRotate}
                canUndo={canUndo}
                canRedo={canRedo}
                onTextColorChange={(colorIndex) => handleToolbarAction({ fill: textColors[colorIndex].line })}
                textColors={textColors}
                onTextResize={(e) => handleToolbarAction({ fontSize: parseInt(e.target.value, 10) })}
            />

             {!pitch && droppedEquipment.length === 0 && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none w-full">
                    <h1 className="text-3xl font-bold text-gray-400 text-center max-[800px]:mx-[20px]">
                        Select a pitch or drag equipment here
                    </h1>
                </div>
            )}
        </div>
    );
};


export default Home;