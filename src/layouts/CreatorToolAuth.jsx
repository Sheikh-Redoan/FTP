import SwitchCreatorTopNav from "@/shared/SwitchCreatorTopNav";
import { useEffect, useRef, useState } from "react";
import Moveable from "react-moveable";
import {
  Player,
  Dummy,
  Ladder,
  Cone,
  Football,
  Frame11,
  Frame12,
  Frame13,
  Frame14,
  Frame15,
  Frame16,
  Frame17,
  Frame18,
  Back11,
  Reboot,
  Lock1,
  Clener1,
  Duplicate1,
} from "@/assets/SidebarIcon";
import {
  Equipment1,
  Lines11,
  Pitch11,
  QuickAccess1,
  Text11,
} from "@/assets/SidebarIcon";
import { NavLink } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";

import Ellipse1 from "../assets/imges/Ellipse  (1).png";
import Ellipse2 from "../assets/imges/Ellipse  (2).png";
import Ellipse3 from "../assets/imges/Ellipse  (3).png";
import Ellipse4 from "../assets/imges/Ellipse  (4).png";
import Ellipse5 from "../assets/imges/Ellipse  (5).png";
import Ellipse6 from "../assets/imges/Ellipse  (6).png";
import Ellipse7 from "../assets/imges/Ellipse7.png";
import Ellipse8 from "../assets/imges/Ellipse8.png";
import Ellipse9 from "../assets/imges/Ellipse9.png";
import Ellipse10 from "../assets/imges/Ellipse10.png";
import Ellipse11 from "../assets/imges/Ellipse11.png";
import Ellipse12 from "../assets/imges/Ellipse12.png";
import RightSwitchCreatorSide from "@/shared/RightSwitchCreatorSide";

