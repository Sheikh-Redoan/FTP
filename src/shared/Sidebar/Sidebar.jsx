import { useState, useMemo, useCallback } from "react";
import { useSvg } from "../../context/SvgContext";
import MenuButton from "../../components/ui/MenuButton";
import PitchMenu from "../../components/ui/PitchMenu";
import EquipmentMenu from "../../components/ui/EquipmentMenu";
import ShapeMenu from "../../components/ui/ShapeMenu";
import IdeaBox from "../../components/ui/IdeaBox";
import { GiSoccerField, IoFootballOutline, LuShapes, TiArrowMoveOutline, IoClose } from "../../components/icons";

const Sidebar = () => {
  const {
    setSelectedSvg,
    svgBgColor, setSvgBgColor,
    setSvgLineColor,
    setEquipmentBgColor,
    setEquipmentLineColor,
    setDraggedEquipmentSrc,
  } = useSvg();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activePitchColorIndex, setActivePitchColorIndex] = useState(0);
  const [activeEquipmentColorIndex, setActiveEquipmentColorIndex] = useState(0);

  const pitchColorCombinations = useMemo(() => [
      { bg: "#00A859", line: "#FFFFFF" },
      { bg: "#FFFFFF", line: "#0055A4" },
      { bg: "#FFFFFF", line: "#000000" },
      { bg: "#0055A4", line: "#FF0000" },
    ], []);

  const equipmentColorCombinations = useMemo(() => [
      { bg: "#D4DA65", line: "#D4DA65" },
      { bg: "#22274A", line: "#22274A" },
      { bg: "#DC052D", line: "#DC052D" },
      { bg: "#6CABDD", line: "#6CABDD" },
      { bg: "#FDE100", line: "#FDE100" },
    ], []);

  const handleMenuClick = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  const handlePitchSelect = (svg) => {
    setSelectedSvg({ component: svg.component, id: svg.id });
  };

  const handlePitchColorSelect = (index) => {
    setActivePitchColorIndex(index);
    const { bg, line } = pitchColorCombinations[index];
    setSvgBgColor(bg);
    setSvgLineColor(line);
  };

  const handleEquipmentColorSelect = (index) => {
    setActiveEquipmentColorIndex(index);
    const { bg, line } = equipmentColorCombinations[index];
    setEquipmentBgColor(bg);
    setEquipmentLineColor(line);
  };

  const handleDragStart = useCallback((src, modifiedSvgContent) => {
    setDraggedEquipmentSrc({
      src: src,
      content: modifiedSvgContent,
    });
  }, [setDraggedEquipmentSrc]);

  const menuItems = [
    { name: "pitch", icon: GiSoccerField, label: "Pitch" },
    { name: "equipment", icon: IoFootballOutline, label: "Equipment" },
    { name: "shape", icon: LuShapes, label: "Shape" },
    { name: "move", icon: TiArrowMoveOutline, label: "Move" },
  ];

  return (
    <div className="h-screen w-max p-14 relative">
      <div className="flex flex-col gap-5">
        {menuItems.map((item) => (
          <MenuButton
            key={item.name}
            icon={item.icon}
            label={item.label}
            onClick={() => handleMenuClick(item.name)}
          />
        ))}
        <IdeaBox />
      </div>

      {activeMenu && (
        <div className="absolute top-0 right-[-260px] w-[250px] h-full bg-[#E6E6F4] rounded-lg shadow-lg p-3 overflow-y-auto z-50">
          <button onClick={() => setActiveMenu(null)} className="absolute top-2 right-2 text-black">
            <IoClose className="text-xl" />
          </button>

          {activeMenu === "pitch" && (
            <PitchMenu
              colors={pitchColorCombinations}
              activeColorIndex={activePitchColorIndex}
              onColorSelect={handlePitchColorSelect}
              onPitchSelect={handlePitchSelect}
              svgBgColor={svgBgColor}
            />
          )}

          {activeMenu === "equipment" && (
            <EquipmentMenu
              colors={equipmentColorCombinations}
              activeColorIndex={activeEquipmentColorIndex}
              onColorSelect={handleEquipmentColorSelect}
              onDragStart={handleDragStart}
            />
          )}

          {activeMenu === "shape" && (
            <ShapeMenu
               colors={equipmentColorCombinations}
               activeColorIndex={activeEquipmentColorIndex}
               onColorSelect={handleEquipmentColorSelect}
               onDragStart={handleDragStart}
            />
          )}

          {activeMenu === "move" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Move Tools</h3>
              <p>Movement controls will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;