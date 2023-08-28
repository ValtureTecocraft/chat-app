import { useState, useContext, useEffect } from "react";
import { Message } from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export const Messages = () => {
  const [messages, setMessages] = useState<[]>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSubscribe();
    };
  }, [data.chatId]);

  return (
    <div className="w-full min-h-full flex flex-col justify-end gap-3">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
};
