// src/shared/Sidebar/Sidebar.jsx
import { useState, useMemo, useCallback } from "react";
import { useSvg } from "../../context/SvgContext";
import MenuButton from "../../components/ui/MenuButton";
import PitchMenu from "../../components/ui/PitchMenu";
import EquipmentMenu from "../../components/ui/EquipmentMenu";
import { IoClose } from "../../components/icons";
import {
  getModifiedSvgString,
  createSvgDataUrl,
  getColoredSvgString,
  getSvgDimensions,
} from "../../utils/svgUtils";
import QuickAccessMenu from "../../components/ui/QuickAccessMenu";
import PlayersMenu from "../../components/ui/PlayersMenu";
import LinesMenu from "../../components/ui/LinesMenu";
import { ReactSVG } from "react-svg";
import MobileFooter from "./MobileFooter";
import MobileMenu from "./MobileMenu";
import { useWindowSize } from "../../hooks/useWindowSize";

// Importing the SVG icons for the menu buttons
import Pitch from "../../assets/SidebarIcons/Pitch.svg";
import QuickAccessIcon from "../../assets/SidebarIcons/Quick Access.svg";
import EquipmentIcon from "../../assets/SidebarIcons/Equipment.svg";
import PlayersIcon from "../../assets/SidebarIcons/Players.svg";
import LinesIcon from "../../assets/SidebarIcons/Lines.svg";
import TextNrIcon from "../../assets/SidebarIcons/Text&Nr.svg";
// Assuming you have a ShapeIcon, if not, you can reuse another one like EquipmentIcon

const SvgIcon = ({ src, className }) => (
  <ReactSVG src={src} className={className} wrapper="div" />
);

