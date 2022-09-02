import PostPreview from '../components/PostPreview';
import { useState, useEffect } from 'react';
import { dummyPosts } from '../dummyData';

export const getStaticProps = async () => {

  const res = await fetch('http://localhost:3000/api/blogPost')
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
  }, [])

  const populatePosts = () => {
    
    for(let i = 0; i < 10; i++){
      const blah = {
        postName: `Post ${i} Title`,
        postSubtitle: `Post ${i} Subtitle`,
        postPreviewDescription: `Mollit ullamco labore tempor aliqua excepteur duis ut elit eiusmod incididunt veniam voluptate. Sint ex commodo consequat proident commodo veniam. Proident esse ex velit voluptate.`,
        postContent: 'Cupidatat sunt dolore proident minim excepteur laborum sit ad magna cillum. Ut qui nostrud tempor id adipisicing irure minim officia ullamco culpa est. Ea ipsum ea deserunt excepteur et quis voluptate esse aliqua. Cupidatat exercitation quis nisi aute reprehenderit culpa sit non enim exercitation eu do veniam quis. Sint veniam ea anim reprehenderit. Magna laboris magna anim enim eiusmod quis ea do commodo proident labore.Ad dolore quis nulla do dolor esse. Sunt commodo incididunt Lorem consequat ullamco. Ipsum ex Lorem labore ut excepteur dolor dolor ullamco id dolor. Labore aliqua culpa id incididunt voluptate culpa id esse aliqua aute Lorem nulla. Proident labore reprehenderit nulla fugiat id aliquip et.Ad eu consectetur quis excepteur sit. Sunt enim anim velit est magna ullamco id deserunt. Commodo consequat qui Lorem cillum reprehenderit sunt aute exercitation. Eiusmod proident sunt elit velit fugiat reprehenderit.'
      }  

      const requestOptions = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(blah)
      }

      fetch('/api/blogPost', requestOptions)
      .then(resp => {
        console.log(resp);
      })
    }
  }

  return (
    <>
    <button onClick={populatePosts}>populate</button>
    <div className='flex flex-col h-screen'>
      {posts.map((post, index) => {
        return <PostPreview key={index} post={post} />
      })}
    </div>
    </>
  )
}
