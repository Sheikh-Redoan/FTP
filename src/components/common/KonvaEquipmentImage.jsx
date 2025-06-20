import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";

const KonvaEquipmentImage = ({
  equipment,
  isSelected,
  onSelect,
  onTransform,
  onDragStart,
  onDragMove,
  onDragEnd,
}) => {
  const [img] = useImage(equipment.dataUrl);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && !equipment.locked) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, equipment.locked]);

  const getEnabledAnchors = () => {
    const { type } = equipment;
    if (type === "line") {
      return ["middle-left", "middle-right"];
    }
    if (["rectangle", "square", "circle", "triangle"].includes(type)) {
      return [
        "top-left",
        "top-center",
        "top-right",
        "middle-right",
        "bottom-right",
        "bottom-center",
        "bottom-left",
        "middle-left",
      ];
    }
    return ["top-left", "top-right", "bottom-left", "bottom-right"];
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;
    
    // For lines, we don't want to change the height when resizing.
    const newWidth = node.width() * node.scaleX();
    const newHeight = equipment.type === 'line' ? equipment.height : node.height() * node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onTransform({
      ...equipment,
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
      rotation: node.rotation(),
      // Ensure scale is not stored in state
      scaleX: 1,
      scaleY: 1,
    });
  };

  return (
    <>
      <Image
        id={equipment.id}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        image={img}
        {...equipment}
        draggable={!equipment.locked}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && !equipment.locked && (
        <Transformer
          ref={trRef}
          enabledAnchors={getEnabledAnchors()}
          // For lines, we don't keep the ratio to allow horizontal stretching
          keepRatio={equipment.type !== "line"}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default KonvaEquipmentImage;