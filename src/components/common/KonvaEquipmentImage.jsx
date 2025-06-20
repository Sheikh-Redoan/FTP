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

  // The getEnabledAnchors function is removed to allow all resize handles.

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;

    // No longer treating lines specially, allowing them to resize like any other shape
    const newWidth = node.width() * node.scaleX();
    const newHeight = node.height() * node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onTransform({
      ...equipment,
      x: node.x(),
      y: node.y(),
      width: newWidth,
      height: newHeight,
      rotation: node.rotation(),
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
          // The enabledAnchors prop is removed to show all handles
          keepRatio={true} // Keep aspect ratio for all items for uniform scaling
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