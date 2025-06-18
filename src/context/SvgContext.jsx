// src/context/SvgContext.jsx
import { createContext, useContext, useState } from "react";

const SvgContext = createContext();

export const SvgProvider = ({ children }) => {
  const [selectedSvg, setSelectedSvg] = useState(null);
  const [svgBgColor, setSvgBgColor] = useState("#00A859");
  const [svgLineColor, setSvgLineColor] = useState("#FFFFFF");
  const [selectedEquipmentSvg, setSelectedEquipmentSvg] = useState(null);
  const [equipmentBgColor, setEquipmentBgColor] = useState("#D4DA65");
  const [equipmentLineColor, setEquipmentLineColor] = useState("#D4DA65");
  const [playerColor, setPlayerColor] = useState("#FDE100");
  const [draggedEquipmentSrc, setDraggedEquipmentSrc] = useState(null);
  const [pitch, setPitch] = useState(null);
  const [lineColor, setLineColor] = useState("#FDE100");

  // ADDED: State to hold the function that adds equipment to the stage
  const [addEquipment, setAddEquipment] = useState(() => () => {
    console.error("addEquipment function not yet implemented");
  });

  return (
    <SvgContext.Provider
      value={{
        selectedSvg,
        setSelectedSvg,
        svgBgColor,
        setSvgBgColor,
        svgLineColor,
        setSvgLineColor,
        selectedEquipmentSvg,
        setSelectedEquipmentSvg,
        equipmentBgColor,
        setEquipmentBgColor,
        equipmentLineColor,
        setEquipmentLineColor,
        playerColor,
        setPlayerColor,
        draggedEquipmentSrc,
        setDraggedEquipmentSrc,
        pitch,
        setPitch,
        lineColor,
        setLineColor,
        // ADDED: Expose addEquipment function and its setter
        addEquipment,
        setAddEquipment,
      }}
    >
      {children}
    </SvgContext.Provider>
  );
};

export const useSvg = () => useContext(SvgContext);