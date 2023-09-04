import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import { HiMenuAlt2 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

export const Home: React.FC = () => {
  const [menu, setMenu] = useState<boolean>(true);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#5B9A8B]">
      <div className="relative w-full h-full flex border border-green-800 overflow-hidden">
        {/* sidebar for Tablet and Desktop View */}
        <div className="hidden md:block w-[25%] bg-[#445069]">
          <Sidebar />
        </div>

        {/* sidebar for Mobile View */}
        <div className="block md:hidden">
          {!menu ? (
            <HiMenuAlt2
              className="absolute z-10 right-3 top-4 text-2xl "
              onClick={handleClick}
            />
          ) : (
            <GrClose
              className="absolute z-10 text-2xl text-white bg-white right-3 top-4"
              onClick={handleClick}
            />
          )}
        </div>

        <div
          className={`md:hidden block absolute w-[70%] h-screen bg-[#445069] duration-300 ${
            menu ? "right-0" : "-right-[700px]"
          }`}
        >
          <Sidebar />
        </div>

        <div className="w-full md:w-[calc(100vw-25%)]">
          <Chat />
        </div>
      </div>
    </div>
  );
};
