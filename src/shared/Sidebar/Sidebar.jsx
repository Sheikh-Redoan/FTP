// src/components/Sidebar.jsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { ReactSVG } from "react-svg";
import { GiSoccerField } from "react-icons/gi";
import { IoFootballOutline } from "react-icons/io5";
import { LuShapes } from "react-icons/lu";
import { TiArrowMoveOutline } from "react-icons/ti";
import { IoClose, IoBulbOutline } from "react-icons/io5";

// Pitch SVGs
import Frame from "../../assets/Fields/Frame.svg";
import Frame1 from "../../assets/Fields/Frame1.svg";
import Frame2 from "../../assets/Fields/Frame2.svg";
import Frame3 from "../../assets/Fields/Frame3.svg";
import Frame4 from "../../assets/Fields/Frame4.svg";
import Frame5 from "../../assets/Fields/Frame5.svg";
import Frame6 from "../../assets/Fields/Frame6.svg";
import Frame7 from "../../assets/Fields/Frame7.svg";

// NEW: Equipment SVGs
import Player from "../../assets/Equipment/Player.svg";
import Ring from "../../assets/Equipment/Ring.svg";
import PlayerWithPerspective from "../../assets/Equipment/PlayerWithPerspective.svg";
import Player3 from "../../assets/Equipment/Player3.svg";
import Player2 from "../../assets/Equipment/Player2.svg";
import OpponentWithPerspective from "../../assets/Equipment/OpponentWithPerspective.svg";
import Ladder from "../../assets/Equipment/Ladder.svg";
import GoalSmall from "../../assets/Equipment/GoalSmall.svg";
import GoalMiddle from "../../assets/Equipment/GoalMiddle.svg";
import GoalBig from "../../assets/Equipment/GoalBig.svg";
import Football from "../../assets/Equipment/Football.svg";
import Dummy from "../../assets/Equipment/Dummy.svg";
import Cone from "../../assets/Equipment/Cone.svg";
import Flag from "../../assets/Equipment/Flag.svg";

import { useSvg } from "../../context/SvgContext";

// Helper function to fetch and modify SVG string
async function getModifiedSvgString(svgUrl, bgColor, lineColor) {
  try {
    const response = await fetch(svgUrl);
    let svgText = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const elements = svgElement.querySelectorAll("path, line, polyline, polygon, rect, circle");
    elements.forEach((element) => {
      element.setAttribute("stroke", lineColor);
      element.setAttribute("fill", bgColor);
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgDoc);
  } catch (error) {
    console.error("Error fetching or modifying SVG:", error);
    // Fallback: return a simple SVG placeholder or null if fetching fails
    return `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="red"/><text x="10" y="10" font-size="8" fill="white" text-anchor="middle" alignment-baseline="middle">Error</text></svg>`;
  }
}


const DragItem = ({ src, name, onDragStart, beforeInjection, displaySvgContent }) => {
  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        // Set data for drag-and-drop. Necessary for some browsers to allow drag.
        // The actual data transferred here is less important than the data stored in context.
        e.dataTransfer.setData("text/plain", name);
        onDragStart(src, displaySvgContent); // Pass src AND content
      }}
      className="flex flex-col items-center gap-1 w-full"
    >
      <div className="flex justify-center items-center p-[2px] w-full h-[100px] border rounded-lg hover:bg-gray-100 cursor-pointer">
        {/* Use ReactSVG for display in sidebar, apply beforeInjection */}
        <ReactSVG
          src={src}
          beforeInjection={beforeInjection}
          className={`w-auto h-auto`}
        />
      </div>
      <span className="text-sm text-center w-full">{name}</span>
    </div>
  );
};

