import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";

const KonvaEquipmentImage = ({ equipment, isSelected, onSelect, onTransform }) => {
  const [img] = useImage(equipment.dataUrl);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...equipment}
        image={img}
        draggable
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY(); // Get scaleY as well to apply to height

          const newAttrs = {
            ...equipment,
            x: node.x(),
            y: node.y(),
            // When keepRatio is true, either width or height will be the primary driver.
            // Konva will automatically adjust the other dimension to maintain aspect ratio.
            // We just need to ensure the base width and height are updated correctly.
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY), // Apply scaleY to height
            scaleX: 1,
            scaleY: 1, // Reset scaleY as well
          };
          onTransform(newAttrs);
        }}
        />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          keepRatio={true} //
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