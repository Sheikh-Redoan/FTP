import React, { useEffect, useRef, useState, useCallback } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

const EditableText = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDragStart,
  onDragMove,
  onDragEnd,
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
    const textarea = e.target;
    textarea.style.height = "auto";
    const newHeight = textarea.scrollHeight;
    textarea.style.height = `${newHeight}px`;

    onChange({
      ...shapeProps,
      text: textarea.value,
      height: newHeight,
    });
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.focus();
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [isEditing]);

  return (
    <>
      <Text
        id={shapeProps.id}
        ref={shapeRef}
        {...shapeProps}
        draggable={!isEditing && !shapeProps.locked}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);

            const newWidth = Math.max(5, node.width() * scaleX);
            const newHeight = Math.max(5, node.height() * scaleY);

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: newWidth,
              height: newHeight,
              offsetX: newWidth / 2, // for centered rotation
              offsetY: newHeight / 2, // for centered rotation
              rotation: node.rotation(),
              scaleX: 1,
              scaleY: 1,
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
              transform: `rotate(${
                shapeProps.rotation || 0
              }deg) scale(${shapeRef.current.getAbsoluteScale().x})`,
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
              border: "none",
              padding: `${shapeProps.padding}px`,
              margin: "0px",
              overflow: "hidden",
              background: "none",
              outline: "none",
              resize: "none",
              lineHeight: shapeProps.lineHeight,
              fontFamily: shapeProps.fontFamily,
              textAlign: shapeProps.align,
              color: shapeProps.fill,
              fontSize: `${shapeProps.fontSize}px`,
            }}
          />
        </Html>
      )}
    </>
  );
};

export default EditableText;