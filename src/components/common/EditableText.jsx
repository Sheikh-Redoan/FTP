import React, { useEffect, useRef, useState, useCallback } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

const EditableText = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onTransform,
}) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isSelected && trRef.current && !isEditing) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  const onDoubleClick = useCallback(() => {
    setIsEditing(true);
    if (shapeRef.current) {
      shapeRef.current.hide();
    }
    if (trRef.current) {
      trRef.current.hide();
    }
  }, []);

  const handleTextareaBlur = useCallback(() => {
    setIsEditing(false);
    if (shapeRef.current) {
      shapeRef.current.show();
    }
    if (trRef.current) {
      trRef.current.show();
    }
  }, []);

  const handleTextareaKeyDown = useCallback(
    (e) => {
      if ((e.key === "Enter" && !e.shiftKey) || e.key === "Escape") {
        e.preventDefault();
        handleTextareaBlur();
      }
    },
    [handleTextareaBlur]
  );
  
  const handleTextareaChange = (e) => {
    onChange({
      ...shapeProps,
      text: e.target.value,
    });
  };
  
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      <Text
        ref={shapeRef}
        {...shapeProps}
        draggable={!isEditing && !shapeProps.locked}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (node) {
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
          }
        }}
        visible={!isEditing}
      />
      {isSelected && !isEditing && !shapeProps.locked && (
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
      {isEditing && shapeRef.current && (
        <Html
          divProps={{
            style: {
              position: "absolute",
              top: `${shapeRef.current.y()}px`,
              left: `${shapeRef.current.x()}px`,
              transformOrigin: "left top",
              transform: `rotate(${shapeProps.rotation || 0}deg) scale(${shapeRef.current.getAbsoluteScale().x})`,
            },
          }}
        >
          <textarea
            ref={textareaRef}
            defaultValue={shapeProps.text}
            onChange={handleTextareaChange}
            onBlur={handleTextareaBlur}
            onKeyDown={handleTextareaKeyDown}
            style={{
              width: `${shapeProps.width}px`,
              height: `${shapeProps.height}px`,
              fontSize: `${shapeProps.fontSize}px`,
              border: "1px solid #6B7280",
              padding: `${shapeProps.padding}px`,
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

export default EditableText;