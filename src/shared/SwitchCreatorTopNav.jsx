import React from "react";
import { Link } from "react-router-dom";

const SwitchCreatorTopNav = () => {
  return (
    <div>
      <div className="border-b border-[#e6e6f4]  pb-2 flex   ">
        <Link to="/dashboard/dashboardHome">
          <div className=" w-[289px] flex flex-col items-center justify-start">
            <h2 className="text-[#010792]  font-roboto text-[44px] font-extrabold ">
              ftp
            </h2>
            <p className="text-[#010792]  font-roboto text-[16px] font-normal leading-normal">
              Football Training Platform
            </p>
          </div>
        </Link>

        <div className="flex flex-grow  items-center justify-center">
          <h2 className="text-center text-[32px]">Title</h2>
        </div>
      </div>
    </div>
  );
};

export default SwitchCreatorTopNav;
