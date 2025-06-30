import React, { useState } from "react";

const options = ["Marvin", "McKinney", "Marvi", "Kinney"];

const CheckboxGroup = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="border border-gray-100 p-5 rounded-[10px]">
      <div>
        {options.map((option, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 w-full items-center"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 text-blue-500 border-gray-300 rounded  outline-none"
              />
              <span
                className="text-[#010792] font-roboto text-[18px] font-medium leading-normal
"
              >
                {option}
              </span>
            </div>
            <div className="text-center text-[#919EAB] text-lg">
              <p>123</p>
            </div>
            <div className="text-center text-[#919EAB] text-lg">
              <p>Midfielder</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
