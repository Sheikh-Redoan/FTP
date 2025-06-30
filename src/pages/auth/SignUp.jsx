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
  UserIcon1,
} from "../../assets/Svgs.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [buttonText, setButtonText] = useState("Sign Up");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const HandleOnSubmit = (data) => {
    setButtonText("Signing....");
    reset();
    toast.success("Your Account Verify Successfully", { duration: 1000 });
    setTimeout(() => {
      navigate("/auth/SignIn");
    }, 2000);
  };

  return (
    <div className="grid h-screen  grid-cols-2 bg-[#f3f4f7]">
      {/* images */}

      <div id="singupBg" className="w-full h-screen overflow-hidden">
        <img class=" object-cover   h-screen " src={img} />
      </div>

      {/* text section */}
      <div className="px-[164px] flex flex-col justify-center  bg-[#f3f4f7] py-4">
        <div>
          <h2 className="text-[#010792] text-center font-roboto text-[70px] font-bold leading-[80px] capitalize mb-2">
            Sign Up
          </h2>
          <p className="text-[#919EAB] text-center font-roboto text-[18px] font-normal leading-normal mb-6">
            Enter your email address and password to Sign In
          </p>
        </div>
        {/* form section */}
        <div>
          <form onSubmit={handleSubmit(HandleOnSubmit)}>
            <div className="space-y-[16px] mb-[17px] ">
              {/* --------- */}
              <div className="flex gap-8">
                <div className="grid w-full  items-center gap-0.5">
                  <Label
                    className="text-[#000342] font-roboto flex gap-[1px]"
                    htmlFor="text"
                  >
                    First Name
                    <span className="mt-[6px]">
                      <FaStarOfLife size={8} />
                    </span>
                  </Label>
                  <Input
                    {...register("FirstName", { required: true })}
                    type="text"
                    placeholder="Enter your first name"
                    icon={UserIcon1}
                  />
                  {errors.FirstName && (
                    <span className="text-red-500 text-sm">
                      First Name is required
                    </span>
                  )}
                </div>
                <div className="grid w-full  items-center gap-0.5">
                  <Label
                    className="text-[#000342] font-roboto flex gap-[1px]"
                    htmlFor="text"
                  >
                    Last Name
                    <span className="mt-[6px]">
                      <FaStarOfLife size={8} />
                    </span>
                  </Label>
                  <Input
                    {...register("LastName", { required: true })}
                    type="text"
                    placeholder="Enter your last name"
                    icon={UserIcon1}
                  />
                  {errors.LastName && (
                    <span className="text-red-500 text-sm">
                      Last Name is required
                    </span>
                  )}
                </div>
              </div>
              {/* ------- */}

              <div className="grid w-full  items-center gap-0.5">
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
                  placeholder="Enter your email"
                  icon={MailIcon1}
                />
                {errors.EmailAddress && (
                  <span className="text-red-500 text-sm">
                    Email Address is required
                  </span>
                )}
              </div>

              <div className="gap-5">
                <div className="w-full items-center">
                  <Label
                    className="text-[#000342] font-roboto flex gap-0.5"
                    htmlFor="text"
                  >
                    Password
                    <span className="mt-[6px]">
                      <FaStarOfLife size={8} />
                    </span>
                  </Label>
                  <div className="relative ">
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

            <div className="w-full items-center">
              <Label
                className="text-[#000342] font-roboto flex gap-0.5"
                htmlFor="text"
              >
                Confirm Password
                <span className="mt-[6px]">
                  <FaStarOfLife size={8} />
                </span>
              </Label>
              <div className="relative">
                <Input
                  {...register("ConfirmPassword", { required: true })}
                  className="w-full "
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Enter your Confirm Password"
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
              {errors.ConfirmPassword && (
                <span className="text-red-500 text-sm">
                  Confirm Password is required
                </span>
              )}
            </div>

            <div className=" text-center mt-6 mx-auto ">
              <input
                className="cursor-pointer w-full py-[14px] px-[35px] justify-center items-center rounded-full bg-[#010792] text-lg text-white border border-transparent duration-300 hover:bg-transparent hover:text-[#010792] hover:border hover:border-[#010792]"
                type="submit"
                value={buttonText}
                disabled={Object.values(errors).some((error) => !!error)}
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
            <Link to="/auth/SignIn">
              <span className="text-[#010792]"> Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
