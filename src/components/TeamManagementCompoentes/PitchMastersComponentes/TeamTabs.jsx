import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import pitchMasters from "../../../assets/imges/PitchMasters.png";
import AllEvents from "./AllEvents";
import MyTeams from "@/components/DashboardHomeComponentes/MyTeams";
import moment from "moment";
import { PitchCalendar } from "./PitchCalendar";
import { FiPlus } from "react-icons/fi";

const teams = [
  {
    name: "Pitch Masters (U 12)",
    image: pitchMasters,
    members: 65,
    sessions: 25,
    attendance: 300,
    rate: "85%",
  },
  {
    name: "Strategic Kicks",
    image: pitchMasters,
    members: 50,
    sessions: 18,
    attendance: 240,
    rate: "78%",
  },
  {
    name: "Tactical Touch",
    image: pitchMasters,
    members: 72,
    sessions: 30,
    attendance: 320,
    rate: "88%",
  },
  {
    name: "Coach’s Playbook",
    image: pitchMasters,
    members: 55,
    sessions: 22,
    attendance: 260,
    rate: "82%",
  },
  {
    name: "Field Innovators",
    image: pitchMasters,
    members: 60,
    sessions: 20,
    attendance: 280,
    rate: "80%",
  },
];

const TeamTabs = () => {
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [date, setDate] = useState(null);
  console.log(date);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 ">
      <div className="rounded-[16px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[335px]">
          {/* Main Content */}
          <div className="bg-white p-6 col-span-2  rounded-[16px]">
            <div className="relative">
              <button
                className="mb-6 text-xl font-medium text-[#000342] flex justify-between items-center w-full  px-4 rounded-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Team Name: {selectedTeam.name}
                <IoIosArrowDown size={24} className="text-gray-500" />
              </button>

              {dropdownOpen && (
                <ul className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-md w-full z-10">
                  {teams.map((team, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleSelectTeam(team)}
                    >
                      {team.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid  gap-5">
              <div className=" bg-[#F3F4F7] rounded-[8px]">
                <img
                  className="w-[700px] mx-auto object-cover object-top h-[325px]"
                  src={selectedTeam.image}
                  alt={selectedTeam.name}
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className=" bg-white flex flex-col items-center rounded-[16px]">
            <PitchCalendar
              mode="single"
              selected={date}
              onSelect={(e) => {
                setDate(moment(e).format("DD MMM, YYYY"));
              }}
            />
            <div>
              <button className="flex justify-center items-center gap-2 hover:bg-transparent hover:border-[#010792] hover:text-[#010792] duration-300 py-[10px] px-[35px] border rounded-full text-white bg-[#010792] w-[335px]">
                <FiPlus /> Create PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AllEvents Section */}
      <div>
        <AllEvents date={date} />
      </div>
    </div>
  );
};

export default TeamTabs;
