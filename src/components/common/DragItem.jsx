// src/components/common/DragItem.jsx
import { ReactSVG } from "react-svg";

// Helper to create a data URL from an SVG string
const createDataUrl = (svgContent) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

const DragItem = ({
  src,
  name,
  onDragStart,
  beforeInjection,
  displaySvgContent,
  IconComponent,
  type = "equipment",
  isMobile,
}) => {
  const svgSrc = displaySvgContent
    ? createDataUrl(displaySvgContent)
    : IconComponent
    ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>`
    : src;

  return (
    <div
      draggable
      onDragStart={(e) => {
        const dragData = {
          src,
          name,
          type,
          content: displaySvgContent,
          IconComponent,
        };
        e.dataTransfer.setData("text/plain", name);
        onDragStart(dragData);
      }}
      className={`flex flex-col items-center gap-1 ${
        isMobile ? "w-20" : "w-full"
      } flex-shrink-0`}
    >
      <div
        className={`flex justify-center items-center p-1 w-full ${
          isMobile ? "h-20" : "h-[100px]"
        } border rounded-lg hover:bg-gray-100 cursor-pointer`}
      >
        {IconComponent ? (
          <IconComponent className="text-4xl text-gray-700" />
        ) : (
          <ReactSVG
            src={svgSrc}
            beforeInjection={displaySvgContent ? undefined : beforeInjection}
            className="svg_size_fixer"
          />
        )}
      </div>
      <span className="text-sm text-center w-full">{name}</span>
    </div>
  );
};

export default DragItem;