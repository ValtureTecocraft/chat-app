import React, { useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#5B9A8B]">
      <div className="w-[900px] h-[500px] rounded-2xl flex border border-green-800 overflow-hidden">
        <div className="w-[33%] bg-[#445069]">
          <Sidebar />
        </div>

        <div className="w-[67%]">
          <Chat />
        </div>
      </div>
    </div>
  );
};
