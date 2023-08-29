import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext<any>(null); // Provide a default value for TypeScript

interface AuthContxtProviderProps {
  children: React.ReactNode; // Define the prop type for children
}

export const ChatContxtProvider: React.FC<AuthContxtProviderProps> = ({
  children,
}) => {
  const currentUser = useContext(AuthContext);

  const initialState = {
    chatId: "null",
    user: {},
    isSelected: false,
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          isSelected: action.select,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
