import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Basic = ({ children }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <form>
        {/* 1 */}
        <div className="flex items-center mb-6 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              First Name*
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter first name"
              {...register("FirstName", { required: true })}
            />
            {errors.FirstName && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Last Name*
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter last name"
              {...register("LastName", { required: true })}
            />
            {errors.LastName && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 2 */}
        <div className="flex items-center mb-6 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Uniform
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter Uniform Number"
              type="number"
              {...register("Uniform", { required: true })}
            />
            {errors.Uniform && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Position
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter player position"
              {...register("Position", { required: true })}
            />
            {errors.Position && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 3 */}
        <div className="flex items-center mb-6 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">Footed</label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter footed"
              {...register("Footed", { required: true })}
            />
            {errors.Footed && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">Team</label>
            <Controller
              control={control}
              name="Team"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-full bg-[#F3F4F7] rounded-md outline-none py-[34px] border-none text-base text-[#919EAB]">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer">
                    <SelectGroup>
                      <SelectLabel>Pick the team</SelectLabel>
                      <SelectItem value="U 12">U 12</SelectItem>
                      <SelectItem value="+12">+12</SelectItem>
                      <SelectItem value="+15">+15</SelectItem>
                      <SelectItem value="+18">+18</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.Team && (
              <span className="text-red-500 text-sm mt-1">
                Type of Team Name is required
              </span>
            )}
          </div>
        </div>

        {/* 4 */}
        <div className="flex items-center mb-6 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Total team trainings
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter total team trainings"
              type="number"
              {...register("trainings", { required: true })}
            />
            {errors.trainings && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Player training participation
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px] px-2 outline-none w-full"
              placeholder="Enter player training participation"
              {...register("participation", { required: true })}
            />
            {errors.participation && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>
        {children}
      </form>
    </div>
  );
};

export default Basic;
