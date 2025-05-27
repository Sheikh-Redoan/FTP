import { createContext, useContext, useState } from 'react';

const SvgContext = createContext();

export const SvgProvider = ({ children }) => {
  const [selectedSvg, setSelectedSvg] = useState(null);
  const [svgBgColor, setSvgBgColor] = useState('#000000');

  return (
    <SvgContext.Provider value={{ 
      selectedSvg, 
      setSelectedSvg, 
      svgBgColor, 
      setSvgBgColor 
    }}>
      {children}
    </SvgContext.Provider>
  );
};

export const useSvg = () => useContext(SvgContext);