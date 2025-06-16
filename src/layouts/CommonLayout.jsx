// src/layouts/CommonLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Sidebar from "../shared/Sidebar/Sidebar";
import RightSidebar from "../shared/RightSidebar/RightSidebar";

const CommonLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-full flex">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        <RightSidebar />
      </main>
    </>
  );
};

export default CommonLayout;
