import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { dummyPosts } from '../dummyData';

// export const getStaticProps = async () => {

//   const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://andrew-gary-blog-owk02fehp-andrewgary.vercel.app/'

//   const res = await fetch(`${baseURL}api/blogPost`)
//   const data = await res.json();

//   return {
//     props: {
//       yeahhh: data
//     }
//   }
// }

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
