// src/components/common/KonvaEquipmentImage.jsx
import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";

const KonvaEquipmentImage = ({ equipment, isSelected, onSelect, onTransform }) => {
  const [img] = useImage(equipment.dataUrl);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && !equipment.locked) {
      // Only show transformer if selected and not locked
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, equipment.locked]);

  // ADDED: Logic to determine which resize anchors to use
  const getEnabledAnchors = () => {
    const { type } = equipment;
    if (type === 'line') {
      // For lines, only allow horizontal resizing
      return ['middle-left', 'middle-right'];
    }
    if (['rectangle', 'square', 'circle', 'triangle'].includes(type)) {
      // For specific shapes, allow resizing from all 8 anchors
      return ['top-left', 'top-center', 'top-right', 'middle-right', 'bottom-right', 'bottom-center', 'bottom-left', 'middle-left'];
    }
    // Default for other equipment
    return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  };

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...equipment}
        image={img}
        draggable={!equipment.locked} // Disable dragging if locked
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          const newAttrs = {
            ...equipment,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(), // Get current rotation
            scaleX: 1,
            scaleY: 1,
          };
          onTransform(newAttrs);
        }}
      />
      {isSelected && !equipment.locked && ( // Only render transformer if selected and not locked
        <Transformer
          ref={trRef}
          enabledAnchors={getEnabledAnchors()}
          keepRatio={equipment.type !== 'line'}
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