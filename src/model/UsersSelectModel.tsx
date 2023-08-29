import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { IoMdClose } from "react-icons/io";

export const UsersSelectModel = ({ onClose }: { onClose: any }) => {
  const [users, setUsers] = useState<Array<any>>([]);
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users"); // Use 'collection' function
        const snapshot = await getDocs(usersRef); // Use 'getDocs' function

        const usersData: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

  console.log(selectedUsers);

  return (
    <div className="fixed backdrop-blur-md z-10 w-full h-screen flex justify-center items-center">
      <div className="flex gap-1">
        <div className="w-fit bg-white/90 p-5 rounded-lg">
          {users?.map((user: any) => (
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
        <IoMdClose
          onClick={onClose}
          className="text-lg hover:scale-125 duration-300 cursor-pointer"
        />
      </div>
    </div>
  );
};
