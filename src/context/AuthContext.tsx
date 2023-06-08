"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/loading";

const BASE = "http://localhost:8080";
type AuthState = {
  isLoggedIn: boolean;
};

interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  contractNumber?: string;
  image?: string;
}
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
  updateProfile: (data: UpdateProfileData) => Promise<any>;
  createPost: (title: string, description: string) => Promise<any>;
  getPost: () => Promise<any>;
  getUsersPosts: () => Promise<any>;
  likePost: (postId: string) => Promise<any>;
  isLoading: boolean;

  // Include the useAuth hook directly inside AuthContext instead of in a seperate hook-file
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
    updateProfile: (data: UpdateProfileData) => Promise<any>;
    createPost: (title: string, description: string) => Promise<any>;
    getPost: () => Promise<any>;
    getUsersPosts: () => Promise<any>;
    isLoading: boolean;
    likePost: (postId: string) => Promise<any>;
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
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
  });
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
      throw err;
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

  const updateProfile = async (data: UpdateProfileData) => {
    try {
      const response = await axios.put(`${BASE}/users`, data, {
        withCredentials: true,
      });
      setAuthState({ isLoggedIn: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Oh no, we failed to update your profile");
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

  const createPost = async (
    title: string,
    description: string,
    tags?: string
  ) => {
    try {
      const response = await axios.post(
        `${BASE}/posts`,
        { title, description, tags },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Faild to create post");
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(`${BASE}/posts`, {
        withCredentials: true,
      });
      setAuthState({ isLoggedIn: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Oh no, we faild to fetch any posts");
    }
  };

  const likePost = async (postId: string) => {
    try {
      const response = await axios.post(
        `${BASE}/liked-posts/${postId}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Faild to like");
    }
  };

  const getUsersPosts = async () => {
    try {
      const response = await axios.get(`${BASE}/posts/find-by-user`, {
        withCredentials: true,
      });
      setAuthState({ isLoggedIn: true });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Oh no, we faild to fetch any posts");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        useAuth,
        login,
        getProfile,
        updateProfile,
        logout,
        signup,
        createPost,
        getPost,
        getUsersPosts,
        likePost,
        isLoading,
      }}
    >
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
