import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  // updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import { db, storage } from "../config/firebase";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const UsersSelectModel = ({ onClose }: { onClose: any }) => {
  const [users, setUsers] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);
  const [filteredUsers, setFilteredUsers] = useState<Array<any>>(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        const usersData: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize filteredUsers with all users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.displayName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userID = event.target.name;
    if (event.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userID]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((user) => user !== userID)
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImg(file || null);
  };

  const createGroupChat = async () => {
    if (img && groupName && selectedUsers.length > 0) {
      const storageRef = ref(storage, `group-profiles/groupImg/${groupName}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      const uploadTaskSnapshot = await uploadTask;
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      const groupChatRef = collection(db, "groupChats");

      const groupId = uuid();

      const groupData = {
        id: groupId,
        displayName: groupName,
        createdAt: serverTimestamp(),
        members: selectedUsers,
        photoURL: downloadURL,
        messages: [], // Initialize with an empty array for messages
      };

      await setDoc(doc(groupChatRef, groupId), groupData);

      // // Update userChats for each member
      // for (const memberUID of users) {
      //   await updateDoc(doc(db, "userChats", memberUID), {
      //     [groupName + ".userInfo"]: {
      //       displayName: groupName,
      //       photoURL: downloadURL,
      //     },
      //     [groupName + ".date"]: serverTimestamp(),
      //   });
      // }
    }
    onClose();
  };

  // console.log(img);

  return (
    <div className="fixed backdrop-blur-md z-10 w-full h-screen flex justify-center items-center">
      <div className="flex gap-1">
        <div className="w-fit bg-white/90 p-5 space-y-2 rounded-lg">
          <h2 className="font-medium">Select users :</h2>
          <div className="flex gap-1 items-center border-b border-black">
            <label className="cursor-text" htmlFor="searchUser">
              <IoMdSearch />
            </label>
            <input
              className="bg-transparent outline-none placeholder:text-sm"
              type="search"
              placeholder="search..."
              name="searchUser"
              id="searchUser"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            {filteredUsers.map((user: any) => (
              <div key={user.uid} className="flex gap-2">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name={user.uid}
                  id={user.uid}
                  onChange={handleCheckboxChange}
                />
                <label className="cursor-pointer" htmlFor={user.uid}>
                  {user.displayName}
                </label>
              </div>
            ))}
          </div>
          <div className="flex gap-1 items-center border-b border-black">
            <label className="cursor-text" htmlFor="groupName">
              <AiOutlineUsergroupAdd />
            </label>
            <input
              className="bg-transparent outline-none placeholder:text-sm"
              type="search"
              placeholder="group name..."
              name="groupName"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="cursor-pointer tracking-tight flex gap-2 items-center text-gray-900 hover:text-black"
              htmlFor="file"
            >
              <BsImage className="" />
              <span className="text-sm">
                {img?.name ? img.name : "Upload Group Profile Picture"}
              </span>
            </label>
            <input
              hidden
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex w-full justify-center items-center">
            <button
              onClick={createGroupChat}
              className="btnBlack"
              type="button"
            >
              Create
            </button>
          </div>
        </div>
        <IoMdClose
          onClick={onClose}
          className="text-lg hover:scale-125 duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};
