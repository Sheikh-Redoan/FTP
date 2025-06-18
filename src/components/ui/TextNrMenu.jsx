import ColorPicker from "./ColorPicker";

const TextNrMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onDragStart,
}) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Text & Nr.</h3>
      <ColorPicker
        colors={colors}
        activeIndex={activeColorIndex}
        onSelect={onColorSelect}
      />
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter text"
          className="p-2 border rounded"
          draggable
          onDragStart={(e) => {
            const text = e.target.value;
            e.dataTransfer.setData("text/plain", text);
            onDragStart(
              text,
              `<svg width="200" height="50" xmlns="http://www.w3.org/2000/svg"><text x="10" y="30" font-size="20">${text}</text></svg>`
            );
          }}
        />
        <input
          type="number"
          placeholder="Enter number"
          className="p-2 border rounded"
          draggable
          onDragStart={(e) => {
            const num = e.target.value;
            e.dataTransfer.setData("text/plain", num);
            onDragStart(
              num,
              `<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg"><text x="25" y="35" text-anchor="middle" font-size="30">${num}</text></svg>`
            );
          }}
        />
      </div>
    </div>
  );
};

export default TextNrMenu;