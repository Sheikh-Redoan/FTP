import Sidebar from "@/shared/Sidebar";
import TopNav from "@/shared/TopNav";
import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen max-h-screen flex overflow-hidden ">
      <ScrollRestoration />
      {/* Sidebar */}
      <div className="w-[300px] shadow bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="bg-[#f3f4f7] flex-1 flex flex-col h-screen overflow-hidden pb-6">
        <TopNav />

        {/* Outlet Container */}
        <div className="flex-1 overflow-y-scroll no-scroll p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
