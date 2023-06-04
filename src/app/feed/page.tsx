"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import SortPosts from "@/components/SortPosts";
import PostForm from "@/components/post/postform";
import PostCard, { PostType } from "@/components/post/postcard";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
  const [modal, setModal] = useState(false);
  const { getPost } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getPost();
        setPosts(postData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const handleModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className={styles.actions}>
        <SortPosts posts={posts} setPosts={setPosts} />
        <button onClick={handleModal}>Lägg till ny post</button>
        <PostForm isOpen={modal} isClosed={handleCloseModal} />
      </div>

      <section className={styles.feed}>
        <h2 className={styles.heading}>Alla posts</h2>
        <PostCard posts={posts} />
      </section>
    </>
  );
}
