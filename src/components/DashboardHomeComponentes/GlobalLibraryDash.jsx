import { Duratio1 } from "@/assets/SidebarIcon";
import React, { useEffect, useState } from "react";
import { GoHeartFill } from "react-icons/go";

const GlobalLibraryDash = () => {
  const [practice, setPractice] = useState([]);
  const [readMore, setReadMore] = useState(null);
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
    <div className="w-full">
      <div className="bg-[#E6E6F4] p-6 rounded-lg mt-6">
        <h2 className="mb-4 text-lg text-[#000342] font-medium leading-none">
          Global Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {practice &&
            practice.slice(0, 4).map((event, index) => (
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
                  <span className="text-[#3BB515] font-bold">Public</span>
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

export default GlobalLibraryDash;
