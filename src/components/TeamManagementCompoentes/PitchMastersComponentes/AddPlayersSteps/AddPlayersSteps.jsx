import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Basic from "./from/Basic";
import Personal from "./from/Personal";
import PlayerSkills from "./from/PlayerSkills";

const AddPlayersSteps = ({ setIsDialogOpen }) => {
  const [step, setStep] = useState(1);
  const methods = useForm();
  const { handleSubmit, formState } = methods;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSend = (data) => {
    console.log("Form Data:", data);
    setIsDialogOpen(false);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full flex justify-center">
          <div className="flex relative z-50 gap-[60px] items-center">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={
                  step === num
                    ? "border border-[#010792] p-[6px] rounded-full"
                    : "border border-transparent p-[6px] rounded-full"
                }
              >
                <h1
                  className={`text-[26px] w-14 h-14 flex justify-center items-center rounded-full transition-all
                ${
                  step === num
                    ? "bg-[#010792] text-white"
                    : "text-[#010792] shadow-md shadow-[#010792]/20 border-none"
                }`}
                >
                  {num}
                </h1>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full">
          {step === 1 && (
            <div className="w-full">
              <h1 className="text-[32px] text-[#010792] italic text-center mb-4">
                Basic Information
              </h1>
              <Basic>
                <div className="flex justify-between mt-4 w-full">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formState.isValid}
                    className={`px-4 py-[16px] rounded-full w-full mt-6 ${
                      formState.isValid
                        ? "bg-[#010792] text-white"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </Basic>
            </div>
          )}
          {step === 2 && (
            <div className="w-full">
              <h1 className="text-[32px] text-[#010792] italic text-center mb-4">
                Personal Information
              </h1>
              <Personal>
                <div className="flex justify-between mt-4 w-full gap-4">
                  <button
                    onClick={handlePrevious}
                    className="border border-[#010792] hover:bg-[#010792] hover:text-white duration-300 text-[#010792] px-4 py-[16px] rounded-full w-full mt-6"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formState.isValid}
                    className={`px-4 py-[16px] rounded-full w-full mt-6 ${
                      formState.isValid
                        ? "bg-[#010792] text-white"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </Personal>
            </div>
          )}
          {step === 3 && (
            <>
              <h1 className="text-[32px] text-[#010792] italic text-center mb-4">
                Player Skills Information
              </h1>
              <PlayerSkills>
                <div className="flex justify-between mt-4 w-full gap-4">
                  <button
                    onClick={handlePrevious}
                    className="border border-[#010792] hover:bg-[#010792] hover:text-white duration-300 text-[#010792] px-4 py-[16px] rounded-full w-full mt-6"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit(handleSend)}
                    className="bg-[#010792] text-white px-4 py-[16px] rounded-full w-full mt-6"
                  >
                    Save
                  </button>
                </div>
              </PlayerSkills>
            </>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default AddPlayersSteps;
