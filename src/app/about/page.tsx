import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <h2>Den här sidan handlar om oss :) </h2>
      <section>
        <p>
          Här kommer jag kanske skriva något vettigt en vacker dag? Kanske
          berätta om projektet? Kanske ha detta som en dle av redovisningen?
        </p>
      </section>
    </div>
  );
}
