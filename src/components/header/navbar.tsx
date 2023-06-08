"use client";
import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { authState, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">Grannar emellan</Link>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.navlist}>
          <li className={styles.navItem}>
            <Link href="/">Start</Link>
          </li>

          <li className={`${styles.navItem} ${styles.dropdown}`}>
            <button className={`${styles.navItem} ${styles.dropBtn}`}>
              Konto
            </button>
            <ul className={styles.dropdownItems}>
              <li className={styles.navItem}>
                <Link href="/account/user">Profil</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/feed">Nyhetsflödet</Link>
              </li>
              <li className={styles.navItem}>
                {authState?.isLoggedIn ? (
                  <Link href="/" onClick={handleLogout}>
                    Logga ut
                  </Link>
                ) : (
                  <Link href="/account/login">Logga in</Link>
                )}
              </li>
            </ul>
          </li>
          <li className={styles.navItem}>
            <Link href="/about">Om oss</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
