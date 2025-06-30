import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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

import { SlCamera } from "react-icons/sl";

import TeamTabs from "./TeamTabs";
import CheckboxGroup from "./CheckboxGroup";
import TabPlayers from "./TabPlayers";
import AddPlayersSteps from "./AddPlayersSteps/AddPlayersSteps";

const PitchMasters = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); 

  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className="min-h-screen w-full">
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
                <Link to="/dashboard/team-management">
                  Team Management (Team)
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pitch Masters (U 12)</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <hr className="text-gray-300 my-6" />

      {/* Tabs Section */}
      <div>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <div className="flex items-center justify-between mb-10">
            <TabList className="flex gap-6">
              <Tab
                className="px-4 py-2 outline-none border-b-[3px] border-transparent 
                       hover:border-blue-700 focus:outline-none cursor-pointer text-[#C4CDD5] text-[20px] font-medium duration-200"
                selectedClassName="!border-blue-900 !text-blue-900 "
              >
                Team
              </Tab>
              <Tab
                className="px-4 py-2 outline-none border-b-[3px] border-transparent 
                       hover:border-blue-700 focus:outline-none cursor-pointer text-[#C4CDD5] text-[20px] font-medium duration-200"
                selectedClassName="!border-blue-900 !text-blue-900"
              >
                Players
              </Tab>
            </TabList>

            {selectedTab === 0 && (
              <div className="flex items-center justify-center gap-4">
                <div className="flex py-[10px] px-[35px] bg-white gap-2 rounded-full">
                  <span className="text-[#010792] font-roboto text-[35.455px] font-medium leading-normal">
                    24
                  </span>
                  <h1 className="text-[#919EAB]">
                    Total <br /> Member
                  </h1>
                </div>
                <div className="flex py-[10px] px-[35px] bg-white gap-2 rounded-full">
                  <span className="text-[#010792] font-roboto text-[35.455px] font-medium leading-normal">
                    25
                  </span>
                  <h1 className="text-[#919EAB]">
                    Training <br /> Sessions
                  </h1>
                </div>
                <div className="flex py-[10px] px-[35px] bg-white gap-2 rounded-full">
                  <span className="text-[#010792] font-roboto text-[35.455px] font-medium leading-normal">
                    300
                  </span>
                  <h1 className="text-[#919EAB]">
                    Total <br /> Attendance
                  </h1>
                </div>
                <div className="flex py-[10px] px-[35px] bg-white gap-2 rounded-full">
                  <span className="text-[#010792] font-roboto text-[35.455px] font-medium leading-normal">
                    80%
                  </span>
                  <h1 className="text-[#919EAB]">
                    Attendance <br /> Rate
                  </h1>
                </div>
              </div>
            )}

            {/* ---- */}
            {selectedTab === 0 ? (
              <div>
                <Button
                  className={
                    "py-[10px] px-[35px] rounded-full border-[#010792] font-medium text-lg text-[#010792] hover:bg-[#010792] hover:text-white duration-300"
                  }
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <AiOutlinePlus />
                  Create a New Category
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className=" max-w-[688px] min-h-[509px]">
                    <DialogHeader>
                      <DialogTitle className="text-[32px] text-[#000342] ">
                        Create a New Category
                      </DialogTitle>
                      <hr className="text-gray-200" />
                    </DialogHeader>
                    <div>
                      <div className="flex items-center  gap-2 mb-4">
                        <label
                          htmlFor="category"
                          className=" text-[#010792] font-roboto text-[18px] font-medium"
                        >
                          Category:
                        </label>
                        <Select>
                          <SelectTrigger className="w-full bg-[#F3F4F7] rounded-md outline-none p-6 border-none text-base text-[#919EAB] ">
                            <SelectValue
                              className="text-base text-gray-300"
                              placeholder="Select a team"
                            />
                          </SelectTrigger>
                          <SelectContent className="bg-white cursor-pointer">
                            <SelectGroup>
                              <SelectLabel>Pick the team</SelectLabel>
                              <SelectItem
                                className="focus:bg-blue-500"
                                value="U 12"
                              >
                                U 12
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-blue-500"
                                value="+12"
                              >
                                +12
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-blue-500"
                                value="+15"
                              >
                                +15
                              </SelectItem>
                              <SelectItem
                                className="focus:bg-blue-500"
                                value="+18"
                              >
                                +18
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      {/* add Photo */}
                      <div className="mb-4">
                        <Label
                          htmlFor="name"
                          className="text-[#010792] font-roboto text-[18px] font-medium"
                        >
                          Team Photo*
                        </Label>
                        <label
                          htmlFor="fileUpload"
                          className="object-cover w-full h-full"
                        >
                          <div className="border dorder-[#010792] custom-border border-dashed object-cover w-full h-full p-5 cursor-pointer rounded flex flex-col  text-center items-center justify-center">
                            <SlCamera size={38} className="text-[#010792]" />
                            <p className="text-lg text-[#C4CDD5] ">
                              Add your photo
                            </p>
                            <p className="text-sm text-[#C4CDD5] ">
                              (less than 2MB)
                            </p>
                          </div>
                        </label>
                        <input
                          id="fileUpload"
                          type="file"
                          className="hidden"
                          onChange={(e) => setUploadedFile(e.target.files[0])}
                        />
                      </div>
                      <div>
                        <div className="grid  items-center gap-2 mb-6">
                          <Label
                            htmlFor="name"
                            className="text-[#010792] font-roboto text-[18px] font-medium"
                          >
                            Team Name*
                          </Label>
                          <input
                            type="text"
                            className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                            placeholder="Enter your team name"
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
                      <button
                        className="w-full py-[10px] bg-[#010792] text-white rounded-full mt-4"
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Save
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div>
                <Button
                  className={
                    "bg-[#3BB515] py-[10px] px-[35px] rounded-full border-[#3BB515] font-medium text-lg text-white hover:text-[#3BB515] duration-300"
                  }
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <AiOutlinePlus />
                  Add Player
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className=" max-w-[688px] ">
                    <DialogHeader>
                      <DialogTitle className="text-[32px] text-[#000342] ">
                        Add Player
                      </DialogTitle>
                      <hr className="text-gray-200" />
                    </DialogHeader>
                    <div>
                      <div className="">
                        <AddPlayersSteps setIsDialogOpen={setIsDialogOpen} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>

          {/* Tab Panels */}
          <TabPanel>
            <div>
              <TeamTabs />
            </div>
          </TabPanel>
          <TabPanel>
            <TabPlayers />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PitchMasters;
