import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4 flex justify-between items-center px-[10px] bg-[#323c52] text-white">
      <span className="uppercase font-bold">Chat App</span>
      <div className="space-x-3 flex items-center">
        <img
          className="rounded-full w-6 h-6 object-cover"
          src="https://source.unsplash.com/random/100x100/?avatar"
          alt=""
        />
        <span>John</span>
        <button
          onClick={logOut}
          className="bg-gray-500/80 hover:bg-gray-500 text-black font-semibold px-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
