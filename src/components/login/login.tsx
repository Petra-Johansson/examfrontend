import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/router";
import { userLogin } from "../../app/api/connection";
import styles from './login.module.css';

interface LoginFormProps {
}
const LoginForm: React.FC<LoginFormProps> = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter;
    
    const handleSubmit = async (event: FormEvent) => {
        console.log(email, password)

        event.preventDefault();

        try {
            const credentials = { email, password };
            const user = await userLogin(credentials);
            router.push('/user')
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
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Please login to continue</h2>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </>
    )

}
export default LoginForm;    