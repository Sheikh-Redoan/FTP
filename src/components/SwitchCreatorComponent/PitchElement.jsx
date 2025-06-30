import {
  Circle11,
  Circle12,
  Circle13,
  Circle14,
  Circle15,
  Circle16,
  Frame11,
  Frame12,
  Frame13,
  Frame14,
  Frame15,
  Frame16,
  Frame17,
  Frame18,
} from "@/assets/SidebarIcon";
import React from "react";

const PitchElement = () => {
  return (
    <div className="p-4">
      <div>
        <div className="flex items-center flex-wrap gap-4 mb-10">
          <Circle12 />
          <Circle13 />
          <Circle12 />
          <Circle13 />
          <Circle12 />
          <Circle13 />
        </div>
      </div>
      <div className="flex flex-col items-center gap-8">
        <Frame11 />
        <Frame12 />
        <Frame13 />
        <Frame14 />
        <Frame15 />
        <Frame16 />
        <Frame17 />
        <Frame18 />
      </div>
    </div>
  );
};

export default PitchElement;
