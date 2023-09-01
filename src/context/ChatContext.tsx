import { createContext, useReducer, useContext } from "react";
import { AuthContext } from "./AuthContext";

// Define the combined context
export const CombinedChatContext = createContext<any>(null);

// Define the props for the context provider
interface CombinedChatContextProviderProps {
  children: React.ReactNode;
}

// Define the interface for the initial state
interface CombinedChatState {
  chatId: string;
  user: any; // Replace 'any' with the actual type of user data
  selectedGroup: any | null; // Replace 'any' with the actual type of group data
  isSelected: string;
}

export const CombinedChatContextProvider: React.FC<
  CombinedChatContextProviderProps
> = ({ children }) => {
  // Use the useContext hook inside the component to access AuthContext
  const currentUser = useContext(AuthContext);

  // Initial state for chat and group
  const initialState: CombinedChatState = {
    chatId: "null",
    user: {}, // Replace with the actual type of user data
    selectedGroup: {}, // Replace with the actual type of group data
    isSelected: "null",
  };

  // Reducer for chat and group chat state
  const reducer = (state: CombinedChatState, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        // Add logic here to change the user
        return {
          ...state,
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          isSelected: action.select,
        };
      case "CHANGE_GROUP":
        // Add logic here to change the group
        return {
          ...state,
          selectedGroup: action.payloadGroup,
          isSelected: action.select,
          // Update other group chat state properties as needed
        };
      default:
        return state;
    }
  };

  // Use the useReducer hook to manage both chat and group chat state with the reducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // Provide both chat and group chat state and dispatch functions through the context
    <CombinedChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </CombinedChatContext.Provider>
  );
};
