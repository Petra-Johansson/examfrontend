import styles from './page.module.css'
import { getPosts } from '../api/posts/apiCalls'
import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios';
import PostForm from './post/page';
import PostCard from '@/components/post/post';


export default async function Page() {

    return (

        <section className={styles.feed}>
            <h2 className={styles.heading}>ALL POSTS</h2>
            <PostForm />
            <PostCard />

        </section>

    )
};