// src/components/common/DragItem.jsx
import { ReactSVG } from "react-svg";

const DragItem = ({ src, name, onDragStart, beforeInjection, displaySvgContent, IconComponent, type = 'equipment' }) => {
  const dummySvgSrc = IconComponent ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>` : src;

  return (
    <div
      draggable
      onDragStart={(e) => {
        const dragData = {
          src,
          name,
          type, // Use the passed type or default
          content: displaySvgContent,
          IconComponent,
        };
        e.dataTransfer.setData("text/plain", name);
        // MODIFIED: Pass a single structured object
        onDragStart(dragData);
      }}
      className="flex flex-col items-center gap-1 w-full"
    >
      <div className="flex justify-center items-center p-1 w-full h-[100px] border rounded-lg hover:bg-gray-100 cursor-pointer">
        {IconComponent ? (
          <IconComponent className="text-4xl text-gray-700" />
        ) : (
          <ReactSVG src={dummySvgSrc} beforeInjection={beforeInjection} className="w-auto h-auto" />
        )}
      </div>
      <span className="text-sm text-center w-full">{name}</span>
    </div>
  );
};

export default DragItem;