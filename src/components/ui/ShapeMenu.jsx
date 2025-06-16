import { useState, useEffect, useMemo } from "react";
import ColorPicker from "./ColorPicker";
import DragItem from "../common/DragItem";
import { getShapeSvgString } from "../../utils/svgUtils";
import {
  FaSquareFull, FaCircle,
  GiSquare, GiCircle,
  MdHexagon, MdOutlineHexagon,
  BsHexagonFill,
  PiHexagonThin, PiDiamondFill, PiDiamondThin, PiTriangleThin,
  IoTriangleSharp,
} from "../icons";

const ShapeMenu = ({ colors, activeColorIndex, onColorSelect, onDragStart }) => {
  const [shapeSvgContents, setShapeSvgContents] = useState({});

  const shapeComponents = useMemo(() => [
      { id: 200, type: "filledRectangle", icon: FaSquareFull, name: "Filled Rectangle" },
      { id: 201, type: "rectangle", icon: GiSquare, name: "Rectangle" },
      { id: 202, type: "filledHexagon", icon: MdHexagon, name: "Filled Hexagon" },
      { id: 203, type: "hexagon", icon: MdOutlineHexagon, name: "Hexagon" },
      { id: 204, type: "filledPolygon", icon: BsHexagonFill, name: "Filled Polygon" },
      { id: 205, type: "polygon", icon: PiHexagonThin, name: "Polygon" },
      { id: 206, type: "filledCircle", icon: FaCircle, name: "Filled Circle" },
      { id: 207, type: "circle", icon: GiCircle, name: "Circle" },
      { id: 208, type: "filledDiamond", icon: PiDiamondFill, name: "Filled Diamond" },
      { id: 209, type: "diamond", icon: PiDiamondThin, name: "Diamond" },
      { id: 210, type: "filledTriangle", icon: IoTriangleSharp, name: "Filled Triangle" },
      { id: 211, type: "triangle", icon: PiTriangleThin, name: "Triangle" },
    ], []);

  useEffect(() => {
    const loadShapeContents = () => {
      const newContents = {};
      const { bg, line } = colors[activeColorIndex];
      for (const shape of shapeComponents) {
        newContents[shape.id] = getShapeSvgString(shape.type, bg, line);
      }
      setShapeSvgContents(newContents);
    };
    loadShapeContents();
  }, [activeColorIndex, colors, shapeComponents]);

  return (
    <div className="p-2">
      <h3 className="text-lg font-bold mb-4">Shapes</h3>
      <ColorPicker colors={colors} activeIndex={activeColorIndex} onSelect={onColorSelect} />
      <div className="flex flex-col items-center gap-2">
        {shapeComponents.map((shape) => (
          <DragItem
            key={shape.id}
            src={shape.type}
            name={shape.name}
            onDragStart={onDragStart}
            IconComponent={shape.icon}
            displaySvgContent={shapeSvgContents[shape.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default ShapeMenu;