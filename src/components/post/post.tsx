'use client';
import React, { useEffect, useState } from 'react';
import { getPosts } from '@/app/api/posts/apiCalls';
import styles from './post.module.css';
import { timeFormatter } from '@/utils/timeformat';

//defines what we want to get out of the post-object
interface Post {
  id: number;
  title: string;
  user: {name:string};
  subject: string;
  createdAt: string;
  comments: [],
  likes: number;
}

const PostCard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        const fetchedPosts= res.posts;
        setPosts(fetchedPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
  <>
      {posts.length > 0 ? (
          posts.map((post) => (
            <div className={styles.feedCard} key={post.id}>
          <div className={styles.postInfo} >
            <h3 className={styles.cardHeader}>{post.title}</h3>
            <p className={styles.details}>{post.user.name}</p>
            <p className={styles.subject}>{post.subject}</p>
            <p className={styles.details}>{timeFormatter(post.createdAt)}</p>
            <div className={styles.cardFooter}>
              <p className={styles.details}>{post.title}</p>
              <p className={styles.details}>{post.likes}</p>
            </div>
          </div>
    </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
  </>
  );
};

export default PostCard;