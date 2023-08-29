import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const Chats = () => {
  const [chats, setChats] = useState<any>([]);

  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unSubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unSubscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // console.log(Object.entries(chats));
  // console.log(chats);

  const handleSelect = (u: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="w-full">
      {Object.entries(chats)
        .sort((a: any, b: any) => b[1].date - a[1].date)
        .map((chat: any) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="cursor-pointer w-full h-16 px-3 flex gap-3 items-center text-white text-xs border-b-2 border-gray-500 hover:bg-[#323c52]"
          >
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={chat[1].userInfo.photoURL}
              alt="profile"
            />
            <div>
              <span className="font-semibold text-sm">
                {chat[1].userInfo.displayName}
              </span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
