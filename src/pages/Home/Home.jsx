// src/pages/Home/Home.jsx
import { useSvg } from "../../context/SvgContext";
import { ReactSVG } from "react-svg"; // Import ReactSVG for dynamic SVG rendering

const Home = () => {
  // Destructure selectedSvg, svgBgColor, and svgLineColor from the SvgContext
  const { selectedSvg, svgBgColor, svgLineColor } = useSvg();

  // Helper function to determine the brightness of a hexadecimal color
  const getColorBrightness = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 / 255;
  };

  // Check if the current background color is dark
  const isDarkColor = getColorBrightness(svgBgColor) < 0.5;

  // Function to modify SVG DOM before injection in the Home component
  // This ensures the SVG line colors are correctly applied when displayed.
  const beforeInjection = (svg) => {
    // Select all common SVG shape elements that typically have strokes
    const elements = svg.querySelectorAll('path, line, polyline, polygon, rect, circle');

    elements.forEach(element => {
      // Apply the svgLineColor from context to the 'stroke' attribute of each element
      element.setAttribute('stroke', svgLineColor);
      // You might also want to set a default fill or handle fills based on requirements
      // For instance, if you want to ensure no fill, you could do:
      // if (!element.hasAttribute('fill')) {
      //   element.setAttribute('fill', 'none');
      // }
    });
  };

  return (
    <div className="w-full h-[90vh] flex justify-center items-center bg-[#fffff0}">
      {selectedSvg ? (
        <div
          className="p-[10px] rounded-lg shadow-lg"
          style={{ backgroundColor: svgBgColor }} // Apply the selected background color
        >
          <ReactSVG
            src={selectedSvg.component} // Use the component from selectedSvg
            beforeInjection={beforeInjection} // Apply the beforeInjection function to modify SVG lines
            wrapper="div"
            className="w-full h-auto" // Ensure the SVG scales within its container
            style={{
              width: "auto", // Fixed width for the displayed SVG
              height: "auto", // Maintain aspect ratio
              // strokeWidth is an SVG attribute, not a CSS style.
              // It should be handled inside beforeInjection if you want to change it dynamically per element.
              // The beforeInjection function already sets the stroke color.
            }}
          />
        </div>
      ) : (
        // Message displayed when no SVG is selected
        <h1 className="text-3xl font-bold text-red-600 underline">
          Select an SVG from the sidebar
        </h1>
      )}
    </div>
  );
};

export default Home;