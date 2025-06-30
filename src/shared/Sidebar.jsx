import {
  BlockIcon1,
  BrainSettingsIcon1,
  CardPlanIcon1,
  DashboardIcon1,
  GlobeBookIcon1,
  HeadsetIcon1,
  InfoIcon1,
  LogoutIcon1,
  SessionIcon1,
  SettingsIcon1,
  UserCardIcon1,
  UsersIcon1,
} from "@/assets/SidebarIcon";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" h-screen flex flex-col justify-between gap-4 overflow-y-scroll overflow-x-hidden no-scroll">
      {/* logo section */}
      <div className="border-b border-[#e6e6f4] pb-4">
        <div className="text-[#010792] text-center font-roboto text-[62px] font-extrabold ">
          ftp
        </div>
        <div className="text-[#010792] text-center font-roboto text-[16px] font-normal leading-normal">
          Football Training Platform
        </div>
      </div>
      {/* nav section */}

      <div className="flex-grow flex flex-col gap-4">
        <ul className="flex flex-col gap-2">
          <SidebarLink
            path="/dashboard/dashboardHome"
            navName="Dashboard"
            icon={<DashboardIcon1 />}
          />
          <SidebarLink
            path="/dashboard/team-management"
            navName="Team Management"
            icon={<UsersIcon1 />}
          />
          <SidebarLink
            path="/dashboard/practice"
            navName="Practice"
            icon={<BrainSettingsIcon1 />}
          />
          <SidebarLink
            path="/dashboard/session"
            navName="Session"
            icon={<SessionIcon1 />}
          />
          <SidebarLink
            path="/dashboard/game-plan"
            navName="Game Plan"
            icon={<BlockIcon1 />}
          />
          <SidebarLink
            path="/dashboard/globalLibrary"
            navName="Global Library"
            icon={<GlobeBookIcon1 />}
          />
        </ul>
        <div className="mx-auto h-[1px] w-[80%] bg-[#e6e6f4]" />
        <ul className="flex flex-col gap-2">
          <SidebarLink
            path="/dashboard/settings"
            navName="Settings"
            icon={<SettingsIcon1 />}
          />
          <SidebarLink
            path="/dashboard/subscriptionPlan"
            navName="Subscription"
            icon={<CardPlanIcon1 />}
          />
        </ul>
        <div className="mx-auto h-[1px] w-[80%] bg-[#e6e6f4]" />
        <ul className="flex flex-col gap-2">
          <SidebarLink path="/help" navName="Help/FAQ" icon={<InfoIcon1 />} />
          <SidebarLink
            path="/dashboard/contact"
            navName="Contact Support"
            icon={<HeadsetIcon1 />}
          />
          <SidebarLink
            path="/Dashboard/about"
            navName="About"
            icon={<UserCardIcon1 />}
          />
        </ul>
      </div>

      <div>
        <button className=" flex  w-full items-center gap-4 p-2 pl-6 text-lg font-medium mb-10 text-[#dc2828] transition-colors duration-200">
          <LogoutIcon1 />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

const SidebarLink = ({ path, navName, icon }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `group  ml-1 inline-flex w-full items-center gap-4 border-l-4 p-2 pl-6 text-lg text-[#919EAB] font-medium leading-[normal] duration-200 
          ${
            isActive
              ? "border-l-[#010693] !text-[#010693]"
              : "border-l-transparent hover:!text-[#010693]"
          }`
        }
      >
        {icon}
        <span>{navName}</span>
      </NavLink>
    </li>
  );
};

export default Sidebar;
