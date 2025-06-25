// src/layouts/CommonLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Sidebar from "../shared/Sidebar/Sidebar";
import RightSidebar from "../shared/RightSidebar/RightSidebar";

const CommonLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 w-full h-full relative">
          <Outlet />
        </div>
        <RightSidebar />
      </main>
    </div>
  );
};

export default CommonLayout;