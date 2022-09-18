import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';

export default function Home(props) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = await fetch('/api/blogPost');
      const data = await allPosts.json();
      setPosts(data);
    }
    fetchPosts();

  }, [])

  return (
    <>
    {/* <button onClick={populatePosts}>populate</button> */}
    <div className='flex flex-col min-h-screen'>
      {posts.map((post, index) => {
        return <PostPreview key={index} post={post} />
      })}
    </div>
    </>
  )
}
