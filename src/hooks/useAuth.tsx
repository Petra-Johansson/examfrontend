import { useContext } from "react";
import { AuthContext } from "@/context/AuthenticationContext";
import { setCookie, removeCookies } from 'cookies-next';
import axios from 'axios';

const BASE = 'http://localhost:8080';


export const useAuth = () => {
    const { setAuthState, updateAccessToken } = useContext(AuthContext);


    const userLogin = async (credentials: { email: string, password: string }): Promise<void> => {
        try {
            const { email, password } = credentials;
            const res = await axios.post(`${BASE}/authentication/login`, { email, password }, { withCredentials: true });
            if (res.data && res.data.user && res.data.user.token) {
                const token = res.data.user.token;
                // Set the 'Authorization' header with the token for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                // Store the access token in a cookie
                setCookie('token', token);

                // Update the authentication state with user data
                setAuthState({
                    loading: false,
                    data: res.data.user,
                    error: null,
                });
            } else {
                throw new Error('Token/cookie not found in response');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data.errors) {
                const { email, password } = error.response.data.errors;
                throw new Error(email || password);
            }
            throw new Error('Oops, something went wrong');
        }
    };
    const getProfile = async () => {
        try {
            const response = await axios.get(`${BASE}/authentication/user`, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw new Error('Oh no, we failed to fetch your profile');
        }

    }
    return {
        userLogin: userLogin,
        getProfile,
        updateAccessToken
    };

};
