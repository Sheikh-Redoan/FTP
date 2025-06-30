import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Country1, Country11, User1, UserIcon1 } from "@/assets/Svgs";
import { City1, Pdf1, SavePDF1 } from "@/assets/SidebarIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoHeart } from "react-icons/go";
import { PiPrinterLight } from "react-icons/pi";
import { GrDocumentPdf } from "react-icons/gr";

const GlobalLibraryDetails = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Breadcrumb Section */}
      <div className="">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard/dashboardHome">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard/globalLibrary">Global Library</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Training 09.01.25 TR1</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <hr className="text-gray-200 my-6" />
      </div>

      {/* text section1 */}
      <div className="bg-white p-6 rounded-[16px] w-[887px]">
        <h1 className="text-xl text-[#010792] font-medium mb-1">
          Training 09.01.25 TR1
        </h1>
        <div className="flex gap-4 text-lg">
          <p className="text-[#010792]">
            Category:{" "}
            <span className="text-[#919EAB]">
              Technical:Passing & Receiving
            </span>
          </p>
          ||
          <p className="text-[#010792]">
            Difficulty Level: <span className="text-[#919EAB]">Beginner</span>
          </p>
        </div>
        <hr className="text-gray-200 my-8" />
        <div className="flex justify-between items-center">
          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-2">
              <UserIcon1 className=" text-[#010792] " />
              <h1 className="flex gap-16 text-[#010792] font-medium">
                Name:{" "}
                <span className="text-[#919EAB] font-normal">Arlene McCoy</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <City1 className=" text-[#010792]" />
              <h1 className="flex gap-20 text-[#010792] font-medium">
                City:{" "}
                <span className="text-[#919EAB] font-normal">
                  2972 Westheimer Rd. Santa Ana
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Country11 />
              <h1 className="flex gap-12 text-[#010792] font-medium">
                Country:{" "}
                <span className="text-[#919EAB] font-normal">
                  Sao Tome and Principe
                </span>
              </h1>
            </div>
          </div>
          <div>
            <Avatar>
              <AvatarImage
                className="w-[200px] h-[200px]"
                src="https://github.com/shadcn.png"
              />
            </Avatar>
          </div>
        </div>
      </div>

      {/* button section */}

      <div className="flex justify-end items-center py-8 gap-4">
        <button className="border rounded-full p-2 border-[#010792] text-[#010792]">
          <GoHeart size={32} />
        </button>
        <button className="border rounded-full p-2 border-[#010792] text-[#010792]">
          <PiPrinterLight size={32} />
        </button>
        <button className="border rounded-full p-2 border-[#010792] text-[#010792]">
          <GrDocumentPdf size={32} />
        </button>
      </div>

      {/* images and text section */}

      <div className="bg-white p-6 rounded-[16px] space-y-14">
        {/* item 1 */}
        <div className="grid grid-cols-2 gap-12">
          <div>
            <img src="https://i.postimg.cc/HxkPn20f/image-2.png" alt="" />
          </div>
          <div>
            <h1 className="text-[#010792] font-medium text-lg mb-8">
              Training 09.01.25 TR1
            </h1>
            <div className="text-[#919EAB] space-y-4 text-lg">
              <p>The 3 square rondo</p>
              <p>14x14m /4m gap between</p>
              <p>6 goals</p>
              <p>
                6v3 in possession box, on exit pass to another square receiving
                team must make there team a 6 and 3 new defenders go in.
              </p>
              <p>If defensive team win ball score in the goals</p>
              <p>90 secs work</p>
            </div>
          </div>
        </div>
        {/* item 2 */}
        <div className="grid grid-cols-2 gap-12">
          <div>
            <h1 className="text-[#010792] font-medium text-lg mb-8">
              Training 09.01.25 TR1
            </h1>
            <div className="text-[#919EAB] space-y-4 text-lg">
              <p>The 3 square rondo</p>
              <p>14x14m /4m gap between</p>
              <p>6 goals</p>
              <p>
                6v3 in possession box, on exit pass to another square receiving
                team must make there team a 6 and 3 new defenders go in.
              </p>
              <p>If defensive team win ball score in the goals</p>
              <p>90 secs work</p>
            </div>
          </div>
          <div>
            <img src="https://i.postimg.cc/HxkPn20f/image-2.png" alt="" />
          </div>
        </div>
        {/* item 3 */}
        <div className="grid grid-cols-2 gap-12">
          <div>
            <img src="https://i.postimg.cc/HxkPn20f/image-2.png" alt="" />
          </div>
          <div>
            <h1 className="text-[#010792] font-medium text-lg mb-8">
              Training 09.01.25 TR1
            </h1>
            <div className="text-[#919EAB] space-y-4 text-lg">
              <p>The 3 square rondo</p>
              <p>14x14m /4m gap between</p>
              <p>6 goals</p>
              <p>
                6v3 in possession box, on exit pass to another square receiving
                team must make there team a 6 and 3 new defenders go in.
              </p>
              <p>If defensive team win ball score in the goals</p>
              <p>90 secs work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLibraryDetails;
