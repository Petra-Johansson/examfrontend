"use client";
import Link from "next/link";
import styles from "../app/page.module.css";

function RedirectToLogin() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <h2> För att komma åt den här sidan behöver du vara inloggad</h2>
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
export default RedirectToLogin;
