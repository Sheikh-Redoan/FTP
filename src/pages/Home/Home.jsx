import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex justify-center mt-36 gap-24">
      <Link to="/auth/signUp">
        <button className="hover:text-[#010792]  text-lg font-medium border hover:border-[#010792] hover:bg-transparent py-[10px] px-[35px] rounded-full bg-[#010792] w-[300px] text-white duration-300">
          {" "}
          Auth Page
        </button>
      </Link>
      <Link to="/dashboard/dashboardHome">
        <button className="hover:text-[#010792]  text-lg font-medium border hover:border-[#010792] hover:bg-transparent py-[10px] px-[35px] rounded-full bg-[#010792] w-[300px] text-white duration-300">
          Dashboard
        </button>
      </Link>
    </div>
  );
}

export default Home;
