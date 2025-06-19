import ColorPicker from "./ColorPicker";

const TextNrMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onAddText,
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
        <button
          onClick={onAddText}
          className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Add Text
        </button>
      </div>
    </div>
  );
};

export default TextNrMenu;