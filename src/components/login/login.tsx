'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "../../app/api/users/apiCalls";
import styles from './login.module.css';
import Link from "next/link";

interface LoginFormProps {
}
const LoginForm: React.FC<LoginFormProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const credentials = { email, password };
            const { user } = await userLogin(credentials);
            console.log(user)
            router.push('/account/user')
        } catch (error) {
            console.log(error)
        }
    }
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };
    return (
        <>
            <h2 className={styles.formHeader}>Login to continue</h2>
            <p className={styles.formParagraph}>Not registered? <span> <Link href="#"> Sign up here!</Link></span></p>
                       <form onSubmit={handleSubmit} className={styles.form}>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>
    )

}
export default LoginForm;    