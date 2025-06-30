import GlobalLibraryDash from "@/components/DashboardHomeComponentes/GlobalLibraryDash";
import Middle from "@/components/DashboardHomeComponentes/Middle";
import Welcomeback from "@/components/DashboardHomeComponentes/Welcomeback";
import React from "react";

const DashboardHome = () => {
  return (
    <div className="h-screen w-full space-y-6">
      <Welcomeback />
      <Middle />
      <GlobalLibraryDash />
    </div>
  );
};

export default DashboardHome;
