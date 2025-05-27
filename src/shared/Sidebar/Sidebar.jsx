// src/components/Sidebar.jsx
import React, { useState, useMemo } from "react";
import { ReactSVG } from "react-svg";
import { GiSoccerField } from "react-icons/gi";
import { IoFootballOutline } from "react-icons/io5";
import { LuShapes } from "react-icons/lu";
import { TiArrowMoveOutline } from "react-icons/ti";
import { IoClose, IoBulbOutline } from "react-icons/io5";
import Frame from "../../assets/Fields/Frame.svg";
import Frame1 from "../../assets/Fields/Frame1.svg";
import Frame2 from "../../assets/Fields/Frame2.svg";
import Frame3 from "../../assets/Fields/Frame3.svg";
import Frame4 from "../../assets/Fields/Frame4.svg";
import Frame5 from "../../assets/Fields/Frame5.svg";
import Frame6 from "../../assets/Fields/Frame6.svg";
import Frame7 from "../../assets/Fields/Frame7.svg";

import { useSvg } from "../../context/SvgContext";

const Sidebar = () => {
  // Destructuring context values for SVG selection and color management
  const { setSelectedSvg, svgBgColor, setSvgBgColor, setSvgLineColor } = useSvg();

  // State to manage which menu is currently active (e.g., "pitch", "equipment")
  const [activeMenu, setActiveMenu] = useState(null);
  // State to manage the index of the currently active color combination
  const [activeColorIndex, setActiveColorIndex] = useState(0); // Default to the first color combination

  // Define the 4 required color combinations: background and line colors
  const colorCombinations = useMemo(() => [
    { bg: "#00A859", line: "#FFFFFF" }, // Green Background with white line
    { bg: "#FFFFFF", line: "#0055A4" }, // White Background with Blue line
    { bg: "#FFFFFF", line: "#000000" }, // White Background with Black line
    { bg: "#0055A4", line: "#FF0000" }, // Blue Background with Red line
  ], []);

  // Handler for clicking a main menu icon (e.g., Pitch, Equipment)
  const handleMenuClick = (menu) => {
    // Toggle the active menu: if the same menu is clicked, close it; otherwise, open the new menu
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Handler to close the currently active menu panel
  const closeMenu = () => {
    setActiveMenu(null);
  };

  // Handler for selecting a color combination button
  const handleColorButtonClick = (index) => {
    setActiveColorIndex(index); // Set the active color index
    const { bg, line } = colorCombinations[index]; // Get background and line colors from the selected combination
    setSvgBgColor(bg); // Update the SVG background color in context
    setSvgLineColor(line); // Update the SVG line color in context
  };

  // Handler for clicking an SVG component (e.g., a specific pitch layout)
  const handleSvgClick = (svg) => {
    // Set the selected SVG in the context, including its component, ID, current background color, and the line color
    setSelectedSvg({
      component: svg.component,
      id: svg.id,
      bgColor: svgBgColor, // Use the current background color from context
      lineColor: colorCombinations[activeColorIndex].line, // Use the line color of the currently active combination
    });
  };

  // Array of all your SVG components for easier rendering in the "Pitch" menu
  const svgComponents = [
    { id: 1, component: Frame },
    { id: 2, component: Frame1 },
    { id: 3, component: Frame2 },
    { id: 4, component: Frame3 },
    { id: 5, component: Frame4 },
    { id: 6, component: Frame5 },
    { id: 7, component: Frame6 },
    { id: 8, component: Frame7 },
  ];

  // Helper function to determine the brightness of a hexadecimal color
  const getColorBrightness = (hexColor) => {
    // Parse hex color to R, G, B components
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    // Calculate perceived brightness
    return (r * 299 + g * 587 + b * 114) / 1000 / 255;
  };

  // Memoized value to check if the current SVG background color is dark
  // This is used to conditionally invert the SVG colors if the background is dark,
  // making lines visible against a dark background in the sidebar preview.
  const isDarkColor = useMemo(() => {
    return getColorBrightness(svgBgColor) < 0.5;
  }, [svgBgColor]); // Recalculate only when svgBgColor changes

  // Function to modify SVG DOM before injection into the component
  // This is crucial for dynamically changing SVG line colors.
  const beforeInjection = (svg) => {
    // Get the current line color based on the active color combination
    const lineColor = colorCombinations[activeColorIndex].line;

    // Select all common SVG shape elements that typically have strokes
    const elements = svg.querySelectorAll('path, line, polyline, polygon, rect, circle');

    elements.forEach(element => {
      // Apply the lineColor to the 'stroke' attribute of each element
      // This ensures that all relevant lines/strokes in the SVG adopt the chosen line color
      element.setAttribute('stroke', lineColor);
      // Ensure fill is not overridden unless explicitly desired (e.g., for filled shapes)
      // If you want to change fill colors, you'd add similar logic for 'fill' attribute.
    });
  };

  return (
    <div className="h-screen w-max p-14 pl-14 relative">
      <div className="flex flex-col gap-5 relative">
        <div className="flex flex-col gap-4">
          {/* Pitch Menu Button */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("pitch")}
          >
            <GiSoccerField className="text-4xl rotate-90" />
            <p className="text-lg font-medium font-roboto">Pitch</p>
          </div>

          {/* Equipment Menu Button */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("equipment")}
          >
            <IoFootballOutline className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Equipment</p>
          </div>

          {/* Shape Menu Button */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("shape")}
          >
            <LuShapes className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Shape</p>
          </div>

          {/* Move Menu Button */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("move")}
          >
            <TiArrowMoveOutline className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Move</p>
          </div>
        </div>
      </div>

      {/* Active Menu Panel - Conditionally rendered based on activeMenu state */}
      {activeMenu && (
        <div className="absolute top-0 right-[-210px] w-[250px] h-full bg-gray-50 rounded-lg shadow-lg p-3">
          {/* Close button for the active menu panel */}
          <button
            onClick={closeMenu}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <IoClose className="text-xl" />
          </button>

          {/* Content for the "Pitch" menu */}
          {activeMenu === "pitch" && (
            <div className="p-[10px_10px_10px_10px]">
              <div className="flex justify-start items-start gap-[20px] flex-wrap">
                {/* Render the 4 color combination buttons */}
                {colorCombinations.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`w-[30px] h-[30px] rounded-full cursor-pointer border-2 ${activeColorIndex === index ? 'border-black' : 'border-transparent'}`}
                    style={{ backgroundColor: color.bg }}
                    onClick={() => handleColorButtonClick(index)}
                    title={`Background: ${color.bg}, Lines: ${color.line}`}
                  />
                ))}
              </div>

              <div className="mt-[35px]">
                {/* Changed to a grid to better manage SVG item layout */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Render all SVG components for selection */}
                  {svgComponents.map((svg) => (
                    <div
                      key={svg.id}
                      // Fixed dimensions for the container div
                      className="flex justify-center items-center p-[2px] w-[100px] h-[100px] border rounded-lg hover:bg-gray-100 cursor-pointer svg_size"
                      style={{ backgroundColor: svgBgColor }} // Apply current background color to the preview box
                      onClick={() => handleSvgClick(svg)}
                    >
                      <ReactSVG
                        src={svg.component}
                        beforeInjection={beforeInjection} // Apply beforeInjection to change SVG line colors
                        className="w-full h-full svg_div"                        
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder content for "Equipment" menu */}
          {activeMenu === "equipment" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Equipment</h3>
              <p>Equipment selection options will appear here</p>
            </div>
          )}

          {/* Placeholder content for "Shape" menu */}
          {activeMenu === "shape" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Shape Tools</h3>
              <p>Shape drawing tools will appear here</p>
            </div>
          )}

          {/* Placeholder content for "Move" menu */}
          {activeMenu === "move" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Move Tools</h3>
              <p>Movement controls will appear here</p>
            </div>
          )}
        </div>
      )}

      {/* Idea Box (Bulb Icon) - Displays tips on hover */}
      <div className="group relative">
        <div className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl">
          <IoBulbOutline className="text-4xl text-yellow-400" />
          <p className="text-lg font-medium font-roboto">Tips</p>
        </div>
        {/* Tooltip for tips */}
        <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <h3 className="font-bold text-blue-900 mb-2">
            Website Configuration Tips
          </h3>
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
