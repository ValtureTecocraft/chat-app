import React from "react";

export const Chats: React.FC = () => {
  return (
    <div className="w-full h-16 px-3 flex gap-3 items-center text-white text-xs border-b-2 border-gray-500 hover:bg-[#323c52]">
      <img
        className="w-10 h-10 rounded-full object-cover"
        src="https://source.unsplash.com/random/80x80/?profile"
        alt="profile"
      />
      <div>
        <span className="font-semibold text-sm">John</span>
        <p>Hello! Good morning.</p>
      </div>
    </div>
  );
};
