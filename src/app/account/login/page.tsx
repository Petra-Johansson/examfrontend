"use client";
import AuthForm from "@/components/login/loginform";
//import LoginForm from "@/components/login/login";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.formContainer}>
      <AuthForm />
    </div>
  );
}
