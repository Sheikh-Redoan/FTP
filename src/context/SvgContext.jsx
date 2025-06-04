// src/context/SvgContext.jsx
import { createContext, useContext, useState } from "react";

// Create a React Context for SVG-related states
const SvgContext = createContext();

// SvgProvider component to wrap the application and provide SVG context
export const SvgProvider = ({ children }) => {
  // State to hold the currently selected SVG object (for pitch)
  // It will include component, id, bgColor, and lineColor
  const [selectedSvg, setSelectedSvg] = useState(null);

  // State for the SVG background color, initialized to green as per requirement
  const [svgBgColor, setSvgBgColor] = useState("#00A859"); // Default: Green Background

  // State for the SVG line color, initialized to white as per requirement
  const [svgLineColor, setSvgLineColor] = useState("#FFFFFF"); // Default: White Line

  // NEW: State for currently selected equipment SVG (for drag and drop)
  // This state might be less directly used now that we're passing content via draggedEquipmentSrc
  const [selectedEquipmentSvg, setSelectedEquipmentSvg] = useState(null);
  // NEW: State for equipment background color
  const [equipmentBgColor, setEquipmentBgColor] = useState("#D4DA65"); // Default equipment color
  // NEW: State for equipment line color
  const [equipmentLineColor, setEquipmentLineColor] = useState("#D4DA65"); // Default equipment line color

  // NEW: State to hold the SVG source being dragged (original src and modified content)
  const [draggedEquipmentSrc, setDraggedEquipmentSrc] = useState(null);

  return (
    // Provide the context values to its children
    <SvgContext.Provider
      value={{
        selectedSvg,
        setSelectedSvg,
        svgBgColor,
        setSvgBgColor,
        svgLineColor,
        setSvgLineColor,
        // NEW: Equipment context values
        selectedEquipmentSvg,
        setSelectedEquipmentSvg,
        equipmentBgColor,
        setEquipmentBgColor,
        equipmentLineColor,
        setEquipmentLineColor,
        draggedEquipmentSrc, // Expose the dragged SVG source and its content
        setDraggedEquipmentSrc, // Expose setter for dragged SVG source
      }}
    >
      {children}
    </SvgContext.Provider>
  );
};

// Custom hook to easily consume the SvgContext in functional components
export const useSvg = () => useContext(SvgContext);