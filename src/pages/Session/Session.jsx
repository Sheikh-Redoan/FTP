import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Duratio1, Refersh1, Seach1 } from "@/assets/SidebarIcon";
import { GoHeart, GoHeartFill } from "react-icons/go";
import CategoriesCheckbox from "@/components/PracticeComponent/CategoriesCheckbox";

const Session = () => {
  const [itemsData, setItemsData] = useState([]);
  const [readMore, setReadMore] = useState(null);
  const [isFavorite, setIsFavorite] = useState(() => {
    const saveItems = localStorage.getItem("isFavorite");
    return saveItems ? JSON.parse(saveItems) : [];
  });

  useEffect(() => {
    const SessionData = JSON.parse(localStorage.getItem("dropedItem"));
    setItemsData(SessionData);
  }, []);

  const handleReafMore = (id) => {
    setReadMore(readMore === id ? null : id);
  };

  const handleFavorite = (id) => {
    const alredayFavorite = isFavorite.some((item) => item.id === id);

    setIsFavorite((prevFov) => {
      if (alredayFavorite) {
        return prevFov.filter((item) => item.id !== id);
      } else {
        const fovItem = itemsData.find((items) => items.id === id);
        return [...prevFov, fovItem];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
  }, [isFavorite]);

  return (
    <div className="w-full min-h-screen">
      {/* Breadcrumb Section */}
      <div className="flex items-center  justify-between mb-6">
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
                <BreadcrumbPage>Session</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex justify-center">
          <Link to="/CreatorTool/switchCreator">
            <button className="text-lg text-[#010792] flex justify-center items-center gap-2 py-[10px] px-[35px] border rounded-full border-[#010792] cursor-pointer">
              <Refersh1 /> Switch to Creator Tool
            </button>
          </Link>
        </div>
      </div>
      <hr className="text-gray-300 mb-6" />

      {/* Select Section */}
      <div className="flex items-center gap-6 mb-[30px] justify-between">
        <div className="flex items-center gap-6">
          <div className="flex gap-4 items-center ">
            <label
              className="text-lg text-[#000342] font-medium leading-none"
              htmlFor=""
            >
              Source:
            </label>
            <div className="border border-[#919EAB] rounded-full outline-none ">
              <Select>
                <SelectTrigger className="outline-none py-[10px] px-[35px] gap-4  text-base rounded-full text-[#919EAB] border-none">
                  <SelectValue
                    className="text-base text-gray-300"
                    placeholder="Select Library"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white cursor-pointer">
                  <SelectGroup>
                    <SelectLabel>My Library</SelectLabel>
                    <SelectItem
                      className="focus:bg-blue-500  focus:text-white"
                      value="U 12"
                    >
                      My Library
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-blue-500 focus:text-white"
                      value="+12"
                    >
                      Global Library
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ------- */}

          <div className="flex gap-4 items-center ">
            <label
              className="text-lg text-[#000342] font-medium leading-none"
              htmlFor=""
            >
              Age Class:
            </label>
            <div className="border border-[#919EAB] rounded-full outline-none ">
              <Select>
                <SelectTrigger className="outline-none py-[10px] px-[35px] gap-4  text-base rounded-full text-[#919EAB] border-none">
                  <SelectValue
                    className="text-base text-gray-300"
                    placeholder="Select Age Class"
                  />
                </SelectTrigger>
                <SelectContent className="bg-white cursor-pointer">
                  <SelectGroup>
                    <SelectLabel>Age Class</SelectLabel>
                    <SelectItem
                      className="focus:bg-blue-500  focus:text-white"
                      value="U 12"
                    >
                      Pitch Masters (U 12)
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-blue-500 focus:text-white"
                      value="+12"
                    >
                      Pitch Masters (+12)
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-blue-500 focus:text-white"
                      value="+15"
                    >
                      Pitch Masters (+15)
                    </SelectItem>
                    <SelectItem
                      className="focus:bg-blue-500 focus:text-white"
                      value="+18"
                    >
                      Pitch Masters (+18)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* ----- */}
          <div>
            <CategoriesCheckbox />
          </div>
          <Link to="/dashboard/Session/Favorite">
            <div className="border border-[#010792] bg-[#010792] text-white flex items-center justify-center p-4 rounded-full">
              <button>
                <GoHeart size={34} />
              </button>
            </div>
          </Link>
        </div>

        <div className="flex relative">
          <input
            type="text"
            className="border border-[#B0B2DD] outline-none rounded-full py-[15px] px-[30px] w-[437px] bg-transparent"
            placeholder="Type to Search..."
          />
          <button
            type="button"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center pr-[20px]"
          >
            <Seach1 />
          </button>
        </div>
      </div>

      {/* Session data  */}

      <div className="bg-white p-6 rounded-lg mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {itemsData &&
            itemsData.map((event, index) => (
              <div key={index}>
                <div className="relative top-0 left-0 ">
                  <div>
                    <img src={event.image} alt="" />
                  </div>

                  <div className="absolute right-0 bottom-0 z-10 p-4">
                    <button
                      onClick={() => handleFavorite(event.id)}
                      className="border border-transparent p-2 bg-[#EDEBF6] bg-opacity-60 rounded-full"
                    >
                      <GoHeartFill
                        size={24}
                        className={
                          isFavorite.some((fov) => fov.id === event.id)
                            ? "text-[#4D37A4]"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between my-4">
                  <span className="text-[#FFC107] font-bold">PRIVATE</span>
                  <span className="text-[#919EAB] flex items-center gap-1">
                    <Duratio1 /> {event.duration}
                  </span>
                </div>
                <h2 className="mb-4 text-lg text-[#010792] font-medium leading-none">
                  {event.name}
                </h2>
                <div className="flex justify-between mb-2 text-[#010792] font-roboto text-[18px] font-normal leading-[24px]">
                  <h2>Category:</h2>
                  <span className="text-[#919EAB]">
                    {event.category} {event.focus}
                  </span>
                </div>
                <div className="flex justify-between mb-2 text-[#010792] font-roboto text-[18px] font-normal leading-[24px]">
                  <h2>Difficulty Level:</h2>
                  <span className="text-[#919EAB]">
                    {event.difficulty_level}
                  </span>
                </div>
                <div className="flex justify-between mb-4 text-[#010792] font-roboto text-[18px] font-normal leading-[24px]">
                  <h2>Progressions:</h2>
                  <span className="text-[#919EAB]">{event.progressions}</span>
                </div>
                <div className="text-[#0029F9]">
                  <button onClick={() => handleReafMore(event.id)}>
                    {readMore === event.id ? "Read Less... " : "Read More..."}
                  </button>
                  <br />
                  {readMore === event.id ? event.description : ""}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Session;
