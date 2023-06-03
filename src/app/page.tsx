import SignupForm from "@/components/login/signup";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to my app =) </h1>
      <SignupForm />
    </main>
  );
}
