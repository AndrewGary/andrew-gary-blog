import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { connectToDatabase } from '../utils/mongoConnection';
import FilterPosts from '../components/FilterPosts';

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
  const [filteredPosts, setFilteredPosts] = useState([]);

  return (
    <>
    {/* <button onClick={populatePosts}>populate</button> */}
    <FilterPosts posts={posts} filteredPosts={filteredPosts} setFilteredPosts={setFilteredPosts}/>
    
    {filteredPosts.length ? <div className='flex flex-col min-h-screen'>
      {filteredPosts.map((post, index) => {
        return <PostPreview key={index} post={post} posts={posts} setPosts={setPosts}/>
      })}
    </div> : 
    <div className='flex flex-col min-h-screen'>
      {posts.map((post, index) => {
        return <PostPreview key={index} post={post} posts={posts} setPosts={setPosts}/>
      })}
    </div>
}
    </>
  )
}
