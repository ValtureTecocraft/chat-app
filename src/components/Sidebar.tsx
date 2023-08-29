import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Chats } from "./Chats";
import { UsersSelectModel } from "../model/UsersSelectModel";

export const Sidebar: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full h-[500px] flex flex-col">
      <Navbar />
      <Search />
      <button
        onClick={() => setToggle(true)}
        type="button"
        className="btnGreen m-2"
      >
        Start Group Chat
      </button>
      <div className="flex flex-col overflow-y-auto">
        <Chats />
      </div>
      {toggle && <UsersSelectModel onClose={() => setToggle(false)} />}
    </div>
  );
};
