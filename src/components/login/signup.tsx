'use client';
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import styles from'./login.module.css';
import { signupUser } from "@/app/api/users/apiCalls";
import {useRouter} from "next/navigation";

interface LoginFormProps {
}
const SignupForm: React.FC<LoginFormProps> = () => {

    const [email, setEmail] =useState('');
    const [name, setName] =useState('');
    const [phone, setPhone] =useState('');
    const [contractNo, setContractNo] =useState('');
    const [image, setImage] =useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try{
            const credentials = { email, name, phone, contractNo, image, password };
            const { user } = await signupUser(credentials);
            router.push('/account/user')
        }catch(error){

        }
    };
    
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
    }
    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    }
    const handleContractNoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContractNo(event.target.value);
    }
    return(
        <>
        <h2 className={styles.formHeader}>Singup to continue</h2>
        <p className={styles.formParagraph}>Already registered? <span> <Link href="/account/login"> Log in here!</Link></span></p>

        <form onSubmit={handleSubmit} className={styles.form}>
                <input type="email" value={email} onChange={handleEmailChange} placeholder="Your Email" />
                <input type="text" value={name} onChange={handleNameChange} placeholder="Your Name" />
                <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Your Phonenumber" />
                <input type="text" value={contractNo} onChange={handleContractNoChange} placeholder="Your Contract number" />
                <input type="file" value={image} onChange={handleImageChange} />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
};