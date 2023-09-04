import { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CombinedChatContext } from "../context/ChatContext";

export const Message = ({
  message,
  imgClick,
}: {
  message: any;
  imgClick: any;
}) => {
  // console.log(message);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(CombinedChatContext);

  // console.log(message.date);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [message]);

  const convertTimestampToTime = (timestamp: any) => {
    const currentTime: any = new Date();
    const targetTime: any = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds

    // Calculate the time difference in seconds
    const timeDiffInSeconds = Math.floor((currentTime - targetTime) / 1000);

    if (timeDiffInSeconds < 60) {
      return "just now";
    }

    const hours = targetTime.getHours();
    const minutes = targetTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div
      ref={scrollRef}
      className={`${
        message.senderId === currentUser.uid ? "flex-row-reverse" : "flex-row"
      } flex gap-4`}
    >
      <div className="min-w-max">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={
            data.isSelected === "user"
              ? message.senderId === currentUser.uid
                ? currentUser?.photoURL
                : data.user?.photoURL
              : message?.senderInfo?.photoURL
          }
          alt="profile"
        />
        {data.isSelected === "user" && (
          <span className="font-light text-xs text-white">
            {convertTimestampToTime(message.date)}
          </span>
        )}
      </div>

      <div
        className={`${
          message.senderId === currentUser.uid ? "items-end" : ""
        } gap-2 flex flex-col w-full`}
      >
        {data.isSelected === "group" && (
          <p className="text-sm text-gray-200">
            {message?.senderInfo?.displayName?.split(" ")[0]}
            <span className="font-light ml-1 text-xs text-white">
              - {convertTimestampToTime(message.date)}
            </span>
          </p>
        )}
        {message.text && (
          <p
            className={`${
              message.senderId === currentUser.uid
                ? "bg-[#414857] text-white rounded-[10px_0px_10px_10px] bubbleOwner"
                : "bg-white rounded-[0px_10px_10px_10px] bubble"
            } max-w-max p-2 text-sm px-4`}
          >
            {message.text}
          </p>
        )}
        {message.img && (
          <div
            onClick={() => imgClick(message.img)}
            className="max-w-[25%] h-28 overflow-hidden w-full flex justify-center items-center rounded-md cursor-pointer"
          >
            <img className="w-full" src={message.img} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};