const Sidebar = () => {
  const {
    selectedSvg,
    setSelectedSvg,
    svgBgColor,
    setSvgBgColor,
    svgLineColor,
    setSvgLineColor,
    setEquipmentBgColor,
    setEquipmentLineColor,
    setPlayerColor,
    setDraggedEquipmentSrc,
    setDrillPitch,
    setLineColor,
    lineColor,
    addEquipment,
    addQuickAccessItem,
  } = useSvg();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activePitchColorIndex, setActivePitchColorIndex] = useState(0);
  const [activeEquipmentColorIndex, setActiveEquipmentColorIndex] = useState(0);
  const [activePlayerColorIndex, setActivePlayerColorIndex] = useState(0);
  const [activeLineColorIndex, setActiveLineColorIndex] = useState(0);
  const [activeShapeColorIndex, setActiveShapeColorIndex] = useState(0);

  const { width } = useWindowSize();
  const isMobile = width < 800;

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
      { bg: "#DC052D", line: "#DC052D" },
      { bg: "#6CABDD", line: "#6CABDD" },
      { bg: "#FDE100", line: "#FDE100" },
    ],
    []
  );

  const lineColorCombinations = useMemo(
    () => [
      { bg: "#FDE100", line: "#FDE100" },
      { bg: "#F4F4F4", line: "#F4F4F4" },
      { bg: "#DC052D", line: "#DC052D" },
      { bg: "#6B7280", line: "#6B7280" },
      { bg: "#444444", line: "#444444" },
      { bg: "#22274A", line: "#22274A" },
    ],
    []
  );

  const playerColorCombinations = useMemo(
    () => [
      { bg: "#FDE100", line: "#000000" },
      { bg: "#DC052D", line: "#FFFFFF" },
      { bg: "#D4DA65", line: "#000000" },
      { bg: "#A093C2", line: "#FFFFFF" },
      { bg: "#6CABDD", line: "#FFFFFF" },
      { bg: "#22274A", line: "#FFFFFF" },
      { bg: "#1D9053", line: "#FFFFFF" },
      { bg: "#165349", line: "#FFFFFF" },
      { bg: "#111425", line: "#FFFFFF" },
    ],
    []
  );

  const handleMenuClick = (menu) => {
    if (menu === "textNr") {
      const { bg } = equipmentColorCombinations[activeEquipmentColorIndex];
      const newTextProps = {
        type: "text",
        text: "Double click to edit",
        fontSize: 20,
        fill: bg,
        width: 200,
        height: 25,
        padding: 5,
        align: "left",
        fontFamily: "sans-serif",
        lineHeight: 1.2,
      };
      addEquipment(newTextProps, "text");
      setActiveMenu(null);
    } else {
      setActiveMenu(activeMenu === menu ? null : menu);
    }
  };

  const handlePitchSelect = async (svg) => {
    setSelectedSvg({ component: svg.component, id: svg.id });
    const modifiedSvgString = await getModifiedSvgString(
      svg.component,
      svgBgColor,
      svgLineColor
    );
    const dataUrl = createSvgDataUrl(modifiedSvgString);
    setDrillPitch({
      id: `pitch-${svg.id}`,
      dataUrl,
      x: 0,
      y: 0,
    });
  };

  const handlePitchColorSelect = async (index) => {
    setActivePitchColorIndex(index);
    const { bg, line } = pitchColorCombinations[index];
    setSvgBgColor(bg);
    setSvgLineColor(line);
    if (selectedSvg) {
      const modifiedSvgString = await getModifiedSvgString(
        selectedSvg.component,
        bg,
        line
      );
      const dataUrl = createSvgDataUrl(modifiedSvgString);
      setDrillPitch({
        id: `pitch-${selectedSvg.id}`,
        dataUrl,
        x: 0,
        y: 0,
      });
    }
  };

  const handleEquipmentColorSelect = (index) => {
    setActiveEquipmentColorIndex(index);
    const { bg, line } = equipmentColorCombinations[index];
    setEquipmentBgColor(bg);
    setEquipmentLineColor(line);
  };

  const handlePlayerColorSelect = (index) => {
    setActivePlayerColorIndex(index);
    const { bg } = playerColorCombinations[index];
    setPlayerColor(bg);
  };

  const handleLineColorSelect = (index) => {
    setActiveLineColorIndex(index);
    const { line } = lineColorCombinations[index];
    setLineColor(line);
  };

  const handleShapeColorSelect = (index) => {
    setActiveShapeColorIndex(index);
    const { bg, line } = equipmentColorCombinations[index];
    setEquipmentBgColor(bg);
    setEquipmentLineColor(line);
  };

  const handleDragStartAndAddToQuickAccess = useCallback(
    (dragData) => {
      setDraggedEquipmentSrc(dragData);
      addQuickAccessItem(dragData);
    },
    [setDraggedEquipmentSrc, addQuickAccessItem]
  );

  const handleQuickAccessDragStart = useCallback(
    (dragData) => {
      setDraggedEquipmentSrc(dragData);
    },
    [setDraggedEquipmentSrc]
  );

  const handleItemClick = (item) => {
    if (!isMobile) return;
    if (item.type === "player") {
      addEquipment(item, "player");
    } else {
      const { width, height } = getSvgDimensions(item.content);
      addEquipment(item.content, item.type, { width, height });
    }
  };

  const handleAddLine = async (item) => {
    const coloredSvg = await getColoredSvgString(
      item.svg,
      "transparent",
      lineColor
    );
    const { width, height } = getSvgDimensions(coloredSvg);
    addEquipment(coloredSvg, item.type, { width, height });
    addQuickAccessItem({
      src: item.svg,
      name: item.name,
      type: item.type,
      content: coloredSvg,
    });
  };

  const menuItems = [
    { name: "pitch", icon: (props) => <SvgIcon src={Pitch} {...props} />, label: "Pitch" },
    { name: "quickAccess", icon: (props) => <SvgIcon src={QuickAccessIcon} {...props} />, label: "Quick Access" },
    { name: "players", icon: (props) => <SvgIcon src={PlayersIcon} {...props} />, label: "Players" },
    { name: "lines", icon: (props) => <SvgIcon src={LinesIcon} {...props} />, label: "Lines" },
    { name: "equipment", icon: (props) => <SvgIcon src={EquipmentIcon} {...props} />, label: "Equipment" },
    // Added "shapes" to the menu
   { name: "textNr", icon: (props) => <SvgIcon src={TextNrIcon} {...props} />, label: "Text & Nr." },
  ];

  const renderMenu = () => {
    switch (activeMenu) {
      case "pitch":
        return <PitchMenu colors={pitchColorCombinations} activeColorIndex={activePitchColorIndex} onColorSelect={handlePitchColorSelect} onPitchSelect={handlePitchSelect} svgBgColor={svgBgColor} isMobile={isMobile} />;
      case "quickAccess":
        return <QuickAccessMenu onDragStart={handleQuickAccessDragStart} onClick={handleItemClick} isMobile={isMobile} />;
      case "players":
        return <PlayersMenu colors={playerColorCombinations} activeColorIndex={activePlayerColorIndex} onColorSelect={handlePlayerColorSelect} onDragStart={handleDragStartAndAddToQuickAccess} onClick={handleItemClick} isMobile={isMobile} />;
      case "lines":
        return <LinesMenu colors={lineColorCombinations} activeColorIndex={activeLineColorIndex} onColorSelect={handleLineColorSelect} onLineAdd={handleAddLine} isMobile={isMobile} />;
      case "equipment":
        return <EquipmentMenu colors={equipmentColorCombinations} activeColorIndex={activeEquipmentColorIndex} onColorSelect={handleEquipmentColorSelect} onDragStart={handleDragStartAndAddToQuickAccess} onClick={handleItemClick} isMobile={isMobile} />;
      case "shapes":
        return <ShapeMenu colors={equipmentColorCombinations} activeColorIndex={activeShapeColorIndex} onColorSelect={handleShapeColorSelect} onDragStart={handleDragStartAndAddToQuickAccess} isMobile={isMobile} />;
      default:
        return null;
    }
  };

  if (isMobile) {
    return (
      <>
        <MobileFooter menuItems={menuItems} onMenuClick={handleMenuClick} />
        <MobileMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)}>
          {renderMenu()}
        </MobileMenu>
      </>
    );
  }

  return (
    <div className="h-full relative">
      <div className="h-full w-max p-14 overflow-y-auto">
        <div className="flex flex-col gap-5">
          {menuItems.map((item) => (
            <MenuButton
              key={item.name}
              icon={item.icon}
              label={item.label}
              onClick={() => handleMenuClick(item.name)}
            />
          ))}
        </div>
      </div>

      {activeMenu && (
        <div className="absolute top-0 left-full w-[180px] h-[90%] bg-[#E6E6F4] rounded-lg shadow-lg p-3 overflow-y-auto z-50">
          <button
            onClick={() => setActiveMenu(null)}
            className="absolute top-2 right-2 text-black"
          >
            <IoClose className="text-xl" />
          </button>
          {renderMenu()}
        </div>
      )}
    </div>
  );
};

export default Sidebar;