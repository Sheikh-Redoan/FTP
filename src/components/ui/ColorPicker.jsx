const ColorPicker = ({ colors, activeIndex, onSelect, containerClassName }) => (
  <div className={containerClassName || "flex justify-start items-start gap-5 flex-wrap mb-8"}>
    {colors.map((color, index) => (
      <button
        key={index}
        type="button"
        className={`w-8 h-8 rounded-full cursor-pointer border-2 shadow-lg ${
          activeIndex === index ? "border-black" : "border-transparent"
        }`}
        style={{ backgroundColor: color.bg }}
        onClick={() => onSelect(index)}
        title={`Background: ${color.bg}, Lines: ${color.line}`}
      />
    ))}
  </div>
);

export default ColorPicker;