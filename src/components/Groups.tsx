import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { BiGroup } from "react-icons/bi";
import { CombinedChatContext } from "../context/ChatContext";

export const Groups = () => {
  const [groups, setGroups] = useState<any[]>([]);

  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(CombinedChatContext);

  useEffect(() => {
    const getGroups = () => {
      const groupData: any[] = [];

      const unSubscribe = onSnapshot(
        collection(db, "groupChats"),
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const group = doc.data();

            // Check if currentUser's UID exists in the members array
            if (
              group.members.some(
                (member: any) => member.uid === currentUser.uid
              )
            ) {
              groupData.push({
                id: doc.id,
                ...group,
              });
            }
          });

          setGroups(groupData);
        }
      );

      return () => {
        unSubscribe();
      };
    };

    getGroups();
  }, [currentUser.uid]);

  const handleSelect = (group: any) => {
    // console.log(group);

    dispatch({
      type: "CHANGE_GROUP",
      payloadGroup: group,
      select: "group",
    });
  };

  return (
    <div className="w-full">
      {groups.map((group) => (
        <div
          key={group.id}
          onClick={() => handleSelect(group)}
          className="cursor-pointer w-full h-16 px-3 flex gap-3 items-center text-white text-xs border-b-2 border-gray-500 hover:bg-[#323c52]"
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={group.photoURL}
            alt="group"
          />
          <div className="w-full flex justify-between items-center">
            <span className="font-semibold text-sm">{group.displayName}</span>
            {/* You can display additional information about the group here */}
            <div>
              <BiGroup className="text-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
