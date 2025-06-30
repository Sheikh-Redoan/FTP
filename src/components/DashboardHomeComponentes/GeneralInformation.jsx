import React, { useRef, useState } from "react";
import profile from "../../assets/imges/Ellipse2.png";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  City2,
  Country1,
  Eidt2,
  EyeOffIcon1,
  EyeOpenIcon1,
  LockIcon1,
  MailIcon1,
  Tel1,
  User1,
} from "@/assets/Svgs";
import { Edit1 } from "@/assets/SidebarIcon";
import { Label } from "../ui/label";
import { FaStarOfLife } from "react-icons/fa";

const GeneralInformation = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChangeCilik = () => {
    inputRef.current.click();
  };

  const handleChnageImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4  ">
          <div className="flex flex-col gap-4 justify-center items-center p-10 bg-white mb-6 rounded-[16px]">
            {image ? (
              <img
                className="w-[300px] h-[300px] object-cover rounded-[50%] border border-gray-300"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : (
              <img
                className="w-[300px] h-[300px] object-cover rounded-[50%] border border-gray-300"
                src={profile}
                alt=""
              />
            )}
            <button
              className="text-[#010792] underline text-lg font-medium"
              onClick={handleChangeCilik}
            >
              Upload a new photo
            </button>
            <input
              ref={inputRef}
              type="file"
              onChange={handleChnageImage}
              className="hidden"
            />
          </div>
          <div className="flex justify-center items-center">
            <button className="text-[#FF4842] text-lg font-medium border border-[#FF4842] py-[10px] px-[35px] rounded-full hover:bg-[#FF4842] hover:text-white duration-300">
              Delete Account
            </button>
          </div>
        </div>

        {/* --------- */}
        <div className="col-span-8  h-full flex flex-col gap-5">
          <div className="bg-white p-10 rounded-[16px]">
            <h1 className="text-[32px] text-[#010792] italic mb-4">
              General Information
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* 1 */}
              <div className="flex items-center mb-6 gap-6">
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    First Name*
                  </label>
                  <Input
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 w-full"
                    placeholder="Enter First name"
                    icon={User1}
                    {...register("FirstName", { required: true })}
                  />
                  {errors.LastName && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    Last Name*
                  </label>
                  <Input
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 w-full"
                    placeholder="Enter last name"
                    icon={User1}
                    {...register("LastName", { required: true })}
                  />
                  {errors.LastName && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* 2 */}
              <div className="flex items-center mb-6 gap-6">
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    Email Address*
                  </label>
                  <Input
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 w-full"
                    placeholder="Enter your email address"
                    type="email"
                    icon={MailIcon1}
                    {...register("Email", { required: true })}
                  />
                  {errors.Email && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    Phone Number
                  </label>
                  <Input
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 w-full"
                    type="tel"
                    icon={Tel1}
                    placeholder="Enter your phone number"
                    {...register("PhoneNumber", { required: true })}
                  />
                  {errors.PhoneNumber && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* 3 */}
              <div className="flex items-center mb-6 gap-6">
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    City
                  </label>
                  <Input
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 w-full"
                    placeholder="Enter your city"
                    type="text"
                    icon={City2}
                    {...register("City", { required: true })}
                  />
                  {errors.City && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    Country
                  </label>
                  <Input
                    type="tel"
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 w-full"
                    icon={Country1}
                    placeholder="Enter your country"
                    {...register("country", { required: true })}
                  />
                  {errors.country && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* 4 */}
              <div className="flex items-center mb-6 gap-6">
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    Bio
                  </label>
                  <Textarea
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 border-none w-full flex items-center text-[#919EAB] "
                    placeholder="Write here..."
                    icon={Eidt2}
                    {...register("Bio", { required: true })}
                  />
                  {errors.Bio && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="grid w-full">
                  <label className="text-lg text-[#010792] font-medium">
                    Diploma
                  </label>
                  <Textarea
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 border-none w-full flex items-center text-[#919EAB] "
                    placeholder="Write here..."
                    icon={Eidt2}
                    {...register("Diploma", { required: true })}
                  />
                  {errors.Diploma && (
                    <span className="text-red-500 mt-1">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="hover:text-[#010792]  text-lg font-medium border hover:border-[#010792] hover:bg-transparent py-[10px] px-[35px] rounded-full bg-[#010792] w-[300px] text-white duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>

          {/* password section */}
          <div className="bg-white p-10 rounded-[16px]">
            <div className="flex justify-between gap-5">
              <div className="w-full items-center">
                <Label
                  className="text-[#000342] font-roboto flex gap-[1px]  font-medium text-lg"
                  htmlFor="text"
                >
                  Old Password
                  <span className="mt-[6px]">
                    <FaStarOfLife size={8} />
                  </span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    {...register("OldPassword", { required: true })}
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 border-none w-full flex items-center text-[#919EAB] "
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your old password"
                    icon={LockIcon1}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOpenIcon1 /> : <EyeOffIcon1 />}
                  </button>
                </div>

                {errors.OldPassword && (
                  <span className="text-red-500 text-sm">
                    Password is required
                  </span>
                )}
              </div>

              <div className="w-full items-center">
                <Label
                  className="text-[#000342] font-roboto flex gap-[1px]  font-medium text-lg"
                  htmlFor="text"
                >
                  New Password
                  <span className="mt-[6px]">
                    <FaStarOfLife size={8} />
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    {...register("NewPassword", { required: true })}
                    className="bg-[#F3F4F7] text-lg rounded-[10px] py-[20px]  outline-0 border-none w-full flex items-center text-[#919EAB] mt-2"
                    type={showConfirmPassword ? "text" : "password"}
                    id="NewPassword"
                    placeholder="Enter your new password"
                    icon={LockIcon1}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? <EyeOpenIcon1 /> : <EyeOffIcon1 />}
                  </button>
                </div>
                {errors.NewPassword && (
                  <span className="text-red-500 text-sm">
                    Confirm Password is required
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-16">
              <button className="hover:text-[#010792]  text-lg font-medium border hover:border-[#010792] hover:bg-transparent py-[10px] px-[35px] rounded-full bg-[#010792] w-[300px] text-white duration-300">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;
