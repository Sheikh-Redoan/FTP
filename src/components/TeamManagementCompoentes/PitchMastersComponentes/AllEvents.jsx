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
import CheckboxGroup from "./CheckboxGroup";
import DatePickerDemo from "./DatePicker";
import MyTeams from "@/components/DashboardHomeComponentes/MyTeams";

const AllEvents = ({ date }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newNotes, setNewNotes] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    fetch("/Api/allEvents.json")
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data);
        if (data.length > 0) {
          setSelectedEvent(data[0]);
        }
      });
  }, []);

  const handelAddNotes = () => {
    if (newNotes.trim()) {
      setSelectedEvent((prevSelectedEvent) => {
        return {
          ...prevSelectedEvent,
          notes: [...prevSelectedEvent.notes, newNotes],
        };
      });
      setNewNotes("");
      setShowButton(false);
    }
  };

  const handleFocus = () => {
    setShowButton(true);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <MyTeams
            height="h-[375px]"
            background={"bg-white"}
            hover={"hover:bg-gray-200"}
          />
        </div>
        <div className="bg-white rounded-[16px]">
          <div className=" p-4">
            <ScrollArea className="h-[375px]">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg text-[#000342] font-medium leading-none">
                      All Events
                    </h4>
                  </div>

                  <div>
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="flex items-center gap-2 hover:bg-transparent hover:border-[#010792] hover:text-[#010792] duration-300 py-[10px] px-[35px] border rounded-full text-white bg-[#010792]"
                    >
                      <FiPlus /> Add Event
                    </button>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogContent className="">
                        <DialogHeader>
                          <DialogTitle className="text-[32px] text-[#000342] mb-6">
                            Add Event
                          </DialogTitle>
                          <hr className="text-gray-200" />
                        </DialogHeader>
                        <div className="grid  items-center gap-2 mb-6">
                          <Label
                            htmlFor="name"
                            className="text-[#010792] font-roboto text-[18px] font-medium"
                          >
                            Event Name
                          </Label>
                          <input
                            type="text"
                            className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                            placeholder="Passing & Receiving"
                          />
                        </div>

                        {/* -------- */}
                        <div className="flex justify-between  gap-5">
                          <div className="grid w-full items-center gap-2 mb-6">
                            <Label
                              htmlFor="name"
                              className="text-[#010792] font-roboto w-full text-[18px] font-medium"
                            >
                              Date
                            </Label>

                            <DatePickerDemo className="border-none bg-[#F3F4F7] rounded-md outline-none p-5" />
                          </div>
                          <div className="grid w-full items-center gap-2 mb-6">
                            <Label
                              htmlFor="name"
                              className="text-[#010792] font-roboto text-[18px] font-medium"
                            >
                              Time
                            </Label>
                            <input
                              type="time"
                              className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                              placeholder="Passing & Receiving"
                            />
                          </div>
                        </div>
                        {/* ---------- */}

                        <div>
                          <div className="grid  items-center gap-2 mb-6">
                            <Label
                              htmlFor="name"
                              className="text-[#010792] font-roboto text-[18px] font-medium"
                            >
                              Location
                            </Label>
                            <input
                              type="text"
                              className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                              placeholder="Enter your Location"
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
                        <DialogFooter>
                          <button
                            className="w-full py-[10px] bg-[#010792] text-white rounded-full"
                            type="button"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Save
                          </button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                {/* table */}
                <Table>
                  <TableHeader>
                    <TableRow className="border-t border-b border-gray-100 text-[#000342]">
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <GrTask />
                          <span className="mt-[2px]">Name</span>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <PiCalendarDots size={18} />
                          <span className="mt-[2px]">Date</span>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <MdAccessTime size={18} />
                          <span className="mt-[2px]">Time</span>
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <HiOutlineLocationMarker size={18} />
                          <span className="mt-[2px]">Location</span>
                        </div>
                      </TableHead>
                      <TableHead className="text-center">
                        <div className="flex justify-end items-center gap-1">
                          <HiOutlineUserGroup size={20} />
                          <span className="mt-[2px]">Player</span>
                        </div>
                      </TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {date
                      ? allEvents
                          .filter((data) => {
                            return date === data.date;
                          })
                          .map((event, index) => (
                            <TableRow
                              key={index}
                              className={`hover:bg-gray-200 border-b border-gray-100 cursor-pointer ${
                                selectedEvent?.title === event.title
                                  ? "bg-[#F3F4F7]"
                                  : ""
                              }`}
                              onClick={() => setSelectedEvent(event)}
                            >
                              <TableCell className="text-[#010792] font-roboto text-[14px] font-medium py-6">
                                {event.title}
                              </TableCell>
                              <TableCell className="text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                                {event.date}
                              </TableCell>
                              <TableCell className="text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                                {event.time}
                              </TableCell>
                              <TableCell className="text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                                {event.location}
                              </TableCell>
                              <TableCell className=" text-[#919EAB] font-roboto text-center text-[14px] font-medium py-6">
                                {event.player}
                              </TableCell>
                              <TableHead className="text-right text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                                <BsThreeDotsVertical />
                              </TableHead>
                            </TableRow>
                          ))
                      : allEvents.map((event, index) => (
                          <TableRow
                            key={index}
                            className={`hover:bg-gray-200 border-b border-gray-100 cursor-pointer ${
                              selectedEvent?.title === event.title
                                ? "bg-[#F3F4F7]"
                                : ""
                            }`}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <TableCell className="text-[#010792] font-roboto text-[14px] font-medium py-6">
                              {event.title}
                            </TableCell>
                            <TableCell className="text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                              {event.date}
                            </TableCell>
                            <TableCell className="text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                              {event.time}
                            </TableCell>
                            <TableCell className="text-[#919EAB] font-roboto text-[14px] font-medium py-6">
                              {event.location}
                            </TableCell>
                            <TableCell className=" text-[#919EAB] font-roboto text-center text-[14px] font-medium py-6">
                              {event.player}
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
        </div>

        {/* Notes Section */}
        <div className=" bg-[#E6E6F4] rounded-[16px]">
          <ScrollArea className="h-[375px]">
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

              {selectedEvent && (
                <div className="text-[#919EAB] font-roboto text-[14px] ">
                  <ul>
                    {selectedEvent.notes.map((note, i) => (
                      <p key={i} className="py-4 border-b border-gray-300">
                        {note}
                      </p>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
