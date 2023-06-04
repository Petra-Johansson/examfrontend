"use client";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./header.module.css";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { authState } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">HOWDIEDODII</Link>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.navlist}>
          <li className={styles.navItem}>
            <Link href="/">Hem</Link>
          </li>

          <li className={`${styles.navItem} ${styles.dropdown}`}>
            <Link href="#" className={styles.account}>
              Konto
            </Link>
            <ul className={styles.dropdownItems}>
              <li className={styles.navItem}>
                <Link href="/account/user" className={styles.onHover}>
                  Profil
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/feed" className={styles.onHover}>
                  Nyhetsflödet
                </Link>
              </li>
              <li className={styles.navItem}>
                {authState?.isLoggedIn ? (
                  <Link href="/account/logout">Logga ut </Link>
                ) : (
                  <Link href="/account/login">Logga in </Link>
                )}
              </li>
            </ul>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.onHover}>
              Om oss
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
