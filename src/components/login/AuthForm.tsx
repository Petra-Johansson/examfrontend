'use client';
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "../../app/api/users/apiCalls";
import styles from './login.module.css';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from "@/hooks/useAuth";
import { AuthContext } from "@/context/AuthenticationContext";

const AuthForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { userLogin } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await userLogin({ email, password })
            router.push('/account/user')
        } catch (error: any) {
            console.log(error.message);
            if (error.message.includes('Email')) {
                setEmailError(error.message);
            } else if (error.message.includes('password')) {
                setPasswordError(error.message);
            } else {
                setEmailError('An error occurred. Please try again later.');
            }
        }
    }
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordError('');
    };


    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                {passwordError && <div className={styles.errorMessage}>
                    <FontAwesomeIcon icon={faTriangleExclamation} /><br />
                    <p>
                        {passwordError}
                    </p>
                </div>}

                {emailError && <div className={styles.errorMessage}>
                    <FontAwesomeIcon icon={faTriangleExclamation} /><br /><p>
                        {emailError}</p></div>}
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" />

                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit">Log in</button>
            </form>
        </>
    )
}

export default AuthForm;