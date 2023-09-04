import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CombinedChatContext } from "../context/ChatContext";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const Message = ({
  message,
  imgClick,
}: {
  message: any;
  imgClick: any;
}) => {
  // console.log(message);

  const [senderInfo, setSenderInfo] = useState<any | null>(null);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(CombinedChatContext);

  // console.log(message.date);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSenderInfo = async () => {
      try {
        // Use the 'getDoc' function from Firebase v9 to fetch the document
        const userDoc = await getDoc(doc(db, "users", message.senderId));

        if (userDoc.exists()) {
          setSenderInfo(userDoc.data());
        } else {
          console.log("Sender's information not found.");
        }
      } catch (error) {
        console.error("Error fetching sender's information:", error);
      }
    };

    fetchSenderInfo();
  }, [message.senderId]);

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
            message.senderId === currentUser.uid
              ? currentUser?.photoURL
              : senderInfo?.photoURL
          }
          alt="profile"
        />
        <span className="font-light text-xs text-white">
          {convertTimestampToTime(message.date)}
        </span>
      </div>

      <div
        className={`${
          message.senderId === currentUser.uid ? "items-end" : ""
        } gap-2 flex flex-col w-full`}
      >
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
