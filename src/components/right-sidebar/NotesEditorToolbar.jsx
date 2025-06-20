import { useState } from 'react';
import { FaBold, FaUnderline, FaItalic, FaListUl } from 'react-icons/fa';
import { ImFontSize } from 'react-icons/im';

const ToolbarButton = ({ onClick, active, children }) => (
  <button
    onClick={onClick}
    className={`w-14 h-14 rounded-lg flex items-center justify-center border ${
      active ? "bg-blue-100 border-2 border-blue-900" : "border-blue-900"
    }`}
  >
    {children}
  </button>
);

const NotesEditorToolbar = ({ quillRef }) => {
  const [activeTool, setActiveTool] = useState(null);
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
  const [isListStyleDropdownOpen, setIsListStyleDropdownOpen] = useState(false);

  const fontSizes = ["10px", "12px", "14px", "18px", "24px", "32px"];
  const listStyles = ["disc", "decimal"];

  const handleFormat = (format) => {
    if (!quillRef.current) return;
    const currentFormat = quillRef.current.getFormat();
    const newValue = !currentFormat[format];
    setActiveTool(newValue ? format : null);
    quillRef.current.format(format, newValue);
  };

  const handleListFormat = (style) => {
    if (!quillRef.current) return;
    const listType = style === "decimal" ? "ordered" : "bullet";
    quillRef.current.format("list", listType);
    setIsListStyleDropdownOpen(false);
    setActiveTool("list");
  };

  const handleFontSize = (size) => {
    if (!quillRef.current) return;
    quillRef.current.format("size", size);
    setIsFontSizeDropdownOpen(false);
  };

  return (
    <div className="flex items-center gap-4 p-2 rounded-lg border border-indigo-300 mb-4 relative">
      <ToolbarButton onClick={() => handleFormat("bold")} active={activeTool === "bold"}>
        <FaBold className="text-xl" />
      </ToolbarButton>
      <ToolbarButton onClick={() => handleFormat("italic")} active={activeTool === "italic"}>
        <FaItalic className="text-xl" />
      </ToolbarButton>
      <ToolbarButton onClick={() => handleFormat("underline")} active={activeTool === "underline"}>
        <FaUnderline className="text-xl" />
      </ToolbarButton>
      <div className="relative">
        <ToolbarButton onClick={() => setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen)}>
          <ImFontSize className="text-xl" />
        </ToolbarButton>
        {isFontSizeDropdownOpen && (
          <div className="absolute top-full mt-2 w-24 bg-white border-blue-100 rounded shadow-lg z-10">
            {fontSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleFontSize(size)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <ToolbarButton onClick={() => setIsListStyleDropdownOpen(!isListStyleDropdownOpen)} active={activeTool === "list"}>
          <FaListUl className="text-xl" />
        </ToolbarButton>
        {isListStyleDropdownOpen && (
          <div className="absolute top-full mt-2 w-32 bg-white border-blue-100 rounded shadow-lg z-10">
            {listStyles.map((style) => (
              <button
                key={style}
                onClick={() => handleListFormat(style)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 capitalize"
              >
                {style.replace("-", " ")}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesEditorToolbar;