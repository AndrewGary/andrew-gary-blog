import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { dummyPosts } from '../dummyData';

export default function Home() {

  const [posts, setPosts] = useState(dummyPosts);

  useEffect(() => {
    console.log('mongo_uri: ', process.env.MONGO_URI);
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      {posts.map((post, index) => {
        return <PostPreview post={post} />
      })}
    </div>
  )
}
