import { useContext } from "react";
import { BsCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { CombinedChatContext } from "../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(CombinedChatContext);
  // console.log(data);

  return (
    <div className="w-full h-full flex flex-col bg-[#8391af]">
      {data?.isSelected !== "null" && (
        <div className="w-full min-h-[56px] px-3 py-4 bg-[#445069] flex justify-between items-center">
          <span className="text-white font-semibold">
            {data?.isSelected === "user"
              ? data?.user?.displayName
              : data?.selectedGroup?.displayName}
          </span>
          <div className="flex gap-3 text-lg mr-8 md:mr-0">
            <BsCameraVideoFill className="cursor-pointer text-gray-300 hover:text-gray-400" />
            <IoIosPersonAdd className="cursor-pointer text-gray-300 hover:text-gray-400" />
            <BsThreeDots className="cursor-pointer text-gray-300 hover:text-gray-400" />
          </div>
        </div>
      )}
      <div className="messages max-h-[calc(100vh-96px)] h-full overflow-y-auto p-4">
        <Messages />
      </div>
      {data?.isSelected !== "null" && (
        <div>
          <Input />
        </div>
      )}
    </div>
  );
};
