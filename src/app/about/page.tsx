import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>
        Den här sidan skulle kunna handla om oss, om vi var ett riktigt företag
        :){" "}
      </h1>
      <section>
        <p>
          Just nu får det bara vara länkar till mina två repon jag arbetat i
          under projektet{" "}
        </p>
        <div>
          <br />
          <h2>
            <Link href="https://github.com/Petra-Johansson/examfrontend">
              Frontend-repo
            </Link>
          </h2>
          <br />
          <h2>
            <Link href="https://github.com/Petra-Johansson/nestsocialauth">
              Backend-repo
            </Link>
          </h2>
        </div>
      </section>
    </div>
  );
}
