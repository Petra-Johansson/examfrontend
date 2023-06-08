"use client";
import AuthForm from "@/components/login/loginform";
import styles from "./page.module.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.formContainer}>
      <AuthForm />
      <div className={styles.actions}>
        <h3>Saknar du ett konto?</h3>

        <Link href="/account/signup">Registrera dig här</Link>
        <br />
      </div>
    </div>
  );
}
