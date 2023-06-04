import { useState } from "react";
import { sortArrayBy } from "@/utility/sorting";
import { PostType } from "./post/postcard";

type SortPostsProps = {
  posts: PostType[];
  setPosts: (posts: PostType[]) => void;
};

const SortPosts: React.FC<SortPostsProps> = ({ posts, setPosts }) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = () => {
    const sortedPosts = sortArrayBy(
      [...posts], // Create a new array to avoid mutating the original
      "createdAt",
      sortDirection === "asc" ? "desc" : "asc"
    );
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setPosts(sortedPosts);
  };

  return <button onClick={handleSort}>Sortera</button>;
};

export default SortPosts;
