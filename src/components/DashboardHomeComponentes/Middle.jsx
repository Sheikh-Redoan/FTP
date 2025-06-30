import React, { useState } from "react";
import NextEvent from "./NextEvent";
import RecentActivities from "./RecentActivities";
import MyTeams from "./MyTeams";

const Middle = () => {
  useState;
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 ">
        <div>
          <NextEvent />
        </div>
        <div>
          <RecentActivities />
        </div>
        <div>
          <MyTeams />
        </div>
      </div>
    </div>
  );
};

export default Middle;
