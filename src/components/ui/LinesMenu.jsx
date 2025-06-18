// src/components/ui/LinesMenu.jsx
import { ReactSVG } from "react-svg";
import ColorPicker from "./ColorPicker";
import { useSvg } from "../../context/SvgContext";

// Assuming line SVGs are in this path
import Fieldmarker from "../../assets/Lines/Fieldmarker.svg";
import FieldmarkerDotted from "../../assets/Lines/Fieldmarkerdotted.svg";
import FieldmarkerCurved from "../../assets/Lines/Fieldmarkercurved.svg";
import Passing from "../../assets/Lines/Passingorfinishing.svg";
import Run from "../../assets/Lines/Run.svg";
import Dribbling from "../../assets/Lines/Dribbling.svg";
import DribblingCurved from "../../assets/Lines/Dribbling2.svg";
import Square from "../../assets/Lines/Square.svg";
import Circle from "../../assets/Lines/Circle.svg";
import Triangle from "../../assets/Lines/Triangle.svg";

const LinesMenu = ({ colors, activeColorIndex, onColorSelect, onLineAdd }) => {
  const { lineColor } = useSvg();

  const lineItems = [
    { id: 1, name: "Fieldmarker", svg: Fieldmarker, type: 'line' },
    { id: 2, name: "Fieldmarker dotted", svg: FieldmarkerDotted, type: 'line' },
    { id: 3, name: "Fieldmarker curved", svg: FieldmarkerCurved, type: 'line' },
    { id: 4, name: "Passing or finishing", svg: Passing, type: 'line' },
    { id: 5, name: "Run", svg: Run, type: 'line' },
    { id: 6, name: "Dribbling", svg: Dribbling, type: 'line' },
    { id: 7, name: "Dribbling Curved", svg: DribblingCurved, type: 'line' },
    { id: 8, name: "Square", svg: Square, type: 'square' },
    { id: 9, name: "Circle", svg: Circle, type: 'circle' },
    { id: 10, name: "Triangle", svg: Triangle, type: 'triangle' },
  ];

  const beforeInjection = (svg) => {
    const elements = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((el) => {
      el.setAttribute("stroke", lineColor);
    });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Lines</h3>
      <ColorPicker
        colors={colors}
        activeIndex={activeColorIndex}
        onSelect={onColorSelect}
      />
      <div className="flex flex-col items-center gap-2">
        {lineItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1 w-full p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
            onClick={() => onLineAdd(item)}
            title={item.name}
          >
            <ReactSVG
              src={item.svg}
              beforeInjection={beforeInjection}
              className="w-full h-auto line-menu-icon"
            />
            <span className="text-sm text-center w-full">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinesMenu;