"use client";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import PostForm from "@/components/post/PostForm";
import { useState } from "react";
import SortPosts from "@/components/SortPosts";
//import styles from '../../components/post/post.module.css';

export default function Page() {
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <>
      <div className={styles.actions}>
        <SortPosts />
        <button onClick={handleModal}> Add new post</button>
        <PostForm isOpen={modal} isClosed={handleCloseModal} />
      </div>

      <section className={styles.feed}>
        <h2 className={styles.heading}>ALL POSTS</h2>
        <div className={styles.feedCard}>
          <div className={styles.postInfo}>
            <h3 className={styles.cardHeader}>Det här är en titel</h3>
            <p className={styles.details}>Petra Johansson</p>
            <p className={styles.subject}>
              Den här texten kan vara nästan hur lång som helst. Men det borde
              kanske finnas en gräns för hur mkt som ska synas innan man får
              trycker på Visa mer?
            </p>
            <p className={styles.details}>10:32 - 20 maj 2023</p>
          </div>
          <div className={styles.cardFooter}>
            <p className={styles.details}>Comments</p>
            <p className={styles.icon}>
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
