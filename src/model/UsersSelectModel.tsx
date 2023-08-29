import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";

export const UsersSelectModel = () => {
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
    const userEmail = event.target.name;
    if (event.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        userEmail,
      ]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((email) => email !== userEmail)
      );
    }
  };

  console.log(selectedUsers);

  return (
    <div>
      {users?.map((user: any) => (
        <div key={user.uid} className="flex gap-2">
          <input
            type="checkbox"
            name={user.uid}
            id={user.uid}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={user.uid}>{user.displayName}</label>
        </div>
      ))}
    </div>
  );
};
