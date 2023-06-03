"use client";
import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./post.module.css";

type PostFormProps = {
  isOpen: boolean;
  isClosed: () => void;
};

const PostForm = ({ isOpen, isClosed }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [titleError, setTitleError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const { getProfile } = useAuth();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    /*const { data } = await getProfile();
    if (data) {


      try {
      } catch (error: any) {
        console.log(error.message);
        if (error.message.includes("title")) {
          setTitleError(error.message);
        } else if (error.message.includes("subject")) {
          setSubjectError(error.message);
        } else {
          setSubjectError("An error occurred. Please try again later.");
        }
      }
    } else {
      console.log("User is not authorized or token is missing");
    }
    */
  };

  const handleSubject = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSubject(event.target.value);
    setSubjectError("");
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
        <h3>Add a post</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={title}
            onChange={handleTitle}
            required
            placeholder="Title"
          />
          <textarea
            value={subject}
            required
            onChange={handleSubject}
            placeholder="Write your message here!"
          />
          <button type="submit" onClick={isClosed} className={styles.close}>
            Post and Close
          </button>
        </form>
      </div>
    </div>
  );
};
export default PostForm;
