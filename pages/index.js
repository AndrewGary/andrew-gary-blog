import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { dummyPosts } from '../dummyData';

export default function Home() {

  const [posts, setPosts] = useState(dummyPosts);

  useEffect(() => {
    //Fetch posts here.
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      {posts.map(post => {
        return <PostPreview post={post} />
      })}
    </div>
  )
}
