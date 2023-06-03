"use client";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useAuthContext can only be used inside and AuthContextProvider"
    );
  }
  return context;
}
