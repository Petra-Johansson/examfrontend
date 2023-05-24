import Link from 'next/link';
import React, { useState } from 'react';
import styles from './header.module.css';

const Navbar = () => {
    return (
        <>
            
            <nav className={styles.navbar}>
                <ul className={styles.navlist}>

                    <li className={styles.link}><Link href="/">Home</Link>
                    </li>
                    <li className={`${styles.link} ${styles.dropdown}`}>
                        <Link href="#" className={styles.account}>Account</Link>
                        <ul className={styles.dropdownItems}>
                            <li><Link href="/account">Profile</Link></li>
                            <li><Link href="/feed">News feed</Link></li>
                            <li><Link href="/account">Log In/Out</Link></li> 
                        </ul>
                    </li>
                    <li className={styles.link}><Link href="/about">About</Link></li>
                </ul>

            </nav>
        </>
    )
}

export default Navbar;