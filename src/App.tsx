import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AuthContext } from "./context/AuthContext";

function App() {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({ children }: { children: any }) => {
    if (!currentUser) {
      return <Navigate to={"/login"} />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
