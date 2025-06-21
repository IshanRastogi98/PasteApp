import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="flex flex-row gap-5 items-center justify-center text-indigo-700 font-bold w-[100%] bg-[linear-gradient(135deg,_#D6ECFF_10%,_#99CCFF_100%)] py-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          (isActive
            ? "bg-gradient-to-r from-teal-50 to-blue-100 border-[1px] border-gray-800"
            : "bg-gradient-to-r from-teal-50 to-blue-100 border-[1px] border-[#D6ECFF]") +
          " rounded-md px-2 py-1 shadow shadow-blue-500/40 hover:shadow-indigo-500/40 transition-all"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          (isActive
            ? "bg-gradient-to-r from-teal-50 to-blue-100 border-[1px] border-gray-800"
            : "bg-gradient-to-r from-teal-50 to-blue-100 border-[1px] border-[#D6ECFF]") +
          " rounded-md px-2 py-1 shadow shadow-blue-500/40 hover:shadow-indigo-500/40 transition-all"
        }
      >
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
