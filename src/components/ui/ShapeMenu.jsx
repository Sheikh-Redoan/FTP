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

const ShapeMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onDragStart,
}) => {
  const [shapeSvgContents, setShapeSvgContents] = useState({});

  // MODIFIED: Simplified the list to only have one of each shape type.
  const shapeComponents = useMemo(
    () => [
      { id: 200, type: "rectangle", icon: FaSquareFull, name: "Rectangle (FaSquareFull)" },
      { id: 201, type: "rectangle", icon: GiSquare, name: "Rectangle (GiSquare)" },
      { id: 202, type: "hexagon", icon: MdHexagon, name: "Hexagon (MdHexagon)" },
      { id: 203, type: "hexagon", icon: MdOutlineHexagon, name: "Hexagon (MdOutlineHexagon)" },
      { id: 204, type: "polygon", icon: BsHexagonFill, name: "Polygon (BsHexagonFill)" },
      { id: 205, type: "hexagon", icon: PiHexagonThin, name: "Hexagon (PiHexagonThin)" },
      { id: 206, type: "circle", icon: FaCircle, name: "Circle (FaCircle)" },
      { id: 207, type: "circle", icon: GiCircle, name: "Circle (GiCircle)" },
      { id: 208, type: "diamond", icon: PiDiamondFill, name: "Diamond (PiDiamondFill)" },
      { id: 209, type: "diamond", icon: PiDiamondThin, name: "Diamond (PiDiamondThin)" },
      { id: 210, type: "triangle", icon: IoTriangleSharp, name: "Triangle (IoTriangleSharp)" },
      { id: 211, type: "triangle", icon: PiTriangleThin, name: "Triangle (PiTriangleThin)" },
    ],
    []
  );

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
      <ColorPicker
        colors={colors}
        activeIndex={activeColorIndex}
        onSelect={onColorSelect}
      />
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