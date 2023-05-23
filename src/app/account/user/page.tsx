'use client'
import { useRouter } from "next/navigation";
import styles from '../page.module.css';
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  return (
    <section className={styles.main}>
      <h2>Hey , this is your profile</h2>

      <div className={styles.card}>
        <img alt="Profile picture" className={styles.profilePic} />
        <p>name:</p>
        <p>phone:</p>
        <p>email:</p>
        <button className={styles.updateBtn}>Update info</button>
      </div>
      <div className={styles.linkSection}>
      <button className={styles.blueBtn}><Link href="/feed" className={styles.profileLinks}>Go to messageboard</Link></button>
      <button className={styles.redBtn}> <Link href="#" className={styles.profileLinks}>Log Out</Link></button>
      </div>
    </section>
  )
    ;
}