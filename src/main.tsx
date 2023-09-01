import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContxtProvider } from "./context/AuthContext.tsx";
import { CombinedChatContextProvider } from "./context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContxtProvider>
      <CombinedChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CombinedChatContextProvider>
    </AuthContxtProvider>
  </React.StrictMode>
);
