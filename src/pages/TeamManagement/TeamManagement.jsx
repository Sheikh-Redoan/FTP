import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
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
import TabPlayers from "@/components/TeamManagementCompoentes/PitchMastersComponentes/TabPlayers";
import AllCategories from "@/components/TeamManagementCompoentes/PitchMastersComponentes/AllCategories";
import AddPlayersSteps from "@/components/TeamManagementCompoentes/PitchMastersComponentes/AddPlayersSteps/AddPlayersSteps";
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
import CheckboxGroup from "@/components/TeamManagementCompoentes/PitchMastersComponentes/CheckboxGroup";

const TeamManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Team, 1 for Players

  const handleTabSelect = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className=" w-full">
      {/* Breadcrumb Section */}
      <div className="mb-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard/dashboardHome">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Team Management (Team)</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <hr className="text-gray-300 mb-6" />

      {/* Tabs Section */}
      <div>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <div className="flex items-center justify-between">
            <TabList className="flex gap-6   mb-[34px]">
              <Tab
                className="px-4 py-2 outline-none border-b-[3px] border-transparent 
               hover:border-blue-700 focus:outline-none cursor-pointer text-[#C4CDD5] text-[20px] font-medium duration-200"
                selectedClassName="!border-blue-900 !text-blue-900"
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

            {/*  Dialog Button */}
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
                      <div>
                        <div className="grid  items-center gap-2 mb-6">
                          <Label
                            htmlFor="name"
                            className="text-[#010792] font-roboto text-[18px] font-medium"
                          >
                            Team Name
                          </Label>
                          <input
                            type="text"
                            className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                            placeholder="Passing & Receiving"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="grid  items-center gap-2 mb-6">
                          <Label
                            htmlFor="name"
                            className="text-[#010792] font-roboto text-[18px] font-medium"
                          >
                            Age Range
                          </Label>
                          <input
                            type="number"
                            className=" bg-[#F3F4F7] rounded-md outline-none p-5"
                            placeholder="12 - 16"
                          />
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
                      <div>
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
            <AllCategories />
          </TabPanel>
          <TabPanel>
            <TabPlayers />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamManagement;
