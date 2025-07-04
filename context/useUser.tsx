"use client";

import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { deleteCookie } from 'cookies-next';

interface User {
  name: string;
  userId?: string;
  address: string;
  phone: number
  isAdmin?: boolean;
  token?: string
}

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  cartCount: number;
  setCartCount: (cartCount: number) => void;
  cartItemCountFetch: () => void;
  LogOut: () => void; // Assuming you have a signOut function
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const cartItemCountFetch = async () => {
    try {
      const res = await axios.get("/api/cart")

      if (res?.data?.success === true) {
        setCartCount(res?.data?.cartItems?.length)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    cartItemCountFetch();
  }, [currentUser?.token, cartCount]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    } else {
      setIsLoading(false);
    }
  }, []);


  const LogOut = () => {
    localStorage.removeItem('currentUser');
    deleteCookie('isAdmin');
    deleteCookie('token');
    setCurrentUser(null);
    setIsLoading(false);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, setIsLoading, LogOut, setCartCount, cartCount, cartItemCountFetch }}>
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