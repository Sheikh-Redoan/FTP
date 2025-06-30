import React from "react";
import welcomeback from "../../assets/imges/Welcomeback.png";
import creator from "../../assets/imges/Creator.png";
import { IoArrowForward } from "react-icons/io5";
import { Refersh1 } from "@/assets/SidebarIcon";
import { Link } from "react-router-dom";

const Welcomeback = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9">
        <div className="relative w-full">
          {/* Background Image */}
          <img src={welcomeback} className="w-full h-auto" alt="Welcome Back" />

          {/* Overlay Text */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start  p-10">
            <h2 className="text-white font-roboto text-[48px] font-semibold leading-normal capitalize">
              Welcome back!
            </h2>
            <p className="text-[#DFE3E8] font-roboto text-[18px] font-normal leading-[28px]">
              Lorem Ipsum is simply dummy text of the printing <br /> and
              typesetting industry.
            </p>
            <button className="mt-[87px] flex items-center gap-2 py-[10px] px-[35px] bg-white text-[#010792] font-medium rounded-full">
              Upgrade Now <IoArrowForward size={24} />
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-[#E6E6F4] rounded-[16px]">
        <div className="py-6 px-6">
          <img src={creator} className="w-[300px] mx-auto" alt="creator" />
          <div className="flex justify-center">
            <Link
              to="/CreatorTool/switchCreator"
              className="text-lg text-[#010792] flex justify-center items-center gap-2 py-[10px] px-[35px] border rounded-full border-[#010792] cursor-pointer hover:bg-[#010792] hover:text-white duration-300 mt-[14px]"
            >
              <Refersh1 /> Switch to Creator Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcomeback;