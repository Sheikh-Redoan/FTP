import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import Basic from "./AddPlayersSteps/from/Basic";
import { FormProvider, useForm } from "react-hook-form";
import Personal from "./AddPlayersSteps/from/Personal";
import PlayerSkills from "./AddPlayersSteps/from/PlayerSkills";

const Edit = () => {
  const Basicmethods = useForm();
  const Personalmethods = useForm();
  const Playermethods = useForm();

  const handleBasic = (data) => {
    console.log("Form Basic", data);
  };
  const handlePersonal = (data) => {
    console.log("Form Personal", data);
  };
  const handlePlayers = (data) => {
    console.log("Form Plyers", data);
  };

  return (
    <div className="min-h-screen w-full">
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
              <BreadcrumbLink asChild>
                <Link to="/dashboard/team-management">
                  Team Management (Team)
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <hr className="text-gray-300" />

      <FormProvider {...Basicmethods}>
        <div className="bg-white p-6 mt-8 rounded-[16px]">
          <h1 className="text-[32px] text-[#010792] italic mb-4">
            Basic Information
          </h1>
          <Basic>
            <div className="flex justify-end">
              <button
                className="bg-[#010792] text-white px-[36px] w-[295px] py-[10px] rounded-full "
                type="submit"
                onClick={Basicmethods.handleSubmit(handleBasic)}
              >
                Save
              </button>
            </div>
          </Basic>
        </div>
      </FormProvider>

      <FormProvider {...Personalmethods}>
        <div className="bg-white p-6 mt-8 rounded-[16px]">
          <h1 className="text-[32px] text-[#010792] italic mb-4">
            Personal Information
          </h1>
          <Personal>
            <div className="flex justify-end">
              <button
                className="bg-[#010792] text-white px-[36px] w-[295px] py-[10px] rounded-full "
                type="submit"
                onClick={Personalmethods.handleSubmit(handlePersonal)}
              >
                Save
              </button>
            </div>
          </Personal>
        </div>
      </FormProvider>

      <FormProvider {...Playermethods}>
        <div className="bg-white p-6 mt-8 rounded-[16px]">
          <h1 className="text-[32px] text-[#010792] italic mb-4">
            Player skills Information
          </h1>
          <PlayerSkills>
            <div className="flex justify-end">
              <button
                className="bg-[#010792] text-white px-[36px] w-[295px] py-[10px] rounded-full "
                type="submit"
                onClick={Playermethods.handleSubmit(handlePlayers)}
              >
                Save
              </button>
            </div>
          </PlayerSkills>
        </div>
      </FormProvider>
    </div>
  );
};

export default Edit;
