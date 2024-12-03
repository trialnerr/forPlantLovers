import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { userData } from "../types";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<userData | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log('i am checking authentication');
      try {
        const response = await fetch("api/user/check", {
          credentials: "include",
        });
        console.log(response, "in checkLoggedin");
        if (response.ok) {
          const userData = await response.json();
          console.log(userData, 'in checkLoggedin')
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setUser(null);
      }
       finally {
        setLoading(false); // Loading is complete
      }
    };
    checkLoggedIn();
  }, []);

  const login = async  (userData: userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await fetch("api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

//https://fem-react-typescript.vercel.app/The%20Context%20API.md

//https://ui.dev/react-router-protected-routes-authentication