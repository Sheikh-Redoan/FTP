// src/pages/Home/Home.jsx
import { useSvg } from "../../context/SvgContext";

const Home = () => {
  const { selectedSvg, svgBgColor } = useSvg();

  const getColorBrightness = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 / 255;
  };

  const isDarkColor = getColorBrightness(svgBgColor) < 0.5;

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      {selectedSvg ? (
        <div
          className="p-[10px] rounded-lg"
          style={{ backgroundColor: svgBgColor }}
        >
          <img
            src={selectedSvg.component}
            alt={`Selected Field ${selectedSvg.id}`}
            style={{
              filter: isDarkColor ? "invert(1)" : "invert(0)",
              opacity: isDarkColor ? 0.9 : 0.8,
              width: "550px",
              height: "auto",
              strokewidth: "1",
            }}
          />
          
        </div>
      ) : (
        <h1 className="text-3xl font-bold text-red-600 underline">
          Select an SVG from the sidebar
        </h1>
      )}
    </div>
  );
};

export default Home;
