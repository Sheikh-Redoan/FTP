import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CiUser } from "react-icons/ci";
import { BsCopy } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GrTask } from "react-icons/gr";
import { PiCalendarDots } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
import { HiOutlineLocationMarker, HiOutlineUserGroup } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Birthday1,
  City1,
  Copy1,
  Edit1,
  Email1,
  Footed1,
  Name1,
  Participation1,
  Phone1,
  Position1,
  PostalCode1,
  Street1,
  Trainings1,
  Trash1,
  Uniform1,
  Pace1,
  Shooting1,
  Dribbling1,
  Passing1,
  Defending1,
  Physical1,
} from "@/assets/SidebarIcon";
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

const TabPlayers = () => {
  const [tabPlayers, setTabPlayers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [category2, setCategory2] = useState("Basic");

  useEffect(() => {
    fetch("/Api/players.json")
      .then((res) => res.json())
      .then((data) => {
        setTabPlayers(data);
      });
  }, []);

  // Icon mapping for headers
  const headerIcons = {
    Basic: [
      <Name1 />,
      <Uniform1 />,
      <Position1 />,
      <Footed1 />,
      <Trainings1 />,
      <Participation1 />,
    ],
    Personal: [
      <Name1 />,
      <Uniform1 />,
      <Birthday1 />,
      <Email1 />,
      <Phone1 />,
      <Street1 />,
      <PostalCode1 />,
      <City1 />,
    ],
    "Player Skills": [
      <Name1 />,
      <Uniform1 />,
      <Pace1 />,
      <Shooting1 />,
      <Dribbling1 />,
      <Passing1 />,
      <Defending1 />,
      <Physical1 />,
    ],
  };

  return (
    <div className="bg-white p-4 rounded-[16px]">
      <ScrollArea className="">
        <div className="p-4">
          <div className="flex items-center mb-6 justify-between">
            <h4 className="text-lg text-[#000342] font-medium leading-none">
              Filter:
            </h4>
            <div className="flex gap-14 items-center">
              {/* Team Filter */}
              <div className="flex gap-2 items-center ">
                <label
                  className="text-lg text-[#000342] font-medium leading-none"
                  htmlFor=""
                >
                  Team:
                </label>
                <div className="border border-[#F3F4F7] rounded-full outline-none ">
                  <Select>
                    <SelectTrigger className="outline-none py-[10px] px-[35px] gap-4  text-base rounded-full text-[#919EAB] border-none">
                      <SelectValue
                        className="text-base text-gray-300"
                        placeholder="Pick the team"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer">
                      <SelectGroup>
                        <SelectLabel>Pick the team</SelectLabel>
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

              {/* Status Filter */}
              <div className="flex gap-2 items-center">
                <label
                  className="text-lg text-[#000342] font-medium leading-none"
                  htmlFor=""
                >
                  Status:
                </label>
                <div className="flex items-center px-4  py-[7px]  border border-[#F3F4F7] rounded-full outline-none ">
                  <Select>
                    <SelectTrigger className="outline-none border-none gap-4  text-base rounded-full text-[#919EAB] ">
                      <SelectValue
                        className="text-base text-gray-300"
                        placeholder="Pick the team"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer">
                      <SelectGroup>
                        <SelectLabel>Pick the Active</SelectLabel>
                        <SelectItem
                          className="focus:bg-blue-500  focus:text-white"
                          value="U 12"
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-blue-500 focus:text-white"
                          value="+12"
                        >
                          Deactive
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <div>
                    <p className="text-lg text-[#010792] font-medium leading-none flex items-center gap-2">
                      <span className="text-gray-200"> | </span>Total:
                      {tabPlayers.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Filter */}
              <div className="flex gap-2 items-center">
                <label
                  className="text-lg text-[#000342] font-medium leading-none"
                  htmlFor=""
                >
                  Information:
                </label>

                <div className="border border-[#F3F4F7] rounded-full outline-none ">
                  <Select value={category2} onValueChange={setCategory2}>
                    <SelectTrigger className="outline-none py-[10px] px-[35px] gap-4  text-base rounded-full text-[#919EAB] border-none">
                      <SelectValue
                        className="text-base text-gray-300"
                        placeholder="Pick the team"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer">
                      <SelectGroup>
                        <SelectLabel>Pick the team</SelectLabel>
                        <SelectItem
                          className="focus:bg-blue-500  focus:text-white"
                          value="Basic"
                        >
                          Basic
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-blue-500 focus:text-white"
                          value="Personal"
                        >
                          Personal
                        </SelectItem>
                        <SelectItem
                          className="focus:bg-blue-500 focus:text-white"
                          value="Player Skills"
                        >
                          Player Skills
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-t border-b border-gray-100 text-[#000342] text-lg">
                {tabPlayers.length > 0 &&
                  tabPlayers[0][category2]?.TableHead.map((header, index) => (
                    <TableHead key={index}>
                      <div className="flex items-center gap-1">
                        {headerIcons[category2][index]}
                        <span className="mt-[2px] py-4">{header}</span>
                      </div>
                    </TableHead>
                  ))}
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tabPlayers.map((event, index) => (
                <TableRow
                  key={index}
                  className={`hover:bg-gray-200 border-b border-gray-100 cursor-pointer ${
                    selectedEvent?.title === event.title ? "" : ""
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  {event[category2]?.TableCell.map((cell, idx) => (
                    <TableCell
                      key={idx}
                      className={`font-roboto text-[18px] py-6 ${
                        idx === 0
                          ? "text-[#010792] font-medium"
                          : "text-[#919EAB]"
                      }`} // Change color for the first column (Name)
                    >
                      {cell}
                    </TableCell>
                  ))}
                  <TableHead className="text-right font-roboto text-[14px] font-medium py-6">
                    <div className="flex gap-5 text-gray-300">
                      <div className="hover:text-[#000342]">
                        <BsCopy size={20} />
                      </div>
                      <div className="hover:text-[#000342]">
                        <Link to="/dashboard/team-management/Edit">
                          <CiEdit size={24} />
                        </Link>
                      </div>
                      <div className="hover:text-[#000342]">
                        <GoTrash size={20} />
                      </div>
                    </div>
                  </TableHead>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default TabPlayers;
