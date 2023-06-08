"use client";
import styles from "../page.module.css";
import Link from "next/link";
import UserCard from "@/components/user/user";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { authState, isLoading } = useAuth();
  const router = useRouter();
  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {
    if (!authState.isLoggedIn) {
      router.push("/");
    }
  }, [authState.isLoggedIn, router]);

  return (
    <section className={styles.main}>
      <UserCard />
      <div className={styles.linkSection}>
        <button className={styles.blueBtn}>
          <Link href="/feed" className={styles.profileLinks}>
            Gå till nyhetsflödet
          </Link>
        </button>
        <button className={styles.blueBtn}>
          <Link href="/account/user/posts" className={styles.profileLinks}>
            Se alla dina posts
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
