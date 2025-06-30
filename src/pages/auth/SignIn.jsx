import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaStarOfLife } from "react-icons/fa";
import img from "../../assets/imges/AuthImages.jpg";
import {
  EyeOffIcon1,
  EyeOpenIcon1,
  GoogleIcon1,
  LockIcon1,
  MailIcon1,
} from "../../assets/Svgs.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const HandleOnSubmit = (data) => {
    reset();
    toast.success("Your Account Verify Successfully", { duration: 1000 });
    setTimeout(() => {
      navigate("/dashboard/dashboardHome");
    }, 2000);
  };

  return (
    <div className="grid h-screen overflow-hidden grid-cols-2 bg-[#f3f4f7]">
      {/* images */}
      <div id="singupBg" className="w-full h-full">
        <img class=" object-cover w-full   " src={img} />
      </div>

      {/* text section */}
      <div className="px-[164px]  bg-[#f3f4f7]  flex flex-col justify-center h-screen">
        <div>
          <h2 className="text-[#010792] text-center font-roboto text-[70px] font-bold leading-[80px] capitalize mb-4">
            Sign In
          </h2>
          <p className="text-[#919EAB] text-center font-roboto text-[18px] font-normal leading-normal mb-12">
            Enter your email address and password to Sign In
          </p>
        </div>
        {/* form section */}
        <div>
          <form onSubmit={handleSubmit(HandleOnSubmit)}>
            <div className="space-y-[16px] mb-[17px] ">
              <div className="grid w-full  items-center gap-1.5">
                <Label
                  className="text-[#000342] font-roboto flex gap-[1px]"
                  htmlFor="text"
                >
                  Email Address
                  <span className="mt-[6px]">
                    <FaStarOfLife size={8} />
                  </span>
                </Label>
                <Input
                  {...register("EmailAddress", { required: true })}
                  type="email"
                  placeholder="Enter your first name"
                  icon={MailIcon1}
                />
                {errors.EmailAddress && (
                  <span className="text-red-500 text-sm">
                    User Name is required
                  </span>
                )}
              </div>

              <div className="gap-5">
                <div className="w-full items-center">
                  <Label
                    className="text-[#000342] font-roboto flex gap-[1px]"
                    htmlFor="text"
                  >
                    Password
                    <span className="mt-[6px]">
                      <FaStarOfLife size={8} />
                    </span>
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      {...register("Password", { required: true })}
                      className=" w-full"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your Password"
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

                  {errors.Password && (
                    <span className="text-red-500 text-sm">
                      Password is required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className=" text-center mt-[30px] mx-auto ">
              <input
                className="cursor-pointer w-full py-[14px] px-[35px] justify-center items-center rounded-full bg-[#010792] text-lg text-white border border-transparent duration-300 hover:bg-transparent hover:text-[#010792] hover:border hover:border-[#010792]"
                type="submit"
                value={isSubmitting ? "Signing..." : "Sign In"}
                disabled={
                  Object.values(errors).some((error) => !!error) || isSubmitting
                }
              />

              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </form>
          <div className="my-4 flex items-center gap-2 text-center">
            <div className="bg-[#E6E6F4] h-[1px] w-full"></div>
            <div className="text-text-secondary text-sm">OR</div>
            <div className="bg-[#E6E6F4] h-[1px] w-full"></div>
          </div>

          <button className="cursor-pointer w-full py-[14px] px-[35px] flex gap-4 justify-center items-center rounded-full border text-[#010792] border-[#010792]  text-lg  hover:bg-white duration-300">
            <GoogleIcon1 /> Sign Up With Google
          </button>

          <p className="text-center mt-6 text-lg text-[#637381]">
            Already you have an account?
            <Link to="/auth/signUp">
              <span className="text-[#010792]"> Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
