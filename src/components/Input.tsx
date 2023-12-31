import { useContext, useState } from "react";
import { IoMdAttach, IoMdClose } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";
import { CombinedChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { BsFillImageFill } from "react-icons/bs";

export const Input = () => {
  const [text, setText] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);

  const currentUser = useContext(AuthContext);
  const { data } = useContext(CombinedChatContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text || img) {
      const messageRef =
        data.isSelected === "user"
          ? `chats/${data.chatId}`
          : `groupChats/${data.selectedGroup.id}`;

      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        try {
          const snapshot = await uploadTask;
          const downloadURL = await getDownloadURL(snapshot.ref);

          // Store user information in Firestore

          await updateDoc(doc(db, messageRef), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              senderInfo: data.isSelected === "group" && {
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
              },
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });

          console.log("File available at", downloadURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }

        // uploadTask.on(
        //   "state_changed",
        //   (error) => {
        //     console.log(error);
        //   },
        //   () => {
        //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        //       await updateDoc(doc(db, "chats", data.chatId), {
        //         messages: arrayUnion({
        //           id: uuid(),
        //           text,
        //           senderId: currentUser.uid,
        //           date: Timestamp.now(),
        //           img: downloadURL,
        //         }),
        //       });
        //     });
        //   }
        // );
        console.log();
      } else {
        await updateDoc(doc(db, messageRef), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            senderInfo: data.isSelected === "group" && {
              photoURL: currentUser.photoURL,
              displayName: currentUser.displayName,
            },
            date: Timestamp.now(),
          }),
        });
      }

      if (data.isSelected === "user") {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
      }

      setText("");
      setImg(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImg(file || null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full px-3 py-1 bg-white flex justify-between items-center"
    >
      {img && (
        <div className="absolute left-0 -top-12 h-12 w-[calc(100%-8px)] flex gap-2 items-center px-6 bg-gray-300">
          <BsFillImageFill className="border border-black/50 rounded p-0.5 w-5 h-5" />
          <span className="text-sm">{img?.name}</span>
          <IoMdClose
            onClick={() => setImg(null)}
            className="text-base mt-1 hover:scale-125 cursor-pointer duration-300"
          />
        </div>
      )}

      <input
        autoComplete="off"
        className="w-full h-10 outline-none"
        placeholder="Type message..."
        type="text"
        name="msg"
        id="msg"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-2 justify-center items-center">
        <IoMdAttach className="text-xl text-gray-400 hover:text-gray-500 cursor-pointer" />
        <label htmlFor="file">
          <LuImagePlus className="text-xl text-gray-400 hover:text-gray-500 cursor-pointer" />
        </label>
        <input
          className="hidden"
          type="file"
          name="file"
          id="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
        <button type="submit" className="btnBlack">
          Send
        </button>
      </div>
    </form>
  );
};
