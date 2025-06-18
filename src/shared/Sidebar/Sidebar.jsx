import { useState, useMemo, useCallback } from "react";
import { useSvg } from "../../context/SvgContext";
import MenuButton from "../../components/ui/MenuButton";
import PitchMenu from "../../components/ui/PitchMenu";
import EquipmentMenu from "../../components/ui/EquipmentMenu";
import IdeaBox from "../../components/ui/IdeaBox";
import {
  GiSoccerField,
  IoFootballOutline,
  IoClose,
  RiVipLine,
  IoPeopleOutline,
  BsGraphUp,
  LuType,
} from "../../components/icons";
import { getModifiedSvgString, createSvgDataUrl } from "../../utils/svgUtils";
import QuickAccessMenu from "../../components/ui/QuickAccessMenu";
import PlayersMenu from "../../components/ui/PlayersMenu";
import LinesMenu from "../../components/ui/LinesMenu";
import TextNrMenu from "../../components/ui/TextNrMenu";
import QuickAccessIcon from "../../assets/SidebarIcons/Quick Access.svg";
import EquipmentIcon from "../../assets/SidebarIcons/Equipment.svg";
import PlayersIcon from "../../assets/SidebarIcons/Players.svg";
import LinesIcon from "../../assets/SidebarIcons/Lines.svg";
import TextNrIcon from "../../assets/SidebarIcons/Text&Nr.svg";

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
    setDraggedEquipmentSrc,
    setPitch, // Get setPitch from context
  } = useSvg();

  const [activeMenu, setActiveMenu] = useState(null);
  const [activePitchColorIndex, setActivePitchColorIndex] = useState(0);
  const [activeEquipmentColorIndex, setActiveEquipmentColorIndex] =
    useState(0);

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

  const handleMenuClick = (menu) =>
    setActiveMenu(activeMenu === menu ? null : menu);

  const handlePitchSelect = async (svg) => {
    setSelectedSvg({ component: svg.component, id: svg.id });

    // New logic for Konva
    const modifiedSvgString = await getModifiedSvgString(
      svg.component,
      svgBgColor,
      svgLineColor
    );
    const dataUrl = createSvgDataUrl(modifiedSvgString);
    setPitch({
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
      setPitch({
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

  const handleDragStart = useCallback(
    (src, modifiedSvgContent) => {
      setDraggedEquipmentSrc({
        src: src,
        content: modifiedSvgContent,
      });
    },
    [setDraggedEquipmentSrc]
  );

  const menuItems = [
    { name: "pitch", icon: GiSoccerField, label: "Pitch" },
    { name: "quickAccess", icon: RiVipLine, label: "Quick Access" },
    { name: "players", icon: IoPeopleOutline, label: "Players" },
    { name: "lines", icon: BsGraphUp, label: "Lines" },
    { name: "equipment", icon: IoFootballOutline, label: "Equipment" },
    { name: "textNr", icon: LuType, label: "Text & Nr." },
  ];

  const renderMenu = () => {
    switch (activeMenu) {
      case "pitch":
        return (
          <PitchMenu
            colors={pitchColorCombinations}
            activeColorIndex={activePitchColorIndex}
            onColorSelect={handlePitchColorSelect}
            onPitchSelect={handlePitchSelect}
            svgBgColor={svgBgColor}
          />
        );
      case "quickAccess":
        return <QuickAccessMenu onDragStart={handleDragStart} />;
      case "players":
        return (
          <PlayersMenu
            colors={equipmentColorCombinations}
            activeColorIndex={activeEquipmentColorIndex}
            onColorSelect={handleEquipmentColorSelect}
            onDragStart={handleDragStart}
          />
        );
      case "lines":
        return (
          <LinesMenu
            colors={equipmentColorCombinations}
            activeColorIndex={activeEquipmentColorIndex}
            onColorSelect={handleEquipmentColorSelect}
            onDragStart={handleDragStart}
          />
        );
      case "equipment":
        return (
          <EquipmentMenu
            colors={equipmentColorCombinations}
            activeColorIndex={activeEquipmentColorIndex}
            onColorSelect={handleEquipmentColorSelect}
            onDragStart={handleDragStart}
          />
        );
      case "textNr":
        return (
          <TextNrMenu
            colors={equipmentColorCombinations}
            activeColorIndex={activeEquipmentColorIndex}
            onColorSelect={handleEquipmentColorSelect}
            onDragStart={handleDragStart}
          />
        );
      default:
        return null;
    }
  };

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