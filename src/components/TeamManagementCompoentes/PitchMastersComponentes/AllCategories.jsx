import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("/Api/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="bg-white p-6 rounded-[16px] w-[907px]">
      <h2 className="mb-6 text-xl font-medium text-[#000342]">Teams:</h2>
      <div>
        {categories.map((itemCategory) => (
          <Link  to="/dashboard/team-management/pitchMasters">
            <div  className="flex justify-between border border-[#E6E6F4]  bg-[#E6E6F4] rounded-[8px] items-center py-[10px] px-[16px] mb-4 hover:bg-white cursor-pointer ">
              <h1 className="text-[20px] text-[#010792] font-medium">
                Team Name:{" "}
                <span className="text-[#637381] font-normal">
                  {itemCategory.name}
                </span>
              </h1>
              <h1 className="text-[20px] text-[#010792] font-medium">
                Age Range:{" "}
                <span className="text-[#637381] font-normal">
                  {itemCategory.age}
                </span>
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
