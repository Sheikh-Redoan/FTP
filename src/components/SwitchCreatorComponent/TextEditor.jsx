import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Bold1, Italic1, Menu11, Underline1 } from "@/assets/SidebarIcon";

const TextEditor = () => {
  const quillRef = useRef(null);
  const [quill, setQuill] = useState(null);
  const [formats, setFormats] = useState({});

  useEffect(() => {
    if (quillRef.current && !quill) {
      const editor = new Quill(quillRef.current, {
        theme: "snow",
        modules: { toolbar: false },
        placeholder: "Type here coaching points / VAR",
      });

      editor.on("selection-change", () => {
        setFormats(editor.getFormat());
      });

      setQuill(editor);
    }
  }, [quill]);

  const applyFormat = (format) => {
    if (quill) {
      const isActive = formats[format];
      quill.format(
        format,
        !isActive ? (format === "list" ? "bullet" : true) : false
      );
      setFormats({
        ...formats,
        [format]: !isActive ? (format === "list" ? "bullet" : true) : false,
      });
    }
  };

  return (
    <div>
      <div className="border border-[#B0B2DD] p-4 rounded-[16px]">
        <div className="border border-[#B0B2DD] flex items-center justify-center rounded-[8px] gap-4 p-4 w-[300px]">
          {/* Bold */}
          <button
            onClick={() => applyFormat("bold")}
            className={`py-2 px-4 rounded-md border duration-200 ${
              formats.bold
                ? "bg-[#010792] text-white"
                : "border-[#010792] text-[#010792] hover:bg-[#010792] hover:text-white"
            }`}
          >
            <Bold1 className="w-5 h-5 text-inherit" />
          </button>

          {/* Italic */}
          <button
            onClick={() => applyFormat("italic")}
            className={`py-2 px-4 rounded-md border duration-200 ${
              formats.italic
                ? "bg-[#010792] text-white"
                : "border-[#010792] text-[#010792] hover:bg-[#010792] hover:text-white"
            }`}
          >
            <Italic1 className="w-5 h-5 text-inherit" />
          </button>

          {/* Underline */}
          <button
            onClick={() => applyFormat("underline")}
            className={`py-2 px-4 rounded-md border duration-200 ${
              formats.underline
                ? "bg-[#010792] text-white"
                : "border-[#010792] text-[#010792] hover:bg-[#010792] hover:text-white"
            }`}
          >
            <Underline1 className="w-5 h-5 text-inherit" />
          </button>

          {/* Bullet List (Fixed Toggle) */}
          <button
            onClick={() => applyFormat("list")}
            className={`py-2 px-4 rounded-md border duration-200 ${
              formats.list === "bullet"
                ? "bg-[#010792] text-white"
                : "border-[#010792] text-[#010792] hover:bg-[#010792] hover:text-white"
            }`}
          >
            <Menu11 className="w-5 h-5 text-inherit" />
          </button>
        </div>

        {/* ✍️ Text Editor */}
        <div
          ref={quillRef}
          style={{
            height: "300px",
            marginTop: "10px",
            border: "none",
            fontSize: "18px",
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
