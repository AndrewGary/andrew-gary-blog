import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../utils/mongoConnection';

export const getStaticProps = async () => {

  const connection = await connectToDatabase();

  const db = connection.db;

  const results = await db.collection('blogPosts').find({}).toArray();

  const a = JSON.stringify(results);

  const allPosts = JSON.parse(a);

  return {
    props: {
      allPosts: allPosts
    }
  }
}

export default function Home({allPosts}) {

  useEffect(() => {

    const effectFunction = async () => {

      const requestOptions = {
                method: 'GET', 
            }
      const data = await fetch('/api/blogPost', requestOptions)
      const blah = await data.json();
      setPosts(blah);
    }

    effectFunction();
  },[])

  const [posts, setPosts] = useState(allPosts);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const allPosts = await fetch('/api/blogPost');
  //     const data = await allPosts.json();
  //     setPosts(data);
  //   }
  //   fetchPosts();

  // }, [])

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
