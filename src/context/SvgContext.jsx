// src/context/SvgContext.jsx
import { createContext, useContext, useState } from "react";

// Create a React Context for SVG-related states
const SvgContext = createContext();

// SvgProvider component to wrap the application and provide SVG context
export const SvgProvider = ({ children }) => {
  // State to hold the currently selected SVG object
  // It will include component, id, bgColor, and lineColor
  const [selectedSvg, setSelectedSvg] = useState(null);

  // State for the SVG background color, initialized to green as per requirement
  const [svgBgColor, setSvgBgColor] = useState("#00A859"); // Default: Green Background

  // State for the SVG line color, initialized to white as per requirement
  const [svgLineColor, setSvgLineColor] = useState("#FFFFFF"); // Default: White Line

  return (
    // Provide the context values to its children
    <SvgContext.Provider
      value={{
        selectedSvg,
        setSelectedSvg,
        svgBgColor,
        setSvgBgColor,
        svgLineColor, // Expose svgLineColor through context
        setSvgLineColor, // Expose setSvgLineColor through context
      }}
    >
      {children}
    </SvgContext.Provider>
  );
};

// Custom hook to easily consume the SvgContext in functional components
export const useSvg = () => useContext(SvgContext);