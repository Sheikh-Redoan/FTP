import ColorPicker from "./ColorPicker";
import DragItem from "../common/DragItem";
import { IoPeopleOutline } from "../icons";

const PlayersMenu = ({
  colors,
  activeColorIndex,
  onColorSelect,
  onDragStart,
}) => {
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
      <div className="flex gap-2 flex-wrap justify-center">
        {players.map((p) => (
          <div
            key={p}
            className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full cursor-pointer"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", `Player ${p}`);
              onDragStart(
                `Player ${p}`,
                `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red" stroke="white" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="30">${p}</text></svg>`
              );
            }}
          >
            {p}
          </div>
        ))}
        {letters.map((l) => (
          <div
            key={l}
            className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full cursor-pointer"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", `Player ${l}`);
              onDragStart(
                `Player ${l}`,
                `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="red" stroke="white" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="30">${l}</text></svg>`
              );
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersMenu;