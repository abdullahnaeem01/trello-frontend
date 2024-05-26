import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

const Header = () => {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  };
  return (
    <div className="bg-[#1d2125] w-100 h-12 p-3 border-b bordered-box flex flex-row justify-between border-b-[#9fadbc29]">
      <div className="left justify-center items-center flex">
        <h3 className="text-slate-50">Trello Clone</h3>
      </div>
      <div className="right flex items-center space-x-4">
        <button
          className="bg-gray-200 h-8 text-gray-800 px-2 py-1 mr-2 rounded flex justify-center items-center"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
