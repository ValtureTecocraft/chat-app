import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Chats } from "./Chats";
import { UsersSelectModel } from "../model/UsersSelectModel";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import { GroupChats } from "./GroupChats";

export const Sidebar: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-full h-[500px] flex flex-col">
      <Navbar />
      <Search />
      <button
        onClick={() => setToggle(true)}
        type="button"
        className="btnGreen m-2 flex justify-center items-center gap-2"
      >
        <AiOutlineUsergroupAdd className="text-lg" />
        Start Group Chat
      </button>
      <div className="flex flex-col overflow-y-auto">
        {/* <GroupChats /> */}
        <Chats />
      </div>
      {toggle && <UsersSelectModel onClose={() => setToggle(false)} />}
    </div>
  );
};
