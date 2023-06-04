import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Välkommen!</h1>
      <section className={styles.section}>
        <div className={styles.actions}>
          <h3>Har du redan ett konto? </h3>
          <Link href="/account/login">Logg in här!</Link>
        </div>
        <div className={styles.actions}>
          <h3>Har du inget konto?</h3>
          <Link href="/account/signup">Registrera dig här!</Link>
        </div>
      </section>
    </main>
  );
}