const Sidebar = () => {
  const {
    setSelectedSvg,
    svgBgColor,
    setSvgBgColor,
    setSvgLineColor,
    equipmentBgColor,
    setEquipmentBgColor,
    equipmentLineColor,
    setEquipmentLineColor,
    setDraggedEquipmentSrc,
  } = useSvg();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activePitchColorIndex, setActivePitchColorIndex] = useState(0);
  const [activeEquipmentColorIndex, setActiveEquipmentColorIndex] = useState(0);

  // State to store pre-processed SVG content for equipment
  const [equipmentSvgContents, setEquipmentSvgContents] = useState({});

  const pitchColorCombinations = useMemo(
    () => [
      { bg: "#00A859", line: "#FFFFFF" },
      { bg: "#FFFFFF", line: "#0055A4" },
      { bg: "#FFFFFF", line: "#000000" },
      { bg: "#0055A4", line: "#FF0000" },
    ],
    []
  );

  const equipmentColorCombinations = useMemo(
    () => [
      { bg: "#D4DA65", line: "#D4DA65" },
      { bg: "#22274A", line: "#22274A" },
      { bg: "#165349", line: "#165349" },
      { bg: "#111425", line: "#111425" },
      { bg: "#A093C2", line: "#A093C2" },
      { bg: "#DC052D", line: "#DC052D" },
      { bg: "#6CABDD", line: "#6CABDD" },
      { bg: "#FDE100", line: "#FDE100" },
      { bg: "#1D9053", line: "#1D9053" },
    ],
    []
  );

  const equipmentNames = useMemo(
    () => [
      "Player", "Football", "Opponent with Perspective", "Player with Perspective",
      "Player 2", "Player 3", "Cone", "Ladder", "Dummy", "Ring",
      "Goal Small", "Goal Middle", "Goal Big", "Flag",
    ],
    []
  );

  const equipmentSvgComponents = useMemo(() => [
    { id: 100, component: Player },
    { id: 101, component: Football },
    { id: 102, component: OpponentWithPerspective },
    { id: 103, component: PlayerWithPerspective },
    { id: 104, component: Player2 },
    { id: 105, component: Player3 },
    { id: 106, component: Cone },
    { id: 107, component: Ladder },
    { id: 108, component: Dummy },
    { id: 109, component: Ring },
    { id: 110, component: GoalSmall },
    { id: 111, component: GoalMiddle },
    { id: 112, component: GoalBig },
    { id: 113, component: Flag },
  ], []);

  // Pre-fetch and process SVG content when equipment colors change or component mounts
  useEffect(() => {
    const loadSvgContents = async () => {
      const newContents = {};
      const { bg, line } = equipmentColorCombinations[activeEquipmentColorIndex];

      for (const eq of equipmentSvgComponents) {
        // Use the actual URL of the imported SVG (e.g., /assets/Player-a1b2c3d4.svg)
        const svgUrl = eq.component;
        newContents[eq.id] = await getModifiedSvgString(svgUrl, bg, line);
      }
      setEquipmentSvgContents(newContents);
    };
    loadSvgContents();
  }, [activeEquipmentColorIndex, equipmentColorCombinations, equipmentSvgComponents]);


  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const handlePitchColorButtonClick = (index) => {
    setActivePitchColorIndex(index);
    const { bg, line } = pitchColorCombinations[index];
    setSvgBgColor(bg);
    setSvgLineColor(line);
  };

  const handleEquipmentColorButtonClick = (index) => {
    setActiveEquipmentColorIndex(index);
    const { bg, line } = equipmentColorCombinations[index];
    setEquipmentBgColor(bg);
    setEquipmentLineColor(line);
    // The useEffect for loading SVG contents will react to activeEquipmentColorIndex change
  };

  const handleSvgClick = (svg, type) => {
    if (type === "pitch") {
      setSelectedSvg({
        component: svg.component,
        id: svg.id,
        bgColor: svgBgColor,
        lineColor: pitchColorCombinations[activePitchColorIndex].line,
      });
    }
  };

  const pitchSvgComponents = [
    { id: 1, component: Frame }, { id: 2, component: Frame1 },
    { id: 3, component: Frame2 }, { id: 4, component: Frame3 },
    { id: 5, component: Frame4 }, { id: 6, component: Frame5 },
    { id: 7, component: Frame6 }, { id: 8, component: Frame7 },
  ];

  const beforePitchSvgInjection = (svg) => {
    const lineColor = pitchColorCombinations[activePitchColorIndex].line;
    const elements = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((element) => {
      element.setAttribute("stroke", lineColor);
    });
  };

  const beforeEquipmentSvgInjection = useCallback((svg) => {
    const lineColor = equipmentColorCombinations[activeEquipmentColorIndex].line;
    const bgColor = equipmentColorCombinations[activeEquipmentColorIndex].bg;
    const elements = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((element) => {
      element.setAttribute("stroke", lineColor);
      element.setAttribute("fill", bgColor);
    });
  }, [activeEquipmentColorIndex, equipmentColorCombinations]);

  // Handler for when an equipment SVG starts being dragged
  const handleEquipmentDragStart = (src, modifiedSvgContent) => {
    setDraggedEquipmentSrc({
      src: src, // Original src for reference
      content: modifiedSvgContent, // The actual SVG content string
      bgColor: equipmentColorCombinations[activeEquipmentColorIndex].bg,
      lineColor: equipmentColorCombinations[activeEquipmentColorIndex].line,
    });
  };

  return (
    <div className="h-screen w-max p-14 pl-14 relative">
      <div className="flex flex-col gap-5 relative">
        <div className="flex flex-col gap-4">
          {/* Menu Buttons */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("pitch")}
          >
            <GiSoccerField className="text-4xl rotate-90" />
            <p className="text-lg font-medium font-roboto">Pitch</p>
          </div>

          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("equipment")}
          >
            <IoFootballOutline className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Equipment</p>
          </div>

          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("shape")}
          >
            <LuShapes className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Shape</p>
          </div>

          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("move")}
          >
            <TiArrowMoveOutline className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Move</p>
          </div>
        </div>
      </div>

      {/* Active Menu Panel */}
      {activeMenu && (
        <div className="absolute top-0 right-[-210px] w-[250px] h-full bg-[#E6E6F4] rounded-lg shadow-lg p-3 overflow-y-auto z-[9999]">
          <button
            onClick={closeMenu}
            className="absolute top-2 right-2 text-black hover:text-gray-700"
          >
            <IoClose className="text-xl" />
          </button>

          {activeMenu === "pitch" && (
            <div className="p-[10px_10px_10px_10px]">
              <div className="flex justify-start items-start gap-[20px] flex-wrap">
                {pitchColorCombinations.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-[30px] h-[30px] rounded-full cursor-pointer border-2 border-green-500 ${
                      activePitchColorIndex === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.bg }}
                    onClick={() => handlePitchColorButtonClick(index)}
                    title={`Background: ${color.bg}, Lines: ${color.line}`}
                  />
                ))}
              </div>

              <div className="mt-[35px]">
                <div className="grid grid-cols-2 gap-4">
                  {pitchSvgComponents.map((svg) => (
                    <div
                      key={svg.id}
                      className="flex justify-center items-center p-[2px] w-[100px] h-[100px] border rounded-lg hover:bg-gray-100 cursor-pointer svg_size"
                      style={{ backgroundColor: svgBgColor }}
                      onClick={() => handleSvgClick(svg, "pitch")}
                    >
                      <ReactSVG
                        src={svg.component}
                        beforeInjection={beforePitchSvgInjection}
                        className="w-auto h-full svg_div"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "equipment" && (
            <div className="p-[10px_10px_10px_10px]">
              <div className="flex justify-start items-start gap-[20px] flex-wrap">
                {equipmentColorCombinations.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-[30px] h-[30px] rounded-full cursor-pointer border-2 ${
                      activeEquipmentColorIndex === index
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.bg }}
                    onClick={() => handleEquipmentColorButtonClick(index)}
                    title={`Background: ${color.bg}, Lines: ${color.line} fill: ${color.bg}`}
                  />
                ))}
              </div>

              <div className="mt-[35px]">
                <div className="flex flex-col items-center gap-2">
                  {equipmentSvgComponents.map((eq, index) => (
                    <DragItem
                      key={eq.id}
                      src={eq.component}
                      name={equipmentNames[index]}
                      onDragStart={handleEquipmentDragStart}
                      beforeInjection={beforeEquipmentSvgInjection}
                      displaySvgContent={equipmentSvgContents[eq.id]} // Pass the pre-processed content
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder menus */}
          {activeMenu === "shape" && (
            <div><h3 className="text-lg font-bold mb-4">Shape Tools</h3><p>Shape drawing tools will appear here</p></div>
          )}
          {activeMenu === "move" && (
            <div><h3 className="text-lg font-bold mb-4">Move Tools</h3><p>Movement controls will appear here</p></div>
          )}
        </div>
      )}

      {/* Idea Box (Bulb Icon) */}
      <div className="group relative">
        <div className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl">
          <IoBulbOutline className="text-4xl text-yellow-400" />
          <p className="text-lg font-medium font-roboto">Tips</p>
        </div>
        <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <h3 className="font-bold text-blue-900 mb-2">Website Configuration Tips</h3>
          <ul className="text-sm space-y-2">
            <li>• Click on any menu to see available options</li>
            <li>• Drag and drop elements to position them</li>
            <li>• Use right-click for additional options</li>
            <li>• Save your configurations regularly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;