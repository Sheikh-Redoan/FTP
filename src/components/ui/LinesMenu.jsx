// src/components/ui/LinesMenu.jsx

import { ReactSVG } from "react-svg";
import ColorPicker from "./ColorPicker";
import { useSvg } from "../../context/SvgContext";
import { getColoredSvgString, getSvgDimensions } from "../../utils/svgUtils";


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
  const { lineColor, addEquipment, addQuickAccessItem } = useSvg();

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

  const beforeInjection = (svg) => {
    const elements = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((el) => {
      el.setAttribute("stroke", lineColor);
    });
  };

  return (
    <div className="max-[800px]:flex">
      <h3 className="text-lg font-bold mb-4 max-[800px]:hidden">Lines</h3>
      <ColorPicker
        colors={colors}
        activeIndex={activeColorIndex}
        onSelect={onColorSelect}
        containerClassName ={"flex justify-center items-start gap-4 flex-wrap mb-8 max-[800px]:flex max-[800px]:flex-wrap max-[800px]:overflow-y-scroll max-[800px]:gap-3 max-[800px]:max-h-[100px] max-[800px]:py-[10px]"}
      />
      <div className="flex flex-col items-center gap-2 max-[800px]:flex-row max-[800px]:overflow-x-scroll">
        {lineItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-1 w-full p-2 border rounded-lg hover:bg-gray-100 cursor-pointer max-[800px]:!w-[100px] max-[800px]:!h-[100px] max-[800px]:justify-evenly  max-[800px]:items-center max-[800px]:gap-3 max-[800px]:pt-1 max-[800px]:pb-1 max-[800px]:box-border"
            onClick={() => handleAddLine(item)}
            title={item.name}
          >
            <ReactSVG
              src={item.svg}
              beforeInjection={beforeInjection}
              className="w-full h-auto line-menu-icon max-[800px]:w-[60px]"
            />
            <span className="text-sm text-center w-full span-text-line">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinesMenu;