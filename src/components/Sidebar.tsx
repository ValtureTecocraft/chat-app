import React from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Chats } from "./Chats";

export const Sidebar: React.FC = () => {
  return (
    <div className="w-full h-[500px] flex flex-col">
      <Navbar />
      <Search />
      <button type="button" className="btnGreen m-2">
        Start Group Chat
      </button>
      <div className="flex flex-col overflow-y-auto">
        <Chats />
      </div>
    </div>
  );
};
