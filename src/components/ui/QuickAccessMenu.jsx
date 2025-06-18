import DragItem from "../common/DragItem";
import {
  IoFootballOutline,
  FaSquareFull,
  IoPeopleOutline,
} from "../icons";


const QuickAccessMenu = ({ onDragStart }) => {
  const quickAccessItems = [
    { id: 300, name: "Player", icon: IoPeopleOutline },
    { id: 301, name: "Dummy", icon: IoFootballOutline },
    { id: 302, name: "Ladder", icon: IoFootballOutline },
    { id: 303, name: "Cone", icon: IoFootballOutline },
    { id: 304, name: "Football", icon: IoFootballOutline },
    { id: 305, name: "Hurdle", icon: IoFootballOutline },
    { id: 306, name: "Ring", icon: IoFootballOutline },
    { id: 307, name: "Line", icon: FaSquareFull },
    { id: 308, name: "Shape", icon: FaSquareFull },
    { id: 309, name: "Goal", icon: IoFootballOutline },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Quick Access</h3>
      <div className="flex flex-col items-center gap-2">
        {quickAccessItems.map((item) => (
          <DragItem
            key={item.id}
            src={item.name}
            name={item.name}
            onDragStart={onDragStart}
            IconComponent={item.icon}
            displaySvgContent={`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="lightblue" /><text x="50" y="50" text-anchor="middle">${item.name}</text></svg>`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessMenu;