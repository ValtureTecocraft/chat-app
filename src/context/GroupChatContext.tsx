import { createContext, useReducer } from "react";

// Create a new context for group chats
export const GroupChatContext = createContext<any>(null); // Provide a default value for TypeScript

// Define the props for the context provider
interface GroupChatContextProviderProps {
  children: React.ReactNode;
}

export const GroupChatContextProvider: React.FC<
  GroupChatContextProviderProps
> = ({ children }) => {
  // Initial state for group chat
  const initialState = {
    selectedGroup: {}, // You can initialize this as needed
    isSelected: false,
  };

  // Reducer for group chat state
  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_GROUP":
        // Add logic here to change the group
        // For example, you can set the selected group in the state
        return {
          ...state,
          selectedGroup: action.payload,
          isSelected: action.select,
        };
      default:
        return state;
    }
  };

  // Use the useReducer hook to manage state with the chatReducer
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    // Provide the state and dispatch function through the context
    <GroupChatContext.Provider value={{ groupData: state, dispatch }}>
      {children}
    </GroupChatContext.Provider>
  );
};
