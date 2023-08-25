import React from "react";

export const Search: React.FC = () => {
  return (
    <div>
      <div className="w-full h-12">
        <input
          className="w-full h-full px-2 outline-none bg-transparent border-b-2 border-[#323c52]"
          type="text"
          placeholder="Search..."
          name="search"
          id="search"
        />
      </div>
      <div className="w-full p-3 flex gap-3 items-center text-white border-b-2 border-gray-500 hover:bg-[#323c52]">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src="https://source.unsplash.com/random/80x80/?profile"
          alt="profile"
        />
        <div>
          <span className="font-bold">John</span>
        </div>
      </div>
    </div>
  );
};
