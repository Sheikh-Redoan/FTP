import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Duratio1, Refersh1 } from "@/assets/SidebarIcon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdDownload } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillPrinter } from "react-icons/ai";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableCard from "@/components/PracticeComponent/DraggableCard";
import DroppableCarousel from "@/components/PracticeComponent/DroppableCarousel";
import CategoriesCheckbox from "@/components/PracticeComponent/CategoriesCheckbox";

const ItemTypes = {
  CARD: "card",
};

const Practice = () => {
  const [practice, setPractice] = useState([]);
  const [readMore, setReadMore] = useState(null);
  const [dropedItem, setDropedItem] = useState([]);
  const [dragItemHidden, setDragItemHidden] = useState([]);

  const [isFavorite, setIsFavorite] = useState(() => {
    const saveItems = localStorage.getItem("isFavorite");
    return saveItems ? JSON.parse(saveItems) : [];
  });

  useEffect(() => {
    fetch("/Api/practice.json")
      .then((res) => res.json())
      .then((data) => {
        setPractice(data);
      });
  }, []);

  const handleReafMore = (id) => {
    setReadMore(readMore === id ? null : id);
  };

  const handleDrop = (item) => {
    setDropedItem((prevItems) => {
      const newItems = [...prevItems, item];
      return newItems;
    });

    setDragItemHidden((prevItems) => [...prevItems, item.id]);
  };

  const handleFavorite = (id) => {
    const alredayFavorite = isFavorite.some((item) => item.id === id);

    setIsFavorite((prevFov) => {
      if (alredayFavorite) {
        return prevFov.filter((item) => item.id !== id);
      } else {
        const fovItem = practice.find((items) => items.id === id);
        return [...prevFov, fovItem];
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("isFavorite", JSON.stringify(isFavorite));
  }, [isFavorite]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full min-h-screen">
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
                  <BreadcrumbPage>Practice</BreadcrumbPage>
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
        <div className="flex gap-6 mb-[30px]">
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

          <div>
            <CategoriesCheckbox />
          </div>
        </div>

        {/* top Session 1 */}
        <div className="bg-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-medium ">
                New Session ({dropedItem.length} drills Added, maximum 7)
              </h1>
            </div>
            <div className="flex gap-4">
              <div className="border border-[#010792] hover:bg-[#010792] cursor-pointer hover:text-white text-[#010792] rounded-full p-2">
                <IoMdDownload size={32} />
              </div>
              <div className="border border-[#010792] text-[#010792] cursor-pointer hover:bg-[#010792] hover:text-white rounded-full p-2">
                <AiFillPrinter size={32} />
              </div>

              {dropedItem.length >= 5 ? (
                <Link to="/dashboard/Session">
                  <button
                    className={`py-[10px] px-[35px] rounded-full   bg-[#010792] hover:bg-white font-medium text-lg shadow-0 hover:text-[#010792]  border border-[#010792] text-white duration-300 flex items-center gap-1`}
                  >
                    <AiOutlinePlus size={24} />
                    Create a New Category
                  </button>
                </Link>
              ) : (
                <button
                  className={`py-[10px] px-[35px] rounded-full opacity-50  bg-[#010792]  font-medium text-lg shadow-0   border border-[#010792] text-white duration-300 flex items-center gap-1`}
                >
                  <AiOutlinePlus size={24} />
                  Create a New Category
                </button>
              )}
            </div>
          </div>

          {/* darg and drop dection */}
          <DroppableCarousel
            dropedItem={dropedItem}
            setDropedItem={setDropedItem}
            onDrop={handleDrop}
            ItemTypes={{ CARD: "card" }}
          />
        </div>

        {/* bottom Session 2 */}

        <div className="bg-white p-6 rounded-lg mt-6">
          <div className="grid grid-cols-4 gap-5 ">
            {practice
              .filter((item) => !dragItemHidden.includes(item.id))
              .map((event) => (
                <div key={event.id}>
                  <div>
                    <DraggableCard
                      id={event.id}
                      image={event.image}
                      name={event.name}
                      category={event.category}
                      focus={event.focus}
                      difficulty_level={event.difficulty_level}
                      progressions={event.progressions}
                      description={event.description}
                      duration={event.duration}
                      isFavorite={isFavorite}
                      handleFavorite={handleFavorite}
                      ItemTypes={{ CARD: "card" }}
                    />
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
                      <span className="text-[#919EAB]">
                        {event.progressions}
                      </span>
                    </div>
                    <div className="text-[#0029F9]">
                      <button onClick={() => handleReafMore(event.id)}>
                        {readMore === event.id
                          ? "Read Less... "
                          : "Read More..."}
                      </button>
                      <br />
                      {readMore === event.id ? event.description : ""}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Practice;
