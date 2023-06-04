"use client";
import styles from "../page.module.css";
import Link from "next/link";
import UserCard from "@/components/user/user";

export default function Page() {
  return (
    <section className={styles.main}>
      <UserCard />
      <div className={styles.linkSection}>
        <button className={styles.blueBtn}>
          <Link href="/feed" className={styles.profileLinks}>
            Gå till nyhetsflödet
          </Link>
        </button>
        <button className={styles.redBtn}>
          {" "}
          <Link href="#" className={styles.profileLinks}>
            Logga ut
          </Link>
        </button>
      </div>
    </section>
  );
}
