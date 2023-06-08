import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import styles from "./post.module.css";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "@/utility/formatdate";

interface User {
  name: string;
}
export interface PostType {
  id: string;
  title: string;
  description: string;
  tags: string;
  user: User;
  likes: number;
  createdAt: string;
}
type PostCardProps = {
  posts: PostType[];
};

const PostCard: React.FC<PostCardProps> = ({ posts }) => {
  const { getPost, likePost } = useAuth();
  const [postItems, setPostItems] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = await getPost();
        setPostItems(postData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPosts();
  }, []);
  /*
  useEffect(() => {
    setPostItems(posts); // Update postItems when posts prop changes
  }, [posts]);
*/
  const handleLike = (postId: string) => async () => {
    try {
      await likePost(postId);
      setPostItems((prevPostItems) =>
        prevPostItems.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {postItems.map((post) => (
        <div className={styles.feedCard} key={post.id}>
          <div className={styles.postInfo}>
            <h3 className={styles.cardHeader}>{post.title}</h3>
            <p className={styles.details}>{post.user.name}</p>
            <p className={styles.subject}>{post.description}</p>
            <p className={styles.details}>{formatDate(post.createdAt)}</p>
          </div>
          <div className={styles.cardFooter}>
            <p className={styles.details}>Kommentarer</p>
            <button
              className={styles.icon}
              type="submit"
              onClick={() => handleLike(post.id)}
            >
              <FontAwesomeIcon icon={faHeart} /> {post.likes}
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCard;
