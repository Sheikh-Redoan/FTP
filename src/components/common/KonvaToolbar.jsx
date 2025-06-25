import { FaRedo } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { IoDuplicateOutline } from "react-icons/io5";
import { PiBroomLight } from "react-icons/pi";
import { CiLock, CiUnlock } from "react-icons/ci";
import { MdOutlineRotateRight } from "react-icons/md";
import ColorPicker from "../ui/ColorPicker";

// Restored original ToolbarButton component
const ToolbarButton = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-[45px] h-[45px] p-2 rounded-full flex justify-center items-center ${
      disabled
        ? "bg-gray-300 cursor-not-allowed"
        : "border border-blue-500 group hover:bg-blue-600"
    } text-white flex flex-col items-center justify-center text-xs`}
  >
    {children}
  </button>
);

const KonvaToolbar = ({
  selectedEquipment,
  onUndo,
  onRedo,
  onDuplicate,
  onDelete,
  onLockUnlock,
  onRotate,
  canUndo,
  canRedo,
  onTextColorChange,
  textColors,
  onTextResize,
}) => {
  const isSelected = !!selectedEquipment;
  const isLocked = isSelected && selectedEquipment.locked;
  const isText = isSelected && selectedEquipment.type === "text";

  // Toolbar is now always visible, with buttons disabled based on selection state.
  return (
    <div
      className={`absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-max rounded-lg flex items-center gap-2 z-50 p-2 max-[800px]:flex-col max-[800px]:left-[10%] max-[800px]:p-5 max-[800px]:w-[80px] glasseffect-toolbar min-[800px]:bottom-0 ${
        isText
          ? "max-[800px]:h-[560px] max-[800px]:bottom-[20%]"
          : "max-[800px]:h-max max-[800px]:bottom-[35%]"
      }`}
    >
      <ToolbarButton onClick={onUndo} disabled={!canUndo} label="Undo">
        <IoReturnUpBackOutline className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton onClick={onRedo} disabled={!canRedo} label="Redo">
        <FaRedo className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton
        onClick={onDuplicate}
        disabled={!isSelected || isLocked}
        label="Duplicate"
      >
        <IoDuplicateOutline className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton
        onClick={onDelete}
        disabled={!isSelected || isLocked}
        label="Delete"
      >
        <PiBroomLight className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton
        onClick={onLockUnlock}
        disabled={!isSelected}
        label={isLocked ? "Unlock" : "Lock"}
      >
        {isLocked ? (
          <CiUnlock className="text-xl text-blue-500 group-hover:text-white" />
        ) : (
          <CiLock className="text-xl text-blue-500 group-hover:text-white" />
        )}
      </ToolbarButton>
      <ToolbarButton
        onClick={onRotate}
        disabled={!isSelected || isLocked}
        label="Rotate"
      >
        <MdOutlineRotateRight className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>

      {/* Color picker and resize slider for text */}
      {isText && (
        <>
          <div className="h-8 w-px bg-gray-400 mx-1 max-[800px]:hidden" />
          {textColors && (
            <ColorPicker
              colors={textColors}
              activeIndex={textColors.findIndex(
                (c) => c.line === selectedEquipment.fill
              )}
              onSelect={onTextColorChange}
              containerClassName="flex items-center gap-1 p-2 rounded-lg max-[800px]:flex-col max-[800px]:h-[50px] max-[800px]:overflow-y-scroll max-[800px]:justify-center list-item"
            />
          )}
          <div className="h-8 w-px bg-gray-400 mx-1 max-[800px]:hidden" />
          <div className="flex items-center gap-2 p-2 rounded-lg max-[800px]:rotate-270 max-[800px]:translate-y-[50px]">
            <span className="text-xs text-gray-700 max-[800px]:rotate-90">
              Size
            </span>
            <input
              type="range"
              min="10"
              max="100"
              value={selectedEquipment.fontSize}
              onChange={onTextResize}
              className="w-24 cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default KonvaToolbar;