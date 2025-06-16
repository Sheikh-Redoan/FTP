import { ReactSVG } from "react-svg";
import ColorPicker from "./ColorPicker";
// Import pitch SVGs
import Frame from "../../assets/Fields/Frame.svg";
import Frame1 from "../../assets/Fields/Frame1.svg";
import Frame2 from "../../assets/Fields/Frame2.svg";
import Frame3 from "../../assets/Fields/Frame3.svg";
import Frame4 from "../../assets/Fields/Frame4.svg";
import Frame5 from "../../assets/Fields/Frame5.svg";
import Frame6 from "../../assets/Fields/Frame6.svg";
import Frame7 from "../../assets/Fields/Frame7.svg";
import Frame8 from "../../assets/Fields/Frame8.svg";

const PitchMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onPitchSelect,
  svgBgColor,
}) => {
  const pitchSvgComponents = [
    { id: 1, component: Frame },
    { id: 2, component: Frame1 },
    { id: 3, component: Frame2 },
    { id: 4, component: Frame3 },
    { id: 5, component: Frame4 },
    { id: 6, component: Frame5 },
    { id: 7, component: Frame6 },
    { id: 8, component: Frame7 },
    { id: 9, component: Frame8 },
  ];

  const beforePitchSvgInjection = (svg) => {
    const lineColor = colors[activeColorIndex].line;
    const elements = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((el) => el.setAttribute("stroke", lineColor));
  };

  return (
    <div className="p-2">
      <ColorPicker
        colors={colors}
        activeIndex={activeColorIndex}
        onSelect={onColorSelect}
      />
      <div className="grid grid-cols-2 gap-4">
        {pitchSvgComponents.map((svg) => (
          <div
            key={svg.id}
            className="flex justify-center items-center p-[2px] w-[100px] h-[100px] border rounded-lg hover:bg-gray-100 cursor-pointer svg_size"
            style={{ backgroundColor: svgBgColor }}
            onClick={() => onPitchSelect(svg)}
          >
            <ReactSVG
              src={svg.component}
              beforeInjection={beforePitchSvgInjection}
              wrapper="div"
              className="w-auto h-full svg_div"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitchMenu;
