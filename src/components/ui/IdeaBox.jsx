import { IoBulbOutline } from "../icons";

const IdeaBox = () => (
  <div className="group relative mt-5">
    <div className="p-5 hover:bg-blue-50 bg-white shadow flex flex-col items-center rounded-2xl cursor-pointer">
      <IoBulbOutline className="text-4xl text-yellow-400" />
      <p className="text-lg font-medium font-roboto">Tips</p>
    </div>
    <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      <h3 className="font-bold text-blue-900 mb-2">Configuration Tips</h3>
      <ul className="text-sm space-y-2">
        <li>• Click on any menu to see available options.</li>
        <li>• Drag and drop elements to the canvas.</li>
        <li>• Click an element on the canvas to select and resize it.</li>
        <li>• Right-click for more options (future feature).</li>
      </ul>
    </div>
  </div>
);

export default IdeaBox;