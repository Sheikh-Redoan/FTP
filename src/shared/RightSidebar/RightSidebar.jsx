import { useState } from "react";
import {
  FaSave,
  FaShare,
  FaChevronDown,
} from "react-icons/fa";

import { FaBold } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";
import { VscThreeBars } from "react-icons/vsc";
import { HiArrowPath } from "react-icons/hi2";
import { BsFiletypePdf } from "react-icons/bs";
import { PiShareFat } from "react-icons/pi";







const RightSidebar = () => {
  const [coachingPoints, setCoachingPoints] = useState("");
  const [activeTool, setActiveTool] = useState("pen");

  return (
    <div className="w-[570px] min-h-[1190px] p-6 bg-white">
      {/* Header with Save options */}
      <div className="flex justify-between items-start mb-10">
        {/* Save as button */}

        {/* Left sidebar */}
        <div className="flex flex-col gap-6">
          <button className="w-60 h-12 px-6 py-2.5 rounded-full border border-blue-900 flex items-center gap-2 hover:bg-blue-50 transition-colors">
            <HiArrowPath className="text-blue-900 w-5 h-5" />
            <span className="text-blue-900 text-lg font-medium">Save as</span>
          </button>
          {/* Drill dropdown */}
          <div className="w-56 h-16 bg-slate-200 rounded-2xl border border-blue-900 flex items-center justify-between px-4">
            <span className="text-blue-900 text-lg font-medium">Drill</span>
            <FaChevronDown className="text-blue-900" />
          </div>
        </div>

        {/* Save options */}
        <div className="flex flex-col gap-4">
          <button className="w-44 h-36 bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-4 hover:bg-gray-50">
            <div className="">
              <BsFiletypePdf className="text-blue-900 text-[30px]" />
            </div>
            <span className="text-blue-900 text-lg font-medium">
              Save as PDF
            </span>
          </button>

          <button className="w-44 h-36 bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center gap-4 hover:bg-gray-50">
            <div className="">
              <PiShareFat className="text-blue-900  text-[30px]" />
            </div>
            <span className="text-blue-900 text-lg font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-6">
        {/* Main text area */}
        <div className="flex-1 h-[524px] rounded-2xl border border-indigo-300 p-6">
          {/* Tools sidebar */}
          <div className="w-max flex items-center justify-start gap-4 p-2 rounded-lg border border-indigo-300">
            <button
              onClick={() => setActiveTool("pen")}
              className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                activeTool === "pen"
                  ? "bg-blue-100 border-2 border-blue-900"
                  : "border border-blue-900"
              }`}
            >
              <FaBold className="text-blue-900 text-xl" />
            </button>

            <button
              onClick={() => setActiveTool("highlighter")}
              className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                activeTool === "highlighter"
                  ? "bg-blue-100 border-2 border-blue-900"
                  : "border border-blue-900"
              }`}
            >
              <FaItalic className="text-blue-900 text-xl" />
            </button>

            <button
              onClick={() => setActiveTool("shapes")}
              className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                activeTool === "shapes"
                  ? "bg-blue-100 border-2 border-blue-900"
                  : "border border-blue-900"
              }`}
            >
              <FaUnderline className="text-blue-900 text-xl" />
            </button>

            <button
              onClick={() => setActiveTool("note")}
              className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                activeTool === "note"
                  ? "bg-blue-100 border-2 border-blue-900"
                  : "border border-blue-900"
              }`}
            >
              <VscThreeBars className="text-blue-900 text-xl" />
            </button>
          </div>
          <textarea
            className="w-full h-full p-4 text-lg font-medium text-slate-900 focus:outline-none resize-none"
            placeholder="Type here coaching points /VAR"
            value={coachingPoints}
            onChange={(e) => setCoachingPoints(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
