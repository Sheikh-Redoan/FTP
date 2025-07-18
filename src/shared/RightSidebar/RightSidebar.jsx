import { useState, useEffect, useRef } from "react";
import { useSvg } from "../../context/SvgContext";
import NotesEditorToolbar from "../../components/right-sidebar/NotesEditorToolbar";
import ActionButtons from "../../components/right-sidebar/ActionButtons";
import NotesEditor from "../../components/right-sidebar/NotesEditor";
import { FaTimes, FaBars } from "react-icons/fa";

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
  const { exportFunctions, activeDrill, setDrillNotes } = useSvg();
  const [quillInstance, setQuillInstance] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
  
  // Effect to LOAD notes into the editor when the drill changes
  useEffect(() => {
      if (quillInstance && activeDrill) {
          // Check if the content is different to avoid unnecessary updates
          // and cursor jumping.
          const editorContent = JSON.stringify(quillInstance.getContents());
          const drillNotesContent = JSON.stringify(activeDrill.notes);

          if (editorContent !== drillNotesContent) {
              quillInstance.setContents(activeDrill.notes);
          }
      }
  }, [activeDrill, quillInstance]);

  // Effect to SAVE notes from the editor on text-change
  useEffect(() => {
      if (quillInstance) {
          const handler = (delta, oldDelta, source) => {
              if (source === 'user') {
                  const contents = quillInstance.getContents();
                  setDrillNotes(contents);
              }
          };
          quillInstance.on('text-change', handler);

          return () => {
              quillInstance.off('text-change', handler);
          };
      }
  }, [quillInstance, setDrillNotes]);


  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(".right-sidebar");
      const toggleButton = document.querySelector(".sidebar-toggle");
      
      if (window.innerWidth < 1330 && 
          isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target) && 
          toggleButton && 
          !toggleButton.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Toggle Button - Only visible on small screens */}
      <button 
        className={`sidebar-toggle fixed z-61 top-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 max-[800px]:top-10 ${
          window.innerWidth >= 1330 ? "hidden" : ""
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`right-sidebar w-full md:w-[570px] min-h-screen p-6 bg-white max-[1330px]:max-w-[400px] max-[1330px]:fixed max-[1330px]:top-0 max-[1330px]:right-0 max-[1330px]:h-full max-[1330px]:z-[51] max-[1330px]:shadow-xl max-[1330px]:transition-transform max-[1330px]:duration-300 ${
          window.innerWidth < 1330
            ? isSidebarOpen
              ? "translate-x-0"
              : "translate-x-full"
            : ""
        }`}
      >
        <ActionButtons exportFunctions={exportFunctions} />
        
        <div className="h-[424px] rounded-2xl border border-indigo-300 p-6 flex flex-col">
          {quillInstance && <NotesEditorToolbar quillRef={quillRef} />}
          <NotesEditor setQuillInstance={setQuillInstance} />
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
// 