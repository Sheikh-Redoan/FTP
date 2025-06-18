import ColorPicker from "./ColorPicker";
import DragItem from "../common/DragItem";
import { FaSquareFull } from "../icons";

const LinesMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onDragStart,
}) => {
  const lineItems = [
    { id: 400, name: "Fieldmarker" },
    { id: 401, name: "Fieldmarker dotted" },
    { id: 402, name: "Fieldmarker curved" },
    { id: 403, name: "Passing or finishing" },
    { id: 404, name: "Run" },
    { id: 405, name: "Dribbling" },
  ];
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
          <DragItem
            key={item.id}
            src={item.name}
            name={item.name}
            onDragStart={onDragStart}
            IconComponent={FaSquareFull}
            displaySvgContent={`<svg width="100" height="20" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="10" x2="100" y2="10" stroke="black" stroke-width="2"/></svg>`}
          />
        ))}
      </div>
    </div>
  );
};

export default LinesMenu;