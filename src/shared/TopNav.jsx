import { Seach1 } from "@/assets/SidebarIcon";
import React, { useEffect, useRef, useState } from "react";
import notification from "../assets/imges/notification.png";
import Ellipse1 from "../assets/imges/Ellipse1.png";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
const notificationData = [
  {
    id: 1,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "2 second ago",
  },
  {
    id: 2,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "2 days ago",
  },
  {
    id: 3,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "6 hour ago",
  },
  {
    id: 4,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "5 second ago",
  },
  {
    id: 5,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "5 hours ago",
  },
  {
    id: 6,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "2 second ago",
  },
  {
    id: 7,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "3 days ago",
  },
  {
    id: 8,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "4 second ago",
  },
  {
    id: 9,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "2 minutes ago",
  },
  {
    id: 10,
    userProfile: "https://i.ibb.co.com/BH922QRG/profile.jpg",
    title: "New Property Alert!",
    duration: "8 second ago",
  },
];

const TopNav = () => {
  const [showNotification, setShowNotification] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickoutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNotification(false);
      }
    };

    document.addEventListener("mousedown", handleClickoutside);
    return () => {
      document.removeEventListener("mousedown", handleClickoutside);
    };
  }, []);

  return (
    <div className=" bg-white shadow">
      <div className="flex justify-between items-center h-[105px] px-6">
        <div className="flex relative">
          <input
            type="text"
            className="border border-[#F3F4F7] outline-none rounded-full py-[15px] px-[30px] w-[594px]"
            placeholder="Type to Search..."
          />
          <button
            type="button"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center pr-[20px]"
          >
            <Seach1 />
          </button>
        </div>
        <div className="flex items-center gap-4 pr-12">
          <div ref={dropdownRef}>
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="border border-[#F3F4F7] rounded-full p-[18px] hover:bg-[#010792] duration-300"
            >
              <img className="w-6" src={notification} alt="" />
            </button>

            <div
              className={`${
                showNotification ? "block" : "hidden"
              } fixed bg-slate-50 top-14 md:top-28 right-3 md:right-5 xl:right-40 max-h-[420px] w-[280px] md:w-[400px] p-5 rounded-lg drop-shadow-[0px_5px_10px_rgba(0,119,255,0.12)] overflow-y-scroll  custom-scrollbar z-[999]`}
            >
              <div className="flex justify-between mb-5">
                <h3 className="text-xl font-semibold text-headingTextColor">
                  Notifications
                </h3>
                <button
                  className=" hover:bg-blue-950 hover:text-white bg-gray-200 p-3 rounded-sm"
                  onClick={() => setShowNotification(!showNotification)}
                >
                  <RxCross1 />
                </button>
              </div>
              {notificationData.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center mb-5 gap-3"
                >
                  <figure className="w-9 h-9 rounded-full">
                    <img
                      src={notification.userProfile}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </figure>
                  <div className="">
                    <p className="font-medium">{notification.title}</p>
                    <span className="text-gray-400 text-sm">
                      {notification.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Link
              className="flex items-center gap-4 "
              to="/dashboard/dashboardHome/GeneralInformation"
            >
              <div>
                <img src={Ellipse1} className="w-[59px]" alt="" />
              </div>
              <div>
                <h2 className="text-[#919EAB] font-roboto text-[18px] font-medium leading-normal">
                  Jane Doe
                </h2>
                <p className="text-[#C4CDD5] font-roboto text-[14px] italic font-normal leading-normal">
                  Football Coach
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
