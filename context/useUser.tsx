"use client";

import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  name: string;
  userId: string;
  email: string;
  phone: number
  isAdmin: boolean;
  token: string
}

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  LogOut: () => void; // Assuming you have a signOut function
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      axios.defaults.headers.common['Authorization'] = parsedUser.token;
    } else {
      setIsLoading(false);
    }
  }, []);

  const LogOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, setIsLoading, LogOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};