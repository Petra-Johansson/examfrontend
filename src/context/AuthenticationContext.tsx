'use client';
import React, { useState, useEffect, createContext } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
const BASE = 'http://localhost:8080';

interface User {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
    contractNumber?: string;
}
interface UserState {
    loading: boolean;
    error: string | null;
    data: User | null;
}

interface AuthState extends UserState {
    setAuthState: React.Dispatch<React.SetStateAction<UserState>>;
    updateAccessToken: (accessToken: string) => void;

}
export const AuthContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: () => { },
    updateAccessToken: () => { },
});

export default function AuthenticationContext({ children }: { children: React.ReactNode }) {
    const [authState, setAuthState] = useState<UserState>({
        loading: true,
        data: null,
        error: null,
    });

    const getUser = async () => {
        setAuthState({
            loading: true,
            data: null,
            error: null,
        });

        try {
            const token = getCookie('token')
            if (!token) {
                return setAuthState({
                    loading: false,
                    data: null,
                    error: null,
                });
            }
            const res = await axios.get(`${BASE}/authentication/user`, {
                headers: { Authorization: `Bearer ${token}` },

            })
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setAuthState({
                loading: false,
                data: res.data,
                error: null,
            })

        } catch (error: any) {

            if (error.response.status === 401) {
              const refreshToken = getCookie('refreshToken');
              if (refreshToken) {
                try {
                  const refreshRes = await axios.post(
                    `${BASE}/authentication/refresh`,
                    { refreshToken }
                  );
                  const newAccessToken = refreshRes.data.accessToken;
                  setAuthState((prevState) => ({
                    ...prevState,
                    data: {
                      ...prevState.data,
                      accessToken: newAccessToken,
                    },
                  }));
                  axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
      
                  // Retry the original request or make a new request to get the user data
                  const res = await axios.get(`${BASE}/authentication/user`);
                  setAuthState({
                    loading: false,
                    data: res.data,
                    error: null,
                  });
                } catch (error:any) {
                  // Handle refresh token error
                  setAuthState({
                    loading: false,
                    data: null,
                    error: error.message,
                  });
                }
              } else {
                // Handle case where refresh token is missing
                setAuthState({
                  loading: false,
                  data: null,
                  error: 'Refresh token is missing',
                });
              }
            } else {
              // Handle other error scenarios
              setAuthState({
                loading: false,
                error: error.response.error.message,
                data: null,
              });
            }
          }
        };
      
        const updateAccessToken = (accessToken: string) => {
          setAuthState((prevState) => ({
            ...prevState,
            data: {
              ...prevState.data,
              accessToken: accessToken,
            },
          }));
        };
      
        useEffect(() => {
          const getUserAndHandleErrors = async () => {
            try {
              await getUser();
            } catch (error) {
              // Handle error scenarios
            }
          };
      
          getUserAndHandleErrors();
        }, []);
    return (
        <AuthContext.Provider value={{ ...authState, setAuthState, updateAccessToken }}>
            <div>{children}</div>
        </AuthContext.Provider>
    );
}