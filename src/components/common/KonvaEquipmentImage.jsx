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
          const newAttrs = {
            ...equipment,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            scaleX: 1,
          };
          onTransform(newAttrs);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
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