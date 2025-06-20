import { useEffect, useRef } from 'react';

// Helper to load scripts/CSS
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

const NotesEditor = ({ setQuillInstance }) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        const initializeQuill = async () => {
            await loadScript("https://cdn.quilljs.com/1.3.6/quill.js");
            loadCSS("https://cdn.quilljs.com/1.3.6/quill.snow.css");

            if (editorRef.current && !quillRef.current && window.Quill) {
                const fontSizes = ["10px", "12px", "14px", "18px", "24px", "32px"];
                const Size = window.Quill.import("attributors/style/size");
                Size.whitelist = fontSizes;
                window.Quill.register(Size, true);

                const quill = new window.Quill(editorRef.current, {
                    modules: { toolbar: false },
                    placeholder: "Type here coaching points / VAR...",
                    theme: "snow",
                });
                quillRef.current = quill;
                setQuillInstance(quill); // Pass instance to parent

                const quillToolbar = editorRef.current.previousSibling;
                if (quillToolbar && quillToolbar.classList.contains("ql-toolbar")) {
                    quillToolbar.style.display = "none";
                }
            }
        };

        initializeQuill();
    }, [setQuillInstance]);

    return (
        <div
          className="flex-grow overflow-y-scroll"
          style={{ position: "relative" }}
        >
          <div ref={editorRef} style={{ height: "100%", border: "none" }}></div>
        </div>
    );
};

export default NotesEditor;