const CreatorToolAuth = () => {
  const [active, setActive] = useState("one");
  const canvasWrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [svgBackgroundColor, setSvgBackgroundColor] = useState("#FFFFFF");
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);


  const handleDotClick = (color) => setSvgBackgroundColor(color);

    // Function to clear the selected element
    const clearSelectedElement = () => {
      if (selectedElementId) {
        setElements((prevElements) =>
          prevElements.filter((el) => el.id !== selectedElementId)
        );
        setSelectedElementId(null); // Reset selected element
      }
    };

  // Handle keyboard events (Backspace/Delete)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        clearSelectedElement();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedElementId]); // Re-run the effect when selectedElementId changes



  

  useEffect(() => {
    const fields = document.querySelectorAll(".field");
    fields.forEach((field) => {
      field.draggable = true;
      field.addEventListener("dragstart", function (e) {
        const svgElement = this.querySelector("svg");
        if (svgElement) {
          const clonedSvg = svgElement.cloneNode(true);
          clonedSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          clonedSvg.setAttribute("width", "100%");
          clonedSvg.setAttribute("height", "100%");
          clonedSvg.setAttribute("viewBox", "0 0 100 100");

          const svgXml = new XMLSerializer().serializeToString(clonedSvg);
          e.dataTransfer.setData("text/plain", svgXml);
        }
      });
    });

    const wrapper = canvasWrapperRef.current;
    const handleDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData("text/plain"); // Get the SVG string
      const id = Date.now(); // Unique ID for the element
      const offsetX = e.clientX - canvasWrapperRef.current.getBoundingClientRect().left;
      const offsetY = e.clientY - canvasWrapperRef.current.getBoundingClientRect().top;

      // Set the initial dimensions of the SVG (for scaling)
      const svgWidth = 100; // You can adjust this based on your SVG size
      const svgHeight = 100; // Same here, adjust as necessary


      setElements((prev) => [
        ...prev,
        {
          id,
          svg: data,
          x: offsetX,
          y: offsetY,
          rotation: 0,
          scale: 1,  // Initialize scale to 1 (original size)
          width: svgWidth,  // Initial width for Moveable
          height: svgHeight, // Initial height for Moveable
        },
      ]);
    };

    const handleDragOver = (e) => e.preventDefault();
    wrapper.addEventListener("dragover", handleDragOver);
    wrapper.addEventListener("drop", handleDrop);

    return () => {
      wrapper.removeEventListener("dragover", handleDragOver);
      wrapper.removeEventListener("drop", handleDrop);
    };
  }, []);


  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e, svgContent) => {
    e.dataTransfer.setData("text/plain", svgContent); // Set the SVG content
  };


  return (
    <div className="bg-[#F3F4F7] min-h-screen ">
      <SwitchCreatorTopNav />
      <div className="grid grid-cols-12 py-10 gap-6">
        <div className="col-span-2 ">
          <div className="flex-grow flex flex-col gap-4 items-center">
            <div>
              <NavLink
                onClick={() => {
                  setActive("one");
                  setToggle(!toggle);
                }}
                to="/CreatorTool/switchCreator"
                className={({ isActive }) =>
                  `flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[140px] ${
                    isActive
                      ? "bg-[#010792] text-white"
                      : "bg-white text-[#010792]"
                  }`
                }
              >
                <Pitch11 width={40} height={40} fillColor="currentColor" />
                <h2>Pitch</h2>
              </NavLink>
            </div>

            <NavLink
              onClick={() => {
                setActive("two");
                setToggle(!toggle);
              }}
              to="/CreatorTool/QuickAccess"
              className={({ isActive }) =>
                `flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[140px] ${
                  isActive
                    ? "bg-[#010792] text-white"
                    : "bg-white text-[#010792]"
                }`
              }
            >
              <QuickAccess1 width={40} height={40} fillColor="currentColor" />
              <h2>Quick Access</h2>
            </NavLink>

            <NavLink
              onClick={() => setActive("three")}
              to="/players"
              className={({ isActive }) =>
                `flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[140px] ${
                  isActive
                    ? "bg-[#010792] text-white"
                    : "bg-white text-[#010792]"
                }`
              }
            >
              <PiUserCircleLight size={42} className="currentColor" />
              <h2>Players</h2>
            </NavLink>

            <NavLink
              to="/lines"
              className={({ isActive }) =>
                `flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[140px] ${
                  isActive
                    ? "bg-[#010792] text-white"
                    : "bg-white text-[#010792]"
                }`
              }
            >
              <Lines11 width={40} height={40} fillColor="currentColor" />
              <h2>Lines</h2>
            </NavLink>

            <NavLink
              to="/equipment"
              className={({ isActive }) =>
                `flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[140px] ${
                  isActive
                    ? "bg-[#010792] text-white"
                    : "bg-white text-[#010792]"
                }`
              }
            >
              <Equipment1 width={40} height={40} fillColor="currentColor" />
              <h2>Equipment</h2>
            </NavLink>

            <NavLink
              to="/text-nr"
              className={({ isActive }) =>
                `flex flex-col gap-2 items-center py-4 text-lg rounded-[16px] w-[140px] ${
                  isActive
                    ? "bg-[#010792] text-white"
                    : "bg-white text-[#010792]"
                }`
              }
            >
              <Text11 width={40} height={40} fillColor="currentColor" />
              <h2>Text & Nr.</h2>
            </NavLink>
          </div>
        </div>
        <div className="col-span-10 relative">
          <div className="grid grid-cols-12 gap-6">
            {/* praent/Canvas ------------------------*/}

            <div className="col-span-7 ">

            <div ref={canvasWrapperRef} className="relative w-full h-[80vh] bg-white border">
              
              {elements.map((el, index) => (
                  <div
                    key={el.id}
                    id={`element-${el.id}`}
                    style={{
                      position: "absolute",
                      top: el.y,
                      left: el.x,
                      transform: `rotate(${el.rotation}deg) scale(${el.scale})`, // Apply scale via transform
                      transformOrigin: "center", // Ensures rotation is centered
                      cursor: "pointer", // Adding cursor style to indicate that it can be selected
                    }}
                    dangerouslySetInnerHTML={{ __html: el.svg }}
                    onClick={() => {
                      console.log("Element ID:", el.id);  // Check if ID is being correctly set
                      setSelectedElementId(el.id); // Set the selected element on click
                    }}
                  />
                ))}

                {elements.map((el, index) => (
                  <Moveable
                  key={`moveable-${el.id}`}
                  target={() => document.getElementById(`element-${el.id}`)}
                  rotatable={true}
                  scalable={true}  // Ensure this is enabled for scaling
                  draggable={true}
                  edge={false}
                  throttleRotate={0.2}
                  resizable={true}
                  throttleResize={0}
                  onResizeStart={({ target, clientX, clientY }) => {
                    console.log("onResizeStart", target);
                  }}
                  onResize={({ target, width, height, dist, delta, direction, clientX, clientY }) => {
                    console.log("onResize", target);
                    
                    // Update width and height properly
                    if (delta[0]) {
                      target.style.width = `${width}px`;  // Update width if delta[0] is true
                    }
                    if (delta[1]) {
                      target.style.height = `${height}px`;  // Update height if delta[1] is true
                    }
                
                    // You might want to adjust elements' state to reflect the resizing as well
                    setElements((prev) => {
                      const updated = [...prev];
                      updated[index].width = width;
                      updated[index].height = height;
                      return updated;
                    });
                  }}
                  onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onResizeEnd", target, isDrag);
                  }}
                  onRotate={({ beforeRotate }) => {
                    setElements((prev) => {
                      const updated = [...prev];
                      updated[index].rotation = beforeRotate;  // Update rotation
                      return updated;
                    });
                  }}
                  onDrag={({ target, left, top }) => {
                    setElements((prev) => {
                      const updated = [...prev];
                      updated[index].x = left;  // Update x position
                      updated[index].y = top;   // Update y position
                      return updated;
                    });
                  }}
                />
                
                ))}
                
              </div>

              <div className="flex justify-center items-center gap-4 mt-[36px]">
                <button className="">
                  <Back11 className="border p-2 rounded-full  border-[#010792] w-10 h-10 text-[#010792] hover:bg-[#010792] hover:text-white duration-200" />
                </button>
                <button className="">
                  <Duplicate1 className="border p-2 rounded-full  border-[#010792] w-10 h-10 text-[#010792] hover:bg-[#010792] hover:text-white duration-200" />
                </button>
                <button>
                  <Clener1 className="border p-2 rounded-full  border-[#010792] w-10 h-10 text-[#010792] hover:bg-[#010792] hover:text-white duration-200" />
                </button>
                <button>
                  <Lock1 className="border p-2 rounded-full  border-[#010792] w-10 h-10 text-[#010792] hover:bg-[#010792] hover:text-white duration-200" />
                </button>
                <button>
                  <Reboot className="border p-2 rounded-full  border-[#010792] w-10 h-10 text-[#010792] hover:bg-[#010792] hover:text-white duration-200" />
                </button>
              </div>
            </div>

            {/* RightSwitchCreatorSide-------------- */}
            <div className="col-span-5 p-6">
              <RightSwitchCreatorSide />
            </div>
          </div>

          {/* Fixed seciton -------------------*/}
          <div>
            {/* Pitch */}
            {active === "one" && toggle && (
              <div
                ref={dropdownRef}
                className={`${
                  active ? "block" : "hidden"
                } bg-[#E6E6F4] w-40   absolute z-[999] top-0 -left-20 shadow-lg rounded-[16px] `}
              >
                <div className="p-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-4 mb-6">
                      <img
                        src={Ellipse1}
                        className="w-8 bg-white rounded-full dot dot-white"
                        alt=""
                        onClick={() => handleDotClick("#F4F4F4")}
                      />
                      <img
                        src={Ellipse2}
                        className="w-8 dot dot-teal rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#3A6161")}
                      />
                      <img
                        src={Ellipse3}
                        className="w-8 dot dot-green rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#3EA371")}
                      />
                      <img
                        src={Ellipse4}
                        className="w-8 dot dot-striped rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#F0DED8")}
                      />
                      <img
                        src={Ellipse5}
                        className="w-8 bg-white dot dot-white-solid rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#72BE4E")}
                      />
                      <img
                        src={Ellipse6}
                        className="w-8 bg-white/50 dot dot-peach rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#E6E6E6")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <button className="field" draggable={true} onDragStart={(e) => handleDragStart(e, `
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={\`w-16 h-16 ${svgBackgroundColor}\`}
                        viewBox="0 0 86 123"
                        fill="none"
                        style={{
                          width: 100%;
                          height: 100%;
                        }}
                      >
                        <g clipPath="url(#clip0_30031_8498)">
                          <mask id="path-1-inside-1_30031_8498" fill="white">
                            <path d="M85.9319 0.960934L85.9319 122.058C85.9319 122.308 85.8327 122.548 85.6561 122.724C85.4795 122.901 85.24 123 84.9902 123L1.00808 123C0.489199 123 0.0664062 122.577 0.0664062 122.058L0.0664009 0.960938C0.0664009 0.442032 0.489194 0.0192184 1.00808 0.0192184L84.9902 0.0192147C85.5091 0.0192147 85.9319 0.442028 85.9319 0.960934ZM84.0293 121.097L84.0293 1.90265L1.94975 1.90266L1.94976 121.097L84.0293 121.097Z" />
                          </mask>
                          <path
                            d="M85.9319 0.960934L85.9319 122.058C85.9319 122.308 85.8327 122.548 85.6561 122.724C85.4795 122.901 85.24 123 84.9902 123L1.00808 123C0.489199 123 0.0664062 122.577 0.0664062 122.058L0.0664009 0.960938C0.0664009 0.442032 0.489194 0.0192184 1.00808 0.0192184L84.9902 0.0192147C85.5091 0.0192147 85.9319 0.442028 85.9319 0.960934ZM84.0293 121.097L84.0293 1.90265L1.94975 1.90266L1.94976 121.097L84.0293 121.097Z"
                            fill="${svgBackgroundColor}"
                          />
                          <path
                            d="M84.9902 123L84.9902 128L84.9902 123ZM84.0293 121.097L84.0293 126.097L89.0293 126.097L89.0293 121.097L84.0293 121.097ZM84.0293 1.90265L89.0293 1.90265L89.0293 -3.09735L84.0293 -3.09735L84.0293 1.90265ZM1.94975 1.90266L1.94975 -3.09734L-3.05025 -3.09734L-3.05025 1.90266L1.94975 1.90266ZM1.94976 121.097L-3.05024 121.097L-3.05024 126.097L1.94976 126.097L1.94976 121.097ZM80.9319 0.960934L80.9319 122.058L90.9319 122.058L90.9319 0.960934L80.9319 0.960934ZM80.9319 122.058C80.9319 120.982 81.3594 119.95 82.1205 119.189L89.1917 126.26C90.306 125.145 90.9319 123.634 90.9319 122.058L80.9319 122.058ZM82.1205 119.189C82.8816 118.428 83.9138 118 84.9902 118L84.9902 128C86.5661 128 88.0774 127.374 89.1917 126.26L82.1205 119.189ZM84.9902 118L1.00808 118L1.00808 128L84.9902 128L84.9902 118ZM1.00808 118C3.25084 118 5.06641 119.816 5.06641 122.058L-4.93359 122.058C-4.93359 125.338 -2.27244 128 1.00808 128L1.00808 118ZM5.06641 122.058L5.0664 0.960937L-4.9336 0.960938L-4.93359 122.058L5.06641 122.058ZM5.0664 0.960937C5.0664 3.20322 3.25086 5.01922 1.00808 5.01922L1.00808 -4.98078C-2.27247 -4.98078 -4.9336 -2.31915 -4.9336 0.960938L5.0664 0.960937ZM1.00808 5.01922L84.9902 5.01921L84.9902 -4.98079L1.00808 -4.98078L1.00808 5.01922ZM84.9902 5.01921C82.7475 5.01921 80.9319 3.20324 80.9319 0.960934L90.9319 0.960934C90.9319 -2.31918 88.2707 -4.98079 84.9902 -4.98079L84.9902 5.01921ZM89.0293 121.097L89.0293 1.90265L79.0293 1.90265L79.0293 121.097L89.0293 121.097ZM84.0293 -3.09735L1.94975 -3.09734L1.94975 6.90266L84.0293 6.90265L84.0293 -3.09735ZM-3.05025 1.90266L-3.05024 121.097L6.94976 121.097L6.94975 1.90266L-3.05025 1.90266ZM1.94976 126.097L84.0293 126.097L84.0293 116.097L1.94976 116.097L1.94976 126.097Z"
                            fill="${svgBackgroundColor}"
                            mask="url(#path-1-inside-1_30031_8498)"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_30031_8498">
                            <rect
                              width="123"
                              height="86"
                              fill="white"
                              transform="translate(0 123) rotate(-90)"
                            />
                          </clipPath>
                        </defs>
                      </svg>`)}>
                      <Frame11 fillColor={svgBackgroundColor} />
                    </button>
                    <button className="field" draggable={true}>
                      <Frame12 fillColor={svgBackgroundColor} />
                    </button>
                    <button className="field" draggable={true}>
                      <Frame13 fillColor={svgBackgroundColor} />
                    </button>
                    <button className="field" draggable={true}>
                      <Frame14 fillColor={svgBackgroundColor} />
                    </button>
                    <button >
                      <Frame15 fillColor={svgBackgroundColor} />
                    </button>
                    <button className="field" draggable={true}>
                      <Frame16 fillColor={svgBackgroundColor} />
                    </button>
                    <button className="field" draggable={true}>
                      <Frame17 fillColor={svgBackgroundColor} />
                    </button>
                    <button className="field" draggable={true}>
                      <Frame18 fillColor={svgBackgroundColor} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Quick Access Dropdown */}
            {active === "two" && toggle && (
              <div
                ref={dropdownRef}
                className={`${
                  active ? "block" : "hidden"
                } bg-[#E6E6F4] w-40 h-full absolute z-[999] top-0 -left-20 shadow-lg rounded-[16px]`}
              >
                <div className="p-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-4 mb-6">
                      <img
                        src={Ellipse7}
                        className="w-8 bg-[#D4DA65] rounded-full dot dot-white"
                        alt=""
                        onClick={() => handleDotClick("#D4DA65")}
                      />
                      <img
                        src={Ellipse9}
                        className="w-8 dot dot-teal rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#22274A")}
                      />
                      <img
                        src={Ellipse11}
                        className="w-8 dot dot-green rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#165349")}
                      />
                      <img
                        src={Ellipse8}
                        className="w-8 dot dot-striped rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#111425")}
                      />
                      <img
                        src={Ellipse10}
                        className="w-8 bg-white dot dot-white-solid rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#A093C2")}
                      />
                      <img
                        src={Ellipse12}
                        className="w-8 bg-white/50 dot dot-peach rounded-full"
                        alt=""
                        onClick={() => handleDotClick("#DC052D")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-8">
                    <button
                      className="quick_access flex flex-col h-[90px] justify-center items-center py-2 text-lg rounded-[16px] w-[140px] bg-white text-[#010792] field"
                      draggable={true}
                    >
                      <Player className="w-10" fillColor={svgBackgroundColor} />
                      <h2>Player</h2>
                    </button>
                    <button
                      className="quick_access flex flex-col h-[90px] justify-center items-center py-2 text-lg rounded-[16px] w-[140px] bg-white text-[#010792] field"
                      draggable={true}
                    >
                      <Dummy className="w-8" fillColor={svgBackgroundColor} />
                      <h2>Dummy</h2>
                    </button>
                    <button
                      className="quick_access flex flex-col h-[90px] justify-center items-center py-2 text-lg rounded-[16px] w-[140px] bg-white text-[#010792] field"
                      draggable={true}
                    >
                      <Ladder className="w-20" fillColor={svgBackgroundColor} />
                      <h2>Ladder</h2>
                    </button>
                    <button
                      className="quick_access flex flex-col h-[90px] justify-center items-center py-2 text-lg rounded-[16px] w-[140px] bg-white text-[#010792] field"
                      draggable={true}
                    >
                      <Cone className="w-10" fillColor={svgBackgroundColor} />
                      <h2>Cone</h2>
                    </button>
                    <button
                      className="quick_access flex flex-col h-[90px] justify-center items-center py-2 text-lg rounded-[16px] w-[140px] bg-white text-[#010792] field"
                      draggable={true}
                    >
                      <Football
                        className="w-8"
                        fillColor={svgBackgroundColor}
                      />
                      <h2>Football</h2>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Playes */}
            {active === "three" && (
              <div
                ref={dropdownRef}
                className={`${
                  active ? "block" : "hidden"
                } bg-[#E6E6F4] w-40 h-full  absolute z-[999] top-0 -left-20 shadow-lg rounded-[16px] `}
              >
                C
              </div>
            )}
            {/* Lines */}
            {active === "four" && (
              <div
                ref={dropdownRef}
                className={`${
                  active ? "block" : "hidden"
                } bg-[#E6E6F4] w-40 h-full  absolute z-[999] top-0 -left-20 shadow-lg rounded-[16px] `}
              >
                C
              </div>
            )}
            {/* Equipment */}
            {active === "five" && (
              <div
                ref={dropdownRef}
                className={`${
                  active ? "block" : "hidden"
                } bg-[#E6E6F4] w-40 h-full  absolute z-[999] top-0 -left-20 shadow-lg rounded-[16px] `}
              >
                C
              </div>
            )}
            {/* text & NR */}
            {active === "six" && (
              <div
                ref={dropdownRef}
                className={`${
                  active ? "block" : "hidden"
                } bg-[#E6E6F4] w-40 h-full  absolute z-[999] top-0 -left-20 shadow-lg rounded-[16px] `}
              >
                C
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorToolAuth;