'use client';
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
interface PostFormProps { }

const PostForm: React.FC<PostFormProps> = () => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [tags, setTags] = useState('');
    const router = useRouter();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleSubjectChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSubject(event.target.value);
    };
    return (
        <>
            <h2>Write a neww post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
                <textarea value={subject} onChange={handleSubjectChange} placeholder="Share somthing!" />
            </form>
        </>
    )
};

export default PostForm;