// src/components/common/KonvaToolbar.jsx
import { FaRedo } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { IoDuplicateOutline } from "react-icons/io5";
import { PiBroomLight } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { MdOutlineRotateRight } from "react-icons/md";

const ToolbarButton = ({ onClick, children, label, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-[45px] h-[45px] p-2 rounded-full  flex justify-center items-center ${
      disabled ? "bg-gray-300 cursor-not-allowed" : "border border-blue-500 group hover:bg-blue-600"
    } text-white flex flex-col items-center justify-center text-xs`}
    title={label}
  >
    {children}
    <span className="mt-1">{label}</span>
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
}) => {
  const isSelected = !!selectedEquipment;
  const isLocked = isSelected && selectedEquipment.locked;

  return (
    <div className="absolute bottom-[-30px] right-1/2 translate-1/2 w-max rounded-lg  flex gap-2 z-50">
      <ToolbarButton onClick={onUndo} disabled={!canUndo}>
        <IoReturnUpBackOutline className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton onClick={onRedo}  disabled={!canRedo}>
        <FaRedo className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton onClick={onDuplicate} disabled={!isSelected || isLocked}>
        <IoDuplicateOutline className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton onClick={onDelete}  disabled={!isSelected || isLocked}>
        <PiBroomLight className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
      <ToolbarButton onClick={onLockUnlock}  disabled={!isSelected}>
        {isLocked ? <CiUnlock className="text-xl text-blue-500 group-hover:text-white" /> : <CiLock className="text-xl text-blue-500 group-hover:text-white" />}
      </ToolbarButton>
      <ToolbarButton onClick={onRotate}  disabled={!isSelected || isLocked}>
        <MdOutlineRotateRight className="text-xl text-blue-500 group-hover:text-white" />
      </ToolbarButton>
    </div>
  );
};

export default KonvaToolbar;
