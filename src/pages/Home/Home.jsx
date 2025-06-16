import { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/Common/KonvaPitchImage"; // Import the new component
import { createSvgDataUrl } from "../../utils/svgUtils";

const Home = () => {
  const { pitch, draggedEquipmentSrc, setDraggedEquipmentSrc } = useSvg();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const { width, height } = useDimensions(containerRef);
  const [droppedEquipment, setDroppedEquipment] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedEquipmentSrc) return;

    stageRef.current.setPointersPositions(e);
    const position = stageRef.current.getPointerPosition();
    const dataUrl = createSvgDataUrl(draggedEquipmentSrc.content);
    const newId = Date.now().toString();

    setDroppedEquipment((prev) => [
      ...prev,
      {
        id: newId,
        dataUrl,
        ...position,
        width: 100,
        height: 100,
      },
    ]);
    setDraggedEquipmentSrc(null);
    setSelectedId(newId);
  };

  const checkDeselect = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
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
              onSelect={() => setSelectedId(item.id)}
              onTransform={(newAttrs) => {
                const items = droppedEquipment.slice();
                const index = items.findIndex((i) => i.id === item.id);
                items[index] = newAttrs;
                setDroppedEquipment(items);
              }}
            />
          ))}
        </Layer>
      </Stage>

      {!pitch && droppedEquipment.length === 0 && (
        <h1 className="text-3xl font-bold text-gray-400">
          Select a pitch or drag equipment here
        </h1>
      )}
    </div>
  );
};

export default Home;