import Link from "next/link";
import styles from'./login.module.css';

interface LoginFormProps {
}
const SignupForm: React.FC<LoginFormProps> = () => {
    return(
        <>
        <h2 className={styles.formHeader}>Singup to continue</h2>
        <p className={styles.formParagraph}>Already registered? <span> <Link href="/account/login"> Log in here!</Link></span></p>
        </>
    )
};