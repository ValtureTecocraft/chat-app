import React from "react";
import { IoMdAttach } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";

export const Input: React.FC = () => {
  return (
    <form className="w-full px-3 py-1 bg-white flex justify-between items-center">
      <input
        className="w-full h-10 outline-none"
        placeholder="Type message..."
        type="text"
        name="msg"
        id="msg"
      />
      <div className="flex gap-2 justify-center items-center">
        <IoMdAttach className="text-xl text-gray-400 hover:text-gray-500 cursor-pointer" />
        <label htmlFor="file">
          <LuImagePlus className="text-xl text-gray-400 hover:text-gray-500 cursor-pointer" />
        </label>
        <input className="hidden" type="file" name="file" id="file" />
        <button type="submit" className="btnBlack">
          Send
        </button>
      </div>
    </form>
  );
};
