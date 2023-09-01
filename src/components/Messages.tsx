import { useState, useContext, useEffect } from "react";
import { Message } from "./Message";
import { CombinedChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { ImagePreviewModel } from "../model/ImagePreviewModel";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [toggle, setToggle] = useState(false);
  const { data } = useContext(CombinedChatContext);

  useEffect(() => {
    // Check if data is defined and has the chatId property
    if (data && data.chatId) {
      const unSubscribe = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSubscribe();
      };
    }
  }, [data]);

  return (
    <div className="w-full min-h-full flex flex-col justify-end gap-3">
      {messages.map((msg, index) => (
        <div key={index}>
          <Message
            message={msg}
            imgClick={(imageUrl: string) => {
              setSelectedImageUrl(imageUrl);
              setToggle(true);
              // console.log(msg);
            }}
          />
        </div>
      ))}
      {toggle && (
        <ImagePreviewModel
          imgURL={selectedImageUrl}
          onClose={() => setToggle(false)}
        />
      )}
    </div>
  );
};
