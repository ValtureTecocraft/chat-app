import React from "react";
import { BsCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { Messages } from "./Messages";
import { Input } from "./Input";

export const Chat: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-[#8391af]">
      <div className="w-full px-3 py-4 bg-[#445069] flex justify-between items-center">
        <span className="text-white font-semibold">John</span>
        <div className="flex gap-3 text-lg">
          <BsCameraVideoFill className="cursor-pointer text-gray-300 hover:text-gray-400" />
          <IoIosPersonAdd className="cursor-pointer text-gray-300 hover:text-gray-400" />
          <BsThreeDots className="cursor-pointer text-gray-300 hover:text-gray-400" />
        </div>
      </div>
      <div className="messages max-h-[calc(500px-96px)] h-full overflow-y-auto p-4">
        <Messages />
      </div>

      <div>
        <Input />
      </div>
    </div>
  );
};
