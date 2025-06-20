import { useState, useEffect, useRef } from "react";
import { useSvg } from "../../context/SvgContext";
import NotesEditorToolbar from "../../components/right-sidebar/NotesEditorToolbar";
import ActionButtons from "../../components/right-sidebar/ActionButtons";
import NotesEditor from "../../components/right-sidebar/NotesEditor";

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

const RightSidebar = () => {
  const { exportFunctions, setGetNotesDeltaFunc } = useSvg();
  const [quillInstance, setQuillInstance] = useState(null);
  const quillRef = useRef(null);

  // Keep a mutable ref to the quill instance
  useEffect(() => {
     quillRef.current = quillInstance;
  }, [quillInstance]);

  // Load external dependencies for exporting
  useEffect(() => {
    const loadDependencies = async () => {
        await loadScript("https://html2canvas.hertzen.com/dist/html2canvas.min.js");
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    };
    loadDependencies();
  }, []);
  
  // Provide the function to get notes delta to the context once Quill is ready
  useEffect(() => {
    if (setGetNotesDeltaFunc && quillRef.current) {
        const getNotesDelta = () => {
            return quillRef.current ? quillRef.current.getContents() : null;
        };
      setGetNotesDeltaFunc(() => getNotesDelta);
    }
  }, [setGetNotesDeltaFunc, quillInstance]);


  return (
    <div className="w-[570px] min-h-screen p-6 bg-white">
      <ActionButtons exportFunctions={exportFunctions} />
      
      <div className="h-[424px] rounded-2xl border border-indigo-300 p-6 flex flex-col">
        {quillInstance && <NotesEditorToolbar quillRef={quillRef} />}
        <NotesEditor setQuillInstance={setQuillInstance} />
      </div>
    </div>
  );
};

export default RightSidebar;