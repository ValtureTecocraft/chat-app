import { useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Message = ({ message }: { message: any }) => {
  // console.log(message);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      className={`${
        message.senderId === currentUser.uid ? "flex-row-reverse" : "flex-row"
      } flex gap-4`}
    >
      <div className="min-w-max">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="profile"
        />
        <span className="font-light text-xs">just now</span>
      </div>

      <div
        className={`${
          message.senderId === currentUser.uid ? "items-end" : ""
        } gap-2 flex flex-col w-full`}
      >
        <p
          className={`${
            message.senderId === currentUser.uid
              ? "bg-[#414857] text-white rounded-[10px_0px_10px_10px]"
              : "bg-white rounded-[0px_10px_10px_10px]"
          } max-w-max p-2 text-sm px-4`}
        >
          {message.text}
        </p>
        {message.img && (
          <img className="max-w-[25%]" src={message.img} alt="" />
        )}
      </div>
    </div>
  );
};
