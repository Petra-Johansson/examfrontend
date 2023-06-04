"use client";
import { useAuth } from "../../context/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./post.module.css";

type PostFormProps = {
  isOpen: boolean;
  isClosed: () => void;
};

const PostForm = ({ isOpen, isClosed }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { createPost } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const post = await createPost(title, description);
    } catch (error: any) {
      console.log(error.message);
      if (error.message.includes("title")) {
        setTitleError(error.message);
      } else if (error.message.includes("subject")) {
        setDescriptionError(error.message);
      } else {
        setDescriptionError("An error occurred. Please try again later.");
      }
    }
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
    setDescriptionError("");
  };
  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError("");
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={isClosed}>
          X
        </button>
        {titleError && (
          <div className={styles.errorMessage}>
            <br />
            <p>{titleError}</p>
          </div>
        )}
        {descriptionError && (
          <div className={styles.errorMessage}>
            <br />
            <p>{descriptionError}</p>
          </div>
        )}
        <h3>LÄgg till en post till flödet</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            required
            placeholder="Titel"
          />
          <textarea
            value={description}
            required
            onChange={handleDescription}
            placeholder="Skriv ditt meddalnde här!"
          />
          <button type="submit" onClick={isClosed} id={styles.submit}>
            Skicka post!
          </button>
        </form>
      </div>
    </div>
  );
};
export default PostForm;
