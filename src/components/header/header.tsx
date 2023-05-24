import Navbar from "./navbar";
import styles from './header.module.css';
import Link from "next/link";

const Header = ()=> {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link href="/">NAMN ELLER LOGO</Link>
            </div>
        <Navbar/>
    </div> 
    )}

    export default Header;