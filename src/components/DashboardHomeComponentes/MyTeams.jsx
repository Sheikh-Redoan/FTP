import React, { useEffect, useState } from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrTask } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { PiCalendarDots } from "react-icons/pi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CheckboxGroup from "../TeamManagementCompoentes/PitchMastersComponentes/CheckboxGroup";
import DatePickerDemo from "../TeamManagementCompoentes/PitchMastersComponentes/DatePicker";

const MyTeams = ({
  height = "h-[335px]",
  showNotes = false,
  useGrid = false,
  background = "bg-[#E6E6F4]",
  hover = "hover:bg-white/50"
}) => {
  const [myTeams, setMyTeams] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newNotes, setNewNotes] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetch("/Api/myTeams.json")
      .then((res) => res.json())
      .then((data) => {
        setMyTeams(data);
        if (data.length > 0) {
          setSelectedEvent(data[0]);
        }
      });
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handelAddNotes = () => {
    if (newNotes.trim()) {
      setSelectedEvent((prevSelectedEvent) => {
        return {
          ...prevSelectedEvent,
          Notes: [...prevSelectedEvent.Notes, newNotes],
        };
      });
      setShowButton(false);
      setNewNotes("");
    }
  };

  const handleFocus = () => {
    setShowButton(true);
  };

  return (
    <div >
      <div
        className={`${background} p-4 rounded-[16px]`}
      >
        <ScrollArea className={`${height}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg text-[#000342] font-medium leading-none">
                Team Call-Up
              </h4>

              <div>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="flex items-center gap-2 hover:bg-transparent hover:border-[#010792] hover:text-[#010792] duration-300 py-[10px] px-[35px] border rounded-full text-white bg-[#010792]"
                >
                  <FiPlus /> Add
                </button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-[32px] text-[#000342]">
                        Team Call-Up
                      </DialogTitle>
                      <hr className="text-gray-200" />
                    </DialogHeader>
                    <div>
                      <Label
                        htmlFor="name"
                        className="text-[#010792] font-roboto text-[20px] font-medium"
                      >
                        GameDay
                      </Label>
                    </div>
                    {/* -------- */}
                    <div className="flex justify-between  gap-5">
                      <div className="grid w-full items-center ">
                        <Label
                          htmlFor="name"
                          className="text-[#010792] font-roboto w-full text-[18px] font-medium"
                        >
                          Date
                        </Label>
                        <DatePickerDemo className="border-none bg-[#F3F4F7] rounded-md outline-none p-5" />
                      </div>
                      <div className="grid w-full items-center  ">
                        <Label
                          htmlFor="name"
                          className="text-[#010792] font-roboto text-[18px] font-medium"
                        >
                          Time
                        </Label>
                        <input
                          type="time"
                          className=" bg-[#F3F4F7] rounded-md outline-none p-4"
                          placeholder="Passing & Receiving"
                        />
                      </div>
                    </div>
                    {/* ---------- */}

                    <div className="grid  items-center  ">
                      <Label
                        htmlFor="name"
                        className="text-[#010792] font-roboto text-[18px] font-medium"
                      >
                        Location
                      </Label>
                      <input
                        type="text"
                        className=" bg-[#F3F4F7] rounded-md outline-none p-4"
                        placeholder="Enter Location"
                      />
                    </div>

                    <div>
                      <div className="grid  items-center  mb-6">
                        <Label
                          htmlFor="name"
                          className="text-[#010792] font-roboto text-[18px] font-medium"
                        >
                          Opponent
                        </Label>
                        <input
                          type="text"
                          className=" bg-[#F3F4F7] rounded-md outline-none p-4"
                          placeholder="Tactical Touch"
                        />
                      </div>
                      <div className="grid  items-center gap-2 mb-6">
                        <Label
                          htmlFor="name"
                          className="text-[#010792] font-roboto text-[18px] font-medium"
                        >
                          Notes/Game Plan
                        </Label>
                        <textarea
                          type="TextArea"
                          className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                          placeholder="Write Here"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label
                          htmlFor="username"
                          className="text-[#010792] font-roboto text-[18px] font-medium underline"
                        >
                          Select here and Add Player*
                        </Label>
                        <CheckboxGroup />
                      </div>
                    </div>
                    <DialogFooter className="flex items-center">
                      <button
                        className="w-full py-[10px] border hover:bg-white hover:text-[#010792] hover:border-[#010792] bg-[#010792] text-white rounded-full font-medium hover:font-medium duration-200"
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Save
                      </button>
                      <button className="w-full py-[10px] border hover:bg-white hover:text-[#010792] hover:border-[#010792] bg-[#010792] text-white rounded-full font-medium hover:font-medium duration-200">
                        Create PDF
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {/* Table Section */}
            <Table>
              <TableHeader>
                <TableRow className="border-t border-b border-gray-300 text-[#000342] text-[16px]">
                  <TableHead>
                    <div className="flex items-center gap-1 py-6">
                      <GrTask />
                      <span className="mt-[2px]">Name</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 py-6">
                      <PiCalendarDots size={18} />
                      <span className="mt-[2px]">Date</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 py-6">
                      <MdAccessTime size={18} />
                      <span className="mt-[2px]">Time</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1 py-6">
                      <HiOutlineLocationMarker size={18} />
                      <span className="mt-[2px]">Location</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex justify-end items-center gap-1 py-6">
                      <HiOutlineUserGroup size={20} />
                      <span className="mt-[2px]">Player</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {myTeams.map((event, index) => (
                  <TableRow
                    key={index}
                    className={` ${hover} border-b border-gray-300 cursor-pointer `}
                    onClick={() => handleSelectEvent(event)} // Add the click handler to update the selected event
                  >
                    <TableCell className="text-[#010792] font-roboto text-[16px] font-medium py-6">
                      {event.Name}
                    </TableCell>
                    <TableCell className="text-[#919EAB] font-roboto text-[14px] py-6">
                      {event.Date}
                    </TableCell>
                    <TableCell className="text-[#919EAB] font-roboto text-[14px] py-6">
                      {event.Time}
                    </TableCell>
                    <TableCell className="text-[#919EAB] font-roboto text-[14px] py-6">
                      {event.Location}
                    </TableCell>
                    <TableCell className="text-[#919EAB] font-roboto text-center text-[14px] font-medium py-6">
                      {event.Player}
                    </TableCell>
                    <TableHead className="text-right text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                      <BsThreeDotsVertical />
                    </TableHead>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </div>

      {/* Notes Section */}
      {showNotes && (
        <div className="col-span-1 bg-white rounded-[16px]">
          <ScrollArea className="h-[335px]">
            <div className="w-full max-w-2xl mx-auto p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#000342]">
                Notes
              </h2>
              <textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                onFocus={handleFocus}
                placeholder="Write your note here..."
                className="w-full h-20 p-4 border border-1 border-gray-300 rounded-lg "
              />

              {showButton && (
                <div className="flex justify-end">
                  <button
                    onClick={handelAddNotes}
                    className="p-2 bg-cyan-500 text-white rounded-md"
                  >
                    Add Notes
                  </button>
                </div>
              )}

              {selectedEvent && selectedEvent.Notes && (
                <div className="text-[#919EAB] font-roboto text-[14px] ">
                  <ul>
                    {selectedEvent.Notes.map((note, i) => (
                      <p key={i} className="py-4 border-b border-gray-100">
                        {note}
                      </p>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default MyTeams;
