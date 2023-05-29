'use client';
import React, { useState, createContext } from "react";
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    image: string;
    contractNumber: string;
}
interface UserState {
    loading: boolean;
    error: string | null;
    data: User | null;
}

interface AuthState extends UserState {
    setAuthState: React.Dispatch<React.SetStateAction<UserState>>;
}
export const AuthContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: ()=>{},

});

export default function AuthenticationContext({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<UserState>({
        loading: true,
        data: null,
        error: null,
    });
    return (
        <AuthContext.Provider value={{ ...authState, setAuthState }}>
            <div>{children}</div>
        </AuthContext.Provider>
    );
}