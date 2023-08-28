import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext<any>(null); // Provide a default value for TypeScript

interface AuthContxtProviderProps {
  children: React.ReactNode; // Define the prop type for children
}

export const AuthContxtProvider: React.FC<AuthContxtProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);
      // console.log(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // Or render a loading indicator
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
