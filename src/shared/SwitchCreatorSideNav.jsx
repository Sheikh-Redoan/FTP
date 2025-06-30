import {
  Equipment1,
  Lines11,
  Pitch11,
  QuickAccess1,
  Text11,
} from "@/assets/SidebarIcon";
import React from "react";
import { NavLink } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";

const SwitchCreatorSideNav = ({setActive }) => {
  return (
    <div className="flex-grow flex flex-col gap-4 items-center">
      <NavLink onClick={() => setActive('one')}
        to="/CreatorTool/switchCreator"
        className={({ isActive }) =>
          ` flex flex-col gap-2 items-center py-6 text-lg rounded-[16px] w-[184px] ${
            isActive ? "bg-[#010792] text-white" : "bg-white text-[#010792]"
          }`
        }
      >
        <Pitch11 fillColor="currentColor" />
        <h2>Pitch</h2>
      </NavLink>

      <NavLink
      onClick={() => setActive('two')}
        to="/CreatorTool/QuickAccess"
        className={({ isActive }) =>
          `flex flex-col gap-2 items-center py-6 text-lg rounded-[16px] w-[184px] ${
            isActive ? "bg-[#010792] text-white" : "bg-white text-[#010792]"
          }`
        }
      >
        <QuickAccess1 fillColor="currentColor" />
        <h2>Quick Access</h2>
      </NavLink>

      <NavLink
      onClick={() => setActive('three')}
        to="/players"
        className={({ isActive }) =>
          `flex flex-col gap-2 items-center py-6 text-lg rounded-[16px] w-[184px] ${
            isActive ? "bg-[#010792] text-white" : "bg-white text-[#010792]"
          }`
        }
      >
        <PiUserCircleLight size={64} className="currentColor" />
        <h2>Players</h2>
      </NavLink>

      <NavLink
        to="/lines"
        className={({ isActive }) =>
          `flex flex-col gap-2 items-center py-6 text-lg rounded-[16px] w-[184px] ${
            isActive ? "bg-[#010792] text-white" : "bg-white text-[#010792]"
          }`
        }
      >
        <Lines11 fillColor="currentColor" />
        <h2>Lines</h2>
      </NavLink>

      <NavLink
        to="/equipment"
        className={({ isActive }) =>
          `flex flex-col gap-2 items-center py-6 text-lg rounded-[16px] w-[184px] ${
            isActive ? "bg-[#010792] text-white" : "bg-white text-[#010792]"
          }`
        }
      >
        <Equipment1 fillColor="currentColor" />
        <h2>Equipment</h2>
      </NavLink>

      <NavLink
        to="/text-nr"
        className={({ isActive }) =>
          `flex flex-col gap-2 items-center py-6 text-lg rounded-[16px] w-[184px] ${
            isActive ? "bg-[#010792] text-white" : "bg-white text-[#010792]"
          }`
        }
      >
        <Text11 fillColor="currentColor" />
        <h2>Text & Nr.</h2>
      </NavLink>
    </div>
  );
};

export default SwitchCreatorSideNav;
