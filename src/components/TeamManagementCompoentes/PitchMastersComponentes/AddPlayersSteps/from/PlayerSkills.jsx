import React from "react";
import { useFormContext } from "react-hook-form";

const PlayerSkills = ({ children }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <form>
        {/* 1 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              First Name*
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
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
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter last name"
              {...register("LastName", { required: true })}
            />
            {errors.LastName && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 2 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Uniform
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter Uniform Number"
              type="number"
              {...register("Uniform", { required: true })}
            />
            {errors.Uniform && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">Pace</label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter marks out of 10"
              type="number"
              {...register("Pace", { required: true })}
            />
            {errors.Pace && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 3 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Shooting
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter marks out of 10"
              type="number"
              {...register("Shooting", { required: true })}
            />
            {errors.Shooting && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Dribbling
            </label>
            <input
              type="number"
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter marks out of 10"
              {...register("Dribbling", { required: true })}
            />
            {errors.Dribbling && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 4 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Passing
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter marks out of 10"
              type="number"
              {...register("Passing", { required: true })}
            />
            {errors.Passing && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Defending
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter marks out of 10"
              type="number"
              {...register("Defending", { required: true })}
            />
            {errors.Defending && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>
        {/* 4 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">Physical</label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter marks out of 10"
              type="number"
              {...register("Physical", { required: true })}
            />
            {errors.Physical && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>
        {children}
      </form>
    </div>
  );
};

export default PlayerSkills;
