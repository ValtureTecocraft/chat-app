import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContxtProvider } from "./context/AuthContext.tsx";
import { ChatContxtProvider } from "./context/ChatContext.tsx";
import { GroupChatContextProvider } from "./context/GroupChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContxtProvider>
      <ChatContxtProvider>
        <GroupChatContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GroupChatContextProvider>
      </ChatContxtProvider>
    </AuthContxtProvider>
  </React.StrictMode>
);
