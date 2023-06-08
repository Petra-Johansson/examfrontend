import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Välkommen!</h1>
      <section className={styles.section}>
        <div className={styles.actions}>
          <h2>Har du redan ett konto? </h2>
          <Link href="/account/login">Logga in här!</Link>
        </div>
        <div className={styles.actions}>
          <h2>Har du inget konto?</h2>
          <Link href="/account/signup">Registrera dig här!</Link>
        </div>
      </section>
    </main>
  );
}
