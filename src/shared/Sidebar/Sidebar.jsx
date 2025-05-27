import React, { useState, useRef, useMemo } from "react";
import { GiSoccerField } from "react-icons/gi";
import { IoFootballOutline } from "react-icons/io5";
import { LuShapes } from "react-icons/lu";
import { TiArrowMoveOutline } from "react-icons/ti";
import { IoBulbOutline, IoClose, IoEyedrop } from "react-icons/io5";
import pitch01 from "../../assets/Fields/pitch01.svg";
import Frame from "../../assets/Fields/Frame.svg";
import Frame1 from "../../assets/Fields/Frame1.svg";
import Frame2 from "../../assets/Fields/Frame2.svg";
import Frame3 from "../../assets/Fields/Frame3.svg";
import Frame4 from "../../assets/Fields/Frame4.svg";
import Frame5 from "../../assets/Fields/Frame5.svg";
import Frame6 from "../../assets/Fields/Frame6.svg";

import { useSvg } from "../../context/SvgContext";

const Sidebar = () => {
  const { setSelectedSvg, svgBgColor, setSvgBgColor } = useSvg();

  const [activeMenu, setActiveMenu] = useState(null);
  const colorInputRef = useRef(null);
  const [svgColor, setSvgColor] = useState("#000000"); // This now controls the SVG div background
  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  //   const handleColorChange = (e) => {
  //     setSvgColor(e.target.value);
  //   };

  const handleEyedropClick = () => {
    colorInputRef.current.click();
  };

  // Array of all your SVG components for easier rendering
  const svgComponents = [
    { id: 1, component: pitch01 },
    { id: 2, component: Frame },
    { id: 3, component: Frame1 },
    { id: 4, component: Frame2 },
    { id: 5, component: Frame3 },
    { id: 6, component: Frame4 },
    { id: 7, component: Frame5 },
    { id: 8, component: Frame6 },
  ];

  const getColorBrightness = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 / 255;
  };

  const isDarkColor = useMemo(() => {
    return getColorBrightness(svgColor) < 0.5;
  }, [svgColor]);

  // New function to handle color button clicks
  //   const handleColorButtonClick = (color) => {
  //     setSvgColor(color);
  //   };

  const handleColorButtonClick = (color) => {
    setSvgBgColor(color);
  };

  const handleColorChange = (e) => {
    setSvgBgColor(e.target.value);
  };
  const handleSvgClick = (svg) => {
    setSelectedSvg({
      component: svg.component,
      id: svg.id,
      color: svgBgColor,
    });
  };

  return (
    <div className="h-screen w-max p-14 pl-14 relative">
      <div className="flex flex-col gap-5 relative">
        <div className="flex flex-col gap-4">
          {/* Pitch Menu */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("pitch")}
          >
            <GiSoccerField className="text-4xl rotate-90" />
            <p className="text-lg font-medium font-roboto">Pitch</p>
          </div>

          {/* Equipment Menu */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("equipment")}
          >
            <IoFootballOutline className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Equipment</p>
          </div>

          {/* Shape Menu */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("shape")}
          >
            <LuShapes className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Shape</p>
          </div>

          {/* Move Menu */}
          <div
            className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer"
            onClick={() => handleMenuClick("move")}
          >
            <TiArrowMoveOutline className="text-4xl" />
            <p className="text-lg font-medium font-roboto">Move</p>
          </div>
        </div>

        {/* Active Menu Panel */}
      </div>

      {/* Active Menu Panel */}
      {activeMenu && (
        <div className="absolute top-0 right-[-210px] w-[250px] h-full bg-gray-50 rounded-lg shadow-lg p-4">
          <button
            onClick={closeMenu}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <IoClose className="text-xl" />
          </button>

          {activeMenu === "pitch" && (
            <div className="p-[35px_35px_20px_35px]">
              <div className="flex justify-start items-start gap-[24px] flex-wrap">
                {/* Color selection buttons - now update svgColor directly */}
                {["#FFA500", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"].map(
                  (color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-[30px] h-[30px] rounded-full cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorButtonClick(color)}
                    />
                  )
                )}

                {/* Eyedropper tool with hidden color input */}
                <div
                  className="w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden relative flex justify-center items-center"
                  onClick={handleEyedropClick}
                  style={{ backgroundColor: svgColor }}
                >
                  <IoEyedrop className="text-white relative z-10" />
                  <input
                    ref={colorInputRef}
                    type="color"
                    className="absolute opacity-0 w-full h-full cursor-pointer"
                    onChange={handleColorChange}
                  />
                </div>
              </div>

              <div className="mt-[35px]">
                <div className="grid grid-cols-2 gap-4">
                  {svgComponents.map((svg) => (
                    <div
                      key={svg.id}
                      className="flex justify-center items-center p-2 border rounded-lg hover:bg-gray-100 cursor-pointer "
                      style={{ backgroundColor: svgBgColor }}
                      onClick={() => handleSvgClick(svg)}
                    >
                      <img
                        src={svg.component}
                        alt={`Field ${svg.id}`}
                        style={{
                          filter: isDarkColor ? "invert(1)" : "invert(0)",
                          opacity: isDarkColor ? 0.9 : 0.8,
                        }}
                        className="w-16 h-16"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "equipment" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Equipment</h3>
              <p>Equipment selection options will appear here</p>
            </div>
          )}

          {activeMenu === "shape" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Shape Tools</h3>
              <p>Shape drawing tools will appear here</p>
            </div>
          )}

          {activeMenu === "move" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Move Tools</h3>
              <p>Movement controls will appear here</p>
            </div>
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
