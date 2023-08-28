import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";

export const Home: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#5B9A8B]">
      <div className="w-full h-full flex border border-green-800 overflow-hidden">
        <div className="w-[25%] bg-[#445069]">
          <Sidebar />
        </div>

        <div className="w-[calc(100vw-25%)]">
          <Chat />
        </div>
      </div>
    </div>
  );
};
