import { useState, useEffect, useRef } from "react";
import { useSvg } from "../../context/SvgContext";
import { FaChevronDown, FaBold, FaUnderline, FaItalic } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { FaListUl } from "react-icons/fa6";
import { HiArrowPath } from "react-icons/hi2";
import { BsFiletypePdf } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";
import { ImFontSize } from "react-icons/im";

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

// Helper to load scripts
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const loadCSS = (href) => {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
};

const RightSidebar = () => {
  const { exportFunctions, setGetNotesDeltaFunc } = useSvg();
  const [activeTool, setActiveTool] = useState(null);
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
  const [isListStyleDropdownOpen, setIsListStyleDropdownOpen] = useState(false);
  const [isSaveAsDropdownOpen, setIsSaveAsDropdownOpen] = useState(false);

  const fontSizes = ["10px", "12px", "14px", "18px", "24px", "32px"];
  const listStyles = ["disc", "decimal"];

  const getNotesDelta = () => {
    return quillRef.current ? quillRef.current.getContents() : null;
  };

  useEffect(() => {
    const initializeQuill = async () => {
      await Promise.all([
        loadScript("https://cdn.quilljs.com/1.3.6/quill.js"),
        loadScript("https://html2canvas.hertzen.com/dist/html2canvas.min.js"),
        loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
        ),
      ]);
      loadCSS("https://cdn.quilljs.com/1.3.6/quill.snow.css");

      if (editorRef.current && !quillRef.current && window.Quill) {
        const Size = window.Quill.import("attributors/style/size");
        Size.whitelist = fontSizes;
        window.Quill.register(Size, true);

        const quill = new window.Quill(editorRef.current, {
          modules: {
            toolbar: false,
          },
          placeholder: "Type here coaching points / VAR...",
          theme: "snow",
        });
        quillRef.current = quill;

        const quillToolbar = editorRef.current.previousSibling;
        if (quillToolbar && quillToolbar.classList.contains("ql-toolbar")) {
          quillToolbar.style.display = "none";
        }
      }
    };

    initializeQuill();

    if (setGetNotesDeltaFunc) {
      setGetNotesDeltaFunc(() => getNotesDelta);
    }
  }, [setGetNotesDeltaFunc]);

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
    <div className="w-[570px] min-h-screen p-6 bg-white">
      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <button
              onClick={() => setIsSaveAsDropdownOpen(!isSaveAsDropdownOpen)}
              className="w-60 h-12 px-6 py-2.5 rounded-full border border-blue-900 flex items-center gap-2 hover:bg-blue-50"
            >
              <HiArrowPath className="w-5 h-5" />
              <span className="text-lg font-medium">Save as</span>
            </button>
            {isSaveAsDropdownOpen && (
              <div className="absolute top-full mt-2 w-60 bg-white border rounded shadow-lg z-10">
                <button
                  onClick={() => {
                    exportFunctions.png();
                    setIsSaveAsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Save as PNG
                </button>
                <button
                  onClick={() => {
                    exportFunctions.jpg();
                    setIsSaveAsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Save as JPG
                </button>
                <button
                  onClick={() => {
                    exportFunctions.pdf();
                    setIsSaveAsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Save as PDF
                </button>
              </div>
            )}
          </div>
          <div className="w-56 h-16 bg-slate-200 rounded-2xl border border-blue-900 flex items-center justify-between px-4">
            <span className="text-lg font-medium">Drill</span>
            <FaChevronDown />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="flex flex-col justify-center items-center p-1 w-[130px] h-[100px] shadow rounded-lg hover:bg-gray-100"
            onClick={exportFunctions.pdf}
          >
            <BsFiletypePdf className="text-3xl mb-1" />
            <span className="text-lg font-medium">Save as PDF</span>
          </button>
          <button className="flex flex-col justify-center items-center p-1 w-[130px] h-[100px] shadow rounded-lg hover:bg-gray-100">
            <PiShareFat className="text-3xl mb-1" />
            <span className="text-lg font-medium">Share</span>
          </button>
        </div>
      </div>
      <div className="h-[424px] rounded-2xl border border-indigo-300 p-6 flex flex-col">
        <div className="flex items-center gap-4 p-2 rounded-lg border border-indigo-300 mb-4 relative">
          <ToolbarButton
            onClick={() => handleFormat("bold")}
            active={activeTool === "bold"}
          >
            <FaBold className="text-xl" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleFormat("italic")}
            active={activeTool === "italic"}
          >
            <FaItalic className="text-xl" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => handleFormat("underline")}
            active={activeTool === "underline"}
          >
            <FaUnderline className="text-xl" />
          </ToolbarButton>
          <div className="relative">
            <ToolbarButton
              onClick={() => setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen)}
            >
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
            <ToolbarButton
              onClick={() =>
                setIsListStyleDropdownOpen(!isListStyleDropdownOpen)
              }
              active={activeTool === "list"}
            >
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
        <div
          className="flex-grow overflow-y-scroll"
          style={{ position: "relative" }}
        >
          <div ref={editorRef} style={{ height: "100%", border: "none" }}></div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;