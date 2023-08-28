import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContxtProvider } from "./context/AuthContext.tsx";
import { ChatContxtProvider } from "./context/ChatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContxtProvider>
      <ChatContxtProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContxtProvider>
    </AuthContxtProvider>
  </React.StrictMode>
);
