import { useState, useEffect, useCallback, useMemo } from "react";
import ColorPicker from "./ColorPicker";
import DragItem from "../common/DragItem";
import { getModifiedSvgString } from "../../utils/svgUtils";

// Import Equipment SVGs
import Player from "../../assets/Equipment/Player.svg";
import Football from "../../assets/Equipment/Football.svg";
import OpponentWithPerspective from "../../assets/Equipment/OpponentWithPerspective.svg";
import PlayerWithPerspective from "../../assets/Equipment/PlayerWithPerspective.svg";
import Player2 from "../../assets/Equipment/Player2.svg";
import Player3 from "../../assets/Equipment/Player3.svg";
import Cone from "../../assets/Equipment/Cone.svg";
import Ladder from "../../assets/Equipment/Ladder.svg";
import Dummy from "../../assets/Equipment/Dummy.svg";
import Ring from "../../assets/Equipment/Ring.svg";
import GoalSmall from "../../assets/Equipment/GoalSmall.svg";
import GoalMiddle from "../../assets/Equipment/GoalMiddle.svg";
import GoalBig from "../../assets/Equipment/GoalBig.svg";
import Flag from "../../assets/Equipment/Flag.svg";

const EquipmentMenu = ({ colors, activeColorIndex, onColorSelect, onDragStart }) => {
  const [svgContents, setSvgContents] = useState({});

  const equipmentAssets = useMemo(() => [
      { id: 100, component: Player, name: "Player" },
      { id: 101, component: Football, name: "Football" },
      { id: 102, component: OpponentWithPerspective, name: "Opponent" },
      { id: 103, component: PlayerWithPerspective, name: "Player" },
      { id: 104, component: Player2, name: "Player 2" },
      { id: 105, component: Player3, name: "Player 3" },
      { id: 106, component: Cone, name: "Cone" },
      { id: 107, component: Ladder, name: "Ladder" },
      { id: 108, component: Dummy, name: "Dummy" },
      { id: 109, component: Ring, name: "Ring" },
      { id: 110, component: GoalSmall, name: "Goal Small" },
      { id: 111, component: GoalMiddle, name: "Goal Middle" },
      { id: 112, component: GoalBig, name: "Goal Big" },
      { id: 113, component: Flag, name: "Flag" },
    ], []);

  useEffect(() => {
    const loadSvgContents = async () => {
      const newContents = {};
      const { bg, line } = colors[activeColorIndex];
      for (const eq of equipmentAssets) {
        newContents[eq.id] = await getModifiedSvgString(eq.component, bg, line);
      }
      setSvgContents(newContents);
    };
    loadSvgContents();
  }, [activeColorIndex, colors, equipmentAssets]);

  const beforeEquipmentSvgInjection = useCallback((svg) => {
      const { bg, line } = colors[activeColorIndex];
      const elements = svg.querySelectorAll("path, line, polyline, polygon, rect, circle");
      elements.forEach((el) => {
        el.setAttribute("stroke", line);
        el.setAttribute("fill", bg);
      });
    }, [activeColorIndex, colors]);

  return (
    <div className="p-2">
      <ColorPicker colors={colors} activeIndex={activeColorIndex} onSelect={onColorSelect} />
      <div className="flex flex-col items-center gap-2">
        {equipmentAssets.map((eq) => (
          <DragItem
            key={eq.id}
            src={eq.component}
            name={eq.name}
            onDragStart={onDragStart}
            beforeInjection={beforeEquipmentSvgInjection}
            displaySvgContent={svgContents[eq.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipmentMenu;