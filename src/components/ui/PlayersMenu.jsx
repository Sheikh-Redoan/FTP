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
    <div className="p-2 max-[800px]:flex max-[800px]:justify-between max-[800px]:items-center max-[800px]:gap-7">
      <div>
        <h3 className="text-lg font-bold mb-4 max-[800px]:hidden">Players</h3>
        <ColorPicker
          colors={colors}
          activeIndex={activeColorIndex}
          onSelect={onColorSelect}
          containerClassName={"flex justify-center items-start gap-4 flex-wrap mb-8 max-[800px]:flex max-[800px]:flex-wrap max-[800px]:overflow-y-scroll max-[800px]:gap-3 max-[800px]:max-h-[100px] max-[800px]:py-[10px]"}
        />
      </div>
      <div
        className={`flex ${
          isMobile ? "flex-nowrap overflow-x-auto" : "flex-wrap justify-center"
        } gap-2 max-[800px]:flex-row max-[800px]:overflow-x-scroll item_div max-[800px]:h-max max-[800px]:flex-nowrap max-[800px]:justify-start `}
      >
        {[...players, ...letters].map((p) => (
          <div
            key={p}
            className={`flex items-center justify-center ${
              isMobile ? "w-8 h-8" : "w-10 h-10"
            } rounded-full cursor-pointer flex-shrink-0 max-[800px]:!w-[50px] max-[800px]:!h-[50px]`}
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