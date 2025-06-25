// src/components/ui/PlayersMenu.jsx
import ColorPicker from "./ColorPicker";
import { useSvg } from "../../context/SvgContext";

const PlayersMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onDragStart,
  isMobile,
}) => {
  const { playerColor } = useSvg();
  const players = Array.from({ length: 14 }, (_, i) => i + 1);
  const letters = ["A", "B", "C", "D"];

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Players</h3>
      <ColorPicker
        colors={colors}
        activeIndex={activeColorIndex}
        onSelect={onColorSelect}
      />
      <div
        className={`flex gap-2 ${
          isMobile ? "flex-nowrap overflow-x-auto" : "flex-wrap justify-center"
        }`}
      >
        {[...players, ...letters].map((p) => (
          <div
            key={p}
            className={`flex items-center justify-center ${
              isMobile ? "w-8 h-8" : "w-10 h-10"
            } rounded-full cursor-pointer flex-shrink-0`}
            style={{
              backgroundColor: playerColor,
              color: colors[activeColorIndex].line,
            }}
            draggable
            onDragStart={(e) => {
              const text = `Player ${p}`;
              const svgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="${playerColor}" stroke="${colors[activeColorIndex].line}" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="${colors[activeColorIndex].line}" font-size="30">${p}</text></svg>`;
              e.dataTransfer.setData("text/plain", text);
              const dragData = {
                src: `data:image/svg+xml;utf8,${encodeURIComponent(
                  svgContent
                )}`,
                name: text,
                type: "player",
                text: p,
                content: svgContent,
              };
              onDragStart(dragData);
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersMenu;