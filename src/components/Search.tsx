import React, { useState, useContext } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

export const Search: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [err, setErr] = useState<boolean>(false);

  const currentUser = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    }
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId: string =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user Chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUserName("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="w-full h-12">
        <input
          className="w-full h-full px-2 outline-none bg-transparent border-b-2 border-[#323c52] text-gray-100"
          type="text"
          placeholder="Search..."
          name="search"
          id="search"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found</span>}

      {user && userName && (
        <div
          onClick={handleSelect}
          className="cursor-pointer w-full p-3 flex gap-3 items-center text-white border-b-2 border-gray-500 hover:bg-[#323c52]"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={user.photoURL}
            alt="profile"
          />
          <div>
            <span className="font-bold">{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
