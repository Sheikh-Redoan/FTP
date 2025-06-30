import { Box1, Ok1 } from "@/assets/Svgs";
import React, { useState } from "react";

const SubscriptionPlan = () => {
  const [activeBtn, setActiveBtn] = useState("monthly");
  const [activeFreeBtn, setActiveFreeBtn] = useState("PLUS"); // Set the middle plan (PLUS) as default

  const plans = [
    {
      id: "free",
      title: "ftp FREE",
      price: "$19",
      yearlyPrice: "$199 yearly",
      features: [
        "Personal Coaching Dashboard",
        "Training season & session planning (with 200+ activities)",
        "Develop your own training activities",
        "25+ Knowledge Articles",
        "FTP KIDS section",
        "Team Management & Player Performance Statistics",
        "Training & Event Planning",
        "Integrated App for Players",
      ],
    },
    {
      id: "PLUS",
      title: "ftp PLUS",
      price: "$29",
      yearlyPrice: "$299 yearly",
      features: [
        "Personal Coaching Dashboard",
        "Training season & session planning (with 200+ activities)",
        "Develop your own training activities",
        "25+ Knowledge Articles",
        "FTP KIDS section",
        "Team Management & Player Performance Statistics",
        "Training & Event Planning",
        "Integrated App for Players",
      ],
    },
    {
      id: "PRO",
      title: "ftp PRO",
      price: "$49",
      yearlyPrice: "$499 yearly",
      features: [
        "Personal Coaching Dashboard",
        "Training season & session planning (with 200+ activities)",
        "Develop your own training activities",
        "25+ Knowledge Articles",
        "FTP KIDS section",
        "Team Management & Player Performance Statistics",
        "Training & Event Planning",
        "Integrated App for Players",
      ],
    },
  ];

  return (
    <div className="bg-[#f3f4f7]   w-full">
      {/* Heading */}
      <div className="bg-white rounded-[16px] py-[40px] px-[130px]">
        <div>
          <h2 className="text-[#010792] text-center text-[48px] font-semibold leading-normal capitalize mb-3">
            Subscription plan
          </h2>
          <p className="text-[#919EAB] text-center text-[16px] ">
            However you want to coach, we got you covered!
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-wrap justify-center items-center my-8">
          <button
            onClick={() => setActiveBtn("monthly")}
            className={`font-medium rounded-l-[10px] py-[12px] px-6 border border-[#010792] ${
              activeBtn === "monthly" && "bg-[#010792] text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveBtn("yearly")}
            className={`font-medium rounded-r-[10px] py-[12px] px-6 border border-[#010792] ${
              activeBtn === "yearly" && "bg-[#010792] text-white"
            }`}
          >
            Yearly
          </button>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setActiveFreeBtn(plan.id)}
              className={`col-span-4 border px-8 py-5  rounded-[16px] cursor-pointer ${
                activeFreeBtn === plan.id
                  ? "border-[#010792] shadow-lg"
                  : "border-[#E6E6F4]"
              }`}
            >
              <div>
                <div className="flex justify-end">
                  <Box1 />
                </div>
                <div>
                  <p className="text-[#000342] text-[18px]">{plan.title}</p>
                  <h2 className="text-[#010792] text-[50px] font-semibold">
                    {plan.price}
                    <span className="text-[32px]">/mo</span>
                  </h2>
                  <p className="text-[#010792] text-[15px] leading-[20px]">
                    {plan.yearlyPrice}
                  </p>
                </div>
                <hr className="text-[#E6E6F4] my-3" />
                <ul className="space-y-1 mb-4 text-[#000342] text-[16px] leading-[30px]">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="grid grid-cols-12">
                      <div className="col-span-1">
                        <Ok1 />
                      </div>
                      <span className="col-span-11">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActiveFreeBtn(plan.id)}
                  className={`w-full text-[18px] font-medium leading-normal rounded-full border py-[10px] px-[35px] ${
                    activeFreeBtn === plan.id
                      ? "bg-[#010792] text-white border-[#010792] shadow-md"
                      : "bg-white text-[#010792] border-[#E6E6F4]"
                  }`}
                >
                  Get started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
