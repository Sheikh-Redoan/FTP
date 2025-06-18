// src/components/ui/QuickAccessMenu.jsx
import DragItem from "../common/DragItem";
import { useSvg } from "../../context/SvgContext"; // Import useSvg hook

const QuickAccessMenu = ({ onDragStart }) => {
  // Get quick access items from context
  const { quickAccessItems } = useSvg();

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 ">Quick Access</h3>
      <div className="flex flex-col items-center gap-2 quick">
        {quickAccessItems.length > 0 ? (
          quickAccessItems.map((item, index) => (
            <DragItem
              key={`${item.id}-${index}-${item.name}`} // Create a more unique key
              src={item.src}
              name={item.name}
              onDragStart={onDragStart}
              IconComponent={item.IconComponent}
              displaySvgContent={item.content}
              type={item.type}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">Your recently used items will appear here.</p>
        )}
      </div>
    </div>
  );
};

export default QuickAccessMenu;