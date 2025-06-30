import React from "react";
import { useFormContext } from "react-hook-form";

const Personal = ({ children }) => {
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
            <label className="text-lg text-[#010792] font-medium">
              Birthday
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter player birthday"
              {...register("Birthday", { required: true })}
            />
            {errors.Birthday && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 3 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">Email</label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter email address"
              type="email"
              {...register("Email", { required: true })}
            />
            {errors.Email && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter phone number"
              {...register("PhoneNumber", { required: true })}
            />
            {errors.PhoneNumber && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>

        {/* 4 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">Street</label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter street"
              {...register("Street", { required: true })}
            />
            {errors.Street && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">
              Postal Code
            </label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter postal code"
              type="number"
              {...register("PostalCode", { required: true })}
            />
            {errors.PostalCode && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>
        {/* 4 */}
        <div className="flex items-center mb-4 gap-6">
          <div className="grid w-full">
            <label className="text-lg text-[#010792] font-medium">City</label>
            <input
              className="bg-[#F3F4F7] text-lg rounded-[10px] py-[16px] px-2 outline-none w-full"
              placeholder="Enter City"
              {...register("City", { required: true })}
            />
            {errors.City && (
              <span className="text-red-500 mt-1">This field is required</span>
            )}
          </div>
        </div>
        {children}
      </form>
    </div>
  );
};

export default Personal;
