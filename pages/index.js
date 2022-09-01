import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { dummyPosts } from '../dummyData';

export const getStaticProps = async () => {

  const res = await fetch('http://localhost:3001/api/blogPost')
  const data = await res.json();

  return {
    props: {
      yeahhh: data
    }
  }
}

export default function Home({yeahhh}) {

  const [posts, setPosts] = useState(yeahhh);

  useEffect(() => {
    console.log('yeahhh: ', yeahhh);
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      {posts.map((post, index) => {
        return <PostPreview key={index} post={post} />
      })}
    </div>
  )
}
