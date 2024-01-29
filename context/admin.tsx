"use client"

import { useState, useContext, useEffect, createContext, ReactNode } from "react";
import axios from "axios";

interface AdminData {
  name: string;
  userId: string;
  role: string;
  email: string;
  token: string;
}

interface AuthContextType {
  admin: AdminData;
  setAdmin: React.Dispatch<React.SetStateAction<AdminData>>;
  logOut?: () => void;
}

const AdminContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AdminProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminData>(() => {

    useEffect(() => {
      const storedAdmin = localStorage.getItem('admin')
      if (storedAdmin) {
        return JSON.parse(storedAdmin);
      }
    }, [])

    // const storedAdmin = localStorage.getItem("admin");
    // if (storedAdmin) {
    //   return JSON.parse(storedAdmin);
    // }
    return {
      name: "",
      userId: "",
      role: "",
      email: "",
      token: "",
    };
  });

  useEffect(() => {
    axios.defaults.headers.common["authorization"] = admin.token;
  }, [admin.token]);

  // const clear: any = () => {
  //   setAdmin({
  //     name: "",
  //     userId: "",
  //     role: "",
  //     email: "",
  //     token: "",
  //   });
  //   try {
  //     localStorage.removeItem("admin");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const logOut = () => {
  //   clear();
  // };

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = (): AuthContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AuthProvider");
  }
  return context;
};

export { useAdmin, AdminProvider };
