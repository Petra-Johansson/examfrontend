"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "@/utility/formatdate";
import styles from "../post/post.module.css";

interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

function UserPosts() {
  const { authState, getUsersPosts } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getUsersPosts();
        setUserPosts(postData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Fetcha posts i usersposts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {userPosts.map((post) => (
        <div className={styles.usersPosts} key={post.id}>
          <div className={styles.usersPostsInfo}>
            <h3 className={styles.usersPostsCard}>{post.title}</h3>
            <p className={styles.usersPostsSubject}>{post.description}</p>
            <p className={styles.usersPostsDetails}>
              {formatDate(post.createdAt)}
            </p>
          </div>
          <div className={styles.btnContainer}>
            <button className={`${styles.actionBtn} ${styles.warning}`}>
              Radera
            </button>
            <button className={`${styles.actionBtn} ${styles.update}`}>
              Uppdatera
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
