import { useState } from "react";
import { FaChevronDown, FaBold, FaUnderline, FaItalic } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { HiArrowPath } from "react-icons/hi2";
import { BsFiletypePdf } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";

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

const RightSidebar = () => {
  const [coachingPoints, setCoachingPoints] = useState("");
  const [activeTool, setActiveTool] = useState("bold");

  return (
    <div className="w-[570px] min-h-screen p-6 bg-white">
      {/* Save Section */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col gap-6">
          <button className="w-60 h-12 px-6 py-2.5 rounded-full border border-blue-900 flex items-center gap-2 hover:bg-blue-50">
            <HiArrowPath className="w-5 h-5" />
            <span className="text-lg font-medium">Save as</span>
          </button>
          <div className="w-56 h-16 bg-slate-200 rounded-2xl border border-blue-900 flex items-center justify-between px-4">
            <span className="text-lg font-medium">Drill</span>
            <FaChevronDown />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button className="flex flex-col justify-center items-center p-1 w-[130px] h-[100px] shadow rounded-lg hover:bg-gray-100">
            <BsFiletypePdf className="text-3xl mb-1" />
            <span className="text-lg font-medium">Save as PDF</span>
          </button>
          <button className="flex flex-col justify-center items-center p-1 w-[130px] h-[100px] shadow rounded-lg hover:bg-gray-100">
            <PiShareFat className="text-3xl mb-1" />
            <span className="text-lg font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Coaching Notes Section */}
      <div className="h-[424px] rounded-2xl border border-indigo-300 p-6">
        <div className="flex items-center gap-4 p-2 rounded-lg border border-indigo-300 mb-4">
          <ToolbarButton onClick={() => setActiveTool("bold")} active={activeTool === "bold"}>
            <FaBold className="text-xl" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setActiveTool("italic")} active={activeTool === "italic"}>
            <FaItalic className="text-xl" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setActiveTool("underline")} active={activeTool === "underline"}>
            <FaUnderline className="text-xl" />
          </ToolbarButton>
          <ToolbarButton onClick={() => setActiveTool("list")} active={activeTool === "list"}>
            <VscThreeBars className="text-xl" />
          </ToolbarButton>
        </div>
        <textarea
          className="w-full h-full p-4 text-lg font-medium focus:outline-none resize-none"
          placeholder="Type here coaching points / VAR..."
          value={coachingPoints}
          onChange={(e) => setCoachingPoints(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RightSidebar;