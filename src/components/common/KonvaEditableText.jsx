import { useEffect, useRef, useState, useCallback } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

const KonvaEditableText = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onTransform,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const handleTextareaChange = useCallback(
    (e) => {
      onChange({
        ...shapeProps,
        text: e.target.value,
      });
    },
    [shapeProps, onChange]
  );

  const handleTextareaBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleTextareaKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        setIsEditing(false);
      }
      if (e.key === "Escape") {
        setIsEditing(false);
      }
    },
    []
  );

  return (
    <>
      <Text
        ref={shapeRef}
        {...shapeProps}
        draggable={!isEditing}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        onTransform={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onTransform({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
        visible={!isEditing}
      />
      {isSelected && !isEditing && (
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
      {isEditing && (
        <Html
          divProps={{
            style: {
              position: "absolute",
              top: `${shapeRef.current.y()}px`,
              left: `${shapeRef.current.x()}px`,
              transformOrigin: "left top",
              transform: `rotate(${shapeProps.rotation || 0}deg)`,
            },
          }}
        >
          <textarea
            ref={textareaRef}
            value={shapeProps.text}
            onChange={handleTextareaChange}
            onBlur={handleTextareaBlur}
            onKeyDown={handleTextareaKeyDown}
            style={{
              width: `${shapeProps.width}px`,
              height: `${shapeProps.height}px`,
              fontSize: `${shapeProps.fontSize}px`,
              border: "1px solid #6B7280",
              padding: "0px",
              margin: "0px",
              overflow: "hidden",
              background: "white",
              outline: "none",
              resize: "none",
              lineHeight: shapeProps.lineHeight,
              fontFamily: shapeProps.fontFamily,
              textAlign: shapeProps.align,
              color: shapeProps.fill,
            }}
          />
        </Html>
      )}
    </>
  );
};

export default KonvaEditableText;