import { useContext } from "react";
import { BsCameraVideoFill, BsThreeDots } from "react-icons/bs";
import { IoIosPersonAdd } from "react-icons/io";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { ChatContext } from "../context/ChatContext";
import { GroupChatContext } from "../context/GroupChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  const { groupData } = useContext(GroupChatContext);

  return (
    <div className="w-full h-full flex flex-col bg-[#8391af]">
      {(data?.isSelected || groupData?.isSelected) && (
        <div className="w-full min-h-[56px] px-3 py-4 bg-[#445069] flex justify-between items-center">
          <span className="text-white font-semibold">
            {data.user?.displayName}
          </span>
          <div className="flex gap-3 text-lg">
            <BsCameraVideoFill className="cursor-pointer text-gray-300 hover:text-gray-400" />
            <IoIosPersonAdd className="cursor-pointer text-gray-300 hover:text-gray-400" />
            <BsThreeDots className="cursor-pointer text-gray-300 hover:text-gray-400" />
          </div>
        </div>
      )}
      <div className="messages max-h-[calc(100vh-96px)] h-full overflow-y-auto p-4">
        <Messages />
      </div>
      {(data?.isSelected || groupData?.isSelected) && (
        <div>
          <Input />
        </div>
      )}
    </div>
  );
};
