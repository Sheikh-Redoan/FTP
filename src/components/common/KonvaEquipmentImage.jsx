// src/components/common/KonvaEquipmentImage.jsx
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

  const handleTransform = () => {
    const node = shapeRef.current;
    if (trRef.current) {
      trRef.current.forceUpdate();
    }
  };

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newAttrs = {
      ...equipment,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
      scaleX: 1,
      scaleY: 1,
    };
    onTransform(newAttrs);
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
        onTransform={handleTransform}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && !equipment.locked && (
        <Transformer
          ref={trRef}
          enabledAnchors={getEnabledAnchors()}
          keepRatio={equipment.type !== "line"}
          boundBoxFunc={(oldBox, newBox) => {
            // Prevent shape from becoming too small
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            
            // *** FIX STARTS HERE ***
            // For lines, maintain the original height to prevent vertical distortion
            if (equipment.type === 'line') {
              newBox.height = oldBox.height;
            }
            // *** FIX ENDS HERE ***

            return newBox;
          }}
        />
      )}
    </>
  );
};

export default KonvaEquipmentImage;