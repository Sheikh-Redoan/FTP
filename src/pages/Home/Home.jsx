// src/pages/Home/Home.jsx
import { useRef, useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/Common/KonvaPitchImage";
import KonvaToolbar from "../../components/common/KonvaToolbar"; // Import KonvaToolbar
import { createSvgDataUrl } from "../../utils/svgUtils";

const Home = () => {
  const { pitch, draggedEquipmentSrc, setDraggedEquipmentSrc, playerColor } =
    useSvg();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const { width, height } = useDimensions(containerRef);

  const [droppedEquipment, setDroppedEquipment] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // History for undo/redo
  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);

  useEffect(() => {
    // When droppedEquipment changes, save it to history
    if (
      JSON.stringify(history[historyStep]) !== JSON.stringify(droppedEquipment)
    ) {
      const newHistory = history.slice(0, historyStep + 1);
      setHistory([...newHistory, droppedEquipment]);
      setHistoryStep(newHistory.length);
    }
  }, [droppedEquipment]); // Only re-run if droppedEquipment changes

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
      rotation: 0, // Initial rotation
      locked: false, // Initial lock state
      type: draggedEquipmentSrc.type,
      text: draggedEquipmentSrc.text,
    };

    setDroppedEquipment((prev) => [...prev, newEquipment]);
    setDraggedEquipmentSrc(null);
    setSelectedId(newId);
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area of the stage
    const clickedOnEmpty = e.target === e.target.getStage();
    const clickedOnTransformer =
      e.target.getParent && e.target.getParent().className === "Transformer";
    if (clickedOnEmpty || clickedOnTransformer) {
      setSelectedId(null);
    }
  };

  const handleTransformEnd = (newAttrs) => {
    const items = droppedEquipment.map((item) =>
      item.id === newAttrs.id
        ? {
            ...newAttrs,
            rotation: newAttrs.rotation || item.rotation,
            locked: newAttrs.locked || item.locked,
          }
        : item
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
      setSelectedId(null); // Deselect on undo
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const newHistoryStep = historyStep + 1;
      setHistoryStep(newHistoryStep);
      setDroppedEquipment(history[newHistoryStep]);
      setSelectedId(null); // Deselect on redo
    }
  };

  const handleDuplicate = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      const newId = Date.now().toString();
      const duplicatedItem = {
        ...selectedEquipment,
        id: newId,
        x: selectedEquipment.x + 20, // Offset duplicated item
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
          {droppedEquipment.map((item) => (
            <KonvaEquipmentImage
              key={item.id}
              equipment={item}
              isSelected={item.id === selectedId}
              onSelect={() => handleSelectEquipment(item.id)}
              onTransform={handleTransformEnd}
            />
          ))}
        </Layer>
      </Stage>

      {selectedId && (
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
      )}

      {!pitch && droppedEquipment.length === 0 && (
        <h1 className="text-3xl font-bold text-gray-400">
          Select a pitch or drag equipment here
        </h1>
      )}
    </div>
  );
};

export default Home;