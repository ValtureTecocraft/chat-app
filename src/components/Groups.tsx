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
      const unSubscribe = onSnapshot(
        collection(db, "groupChats"),
        (querySnapshot) => {
          const groupData = querySnapshot.docs.map((doc) => {
            const group = doc.data();

            // Use filter to find groups where currentUser's UID exists in the members array
            const memberExists = group.members.filter(
              (member: any) => member.uid === currentUser.uid
            );

            if (memberExists.length > 0) {
              return {
                id: doc.id,
                ...group,
              };
            }
            return null; // Exclude groups where the user is not a member
          });

          // Remove null entries and set the filtered groups
          setGroups(groupData.filter(Boolean));
        }
      );

      return () => {
        unSubscribe();
      };
    };

    getGroups();
  }, [currentUser.uid]);

  const handleClearChatState = () => {
    dispatch({ type: "RESET_CHAT_STATE" });
  };

  const handleSelect = (group: any) => {
    // console.log(group);

    handleClearChatState();

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
