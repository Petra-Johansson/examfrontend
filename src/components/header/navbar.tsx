import Link from 'next/link';
import React, { useState } from 'react';
import styles from './header.module.css';

const Navbar = () => {


    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                    <Link href="/">HOMIIIE</Link>
                </div>
            <nav className={styles.navbar}>
                <ul className={styles.navlist}>

                    <li className={styles.link}><Link href="/">Home</Link>
                    </li>

                    <li className={styles.account}><Link href="/account">Account</Link>
                    </li>
                    <li className={styles.link}><Link href="/about">About</Link>
                    </li>
                </ul>

            </nav>
        </div>
    )
}

export default Navbar;