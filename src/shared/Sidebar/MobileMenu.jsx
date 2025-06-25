// src/shared/Sidebar/MobileMenu.jsx
import { IoClose } from "../../components/icons";

const MobileMenu = ({ activeMenu, onClose, children }) => {
  if (!activeMenu) {
    return null;
  }

  return (
      <div className="absolute bottom-[80px] left-0 w-full bg-[#E6E6F4] rounded-t-lg shadow-lg p-4 overflow-y-auto z-50 h-max max-[800px]:p-1 glasseffect">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black"
        >
          <IoClose className="text-xl" />
        </button>
        {children}
      </div>
  );
};

export default MobileMenu;