'use client'
import { useRouter } from "next/navigation";
import styles from '../page.module.css';
import Link from "next/link";
import UserCard from "@/components/user/user";

export default function Page() {
  const router = useRouter();

  return (
    
    <section className={styles.main}>
      <h2>Hey , this is your profile</h2>

      <UserCard/>
      <div className={styles.linkSection}>
      <button className={styles.blueBtn}><Link href="/feed" className={styles.profileLinks}>Go to messageboard</Link></button>
      <button className={styles.redBtn}> <Link href="#" className={styles.profileLinks}>Log Out</Link></button>
      </div>
    </section>
  )
    
};