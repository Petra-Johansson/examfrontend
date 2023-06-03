"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BASE = "http://localhost:8080";
type AuthState = {
  isLoggedIn: boolean;
} | null;

export const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    phone: string,
    password: string,
    image: string,
    contractNumber: string
  ) => Promise<void>;
  getProfile: () => Promise<any>;
  // Include the useAuth hook directly inside AuthContext
  useAuth: () => {
    authState: AuthState;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (
      name: string,
      email: string,
      phone: string,
      password: string,
      image: string,
      contractNumber: string
    ) => Promise<void>;
    getProfile: () => Promise<any>;
  };
} | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth can only be used inside an AuthContextProvider");
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `${BASE}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.jwt) {
          setAuthState({ isLoggedIn: true });
        } else {
          setAuthState({ isLoggedIn: false });
        }
        setIsLoading(false);
      } catch (err) {
        setAuthState({ isLoggedIn: false });
        setIsLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${BASE}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.jwt) {
        setAuthState({ isLoggedIn: true });
        return;
      }
    } catch (err) {
      console.error(err);
      setAuthState({ isLoggedIn: false });
      throw err; // Rethrow the error to be caught in the login form
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${BASE}/users/profile`, {
        withCredentials: true,
      });
      setAuthState({ isLoggedIn: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Oh no, we faild to fetch your profile");
    }
  };

  const signup = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    image?: string,
    contractNumber?: string
  ) => {
    try {
      const response = await axios.post(`${BASE}/users`, {
        name,
        email,
        phone,
        password,
        image,
        contractNumber,
      });
      if (response.data.jwt) {
        setAuthState({ isLoggedIn: true });
      }
    } catch (err) {
      console.error(err);
      setAuthState({ isLoggedIn: false });
    }
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ authState, useAuth, login, getProfile, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}
