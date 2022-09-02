import React from 'react'
import { useRouter } from 'next/router'

export const getStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api/blogPost');
  const data = await res.json();

  const paths = data.map(check => {
    return {
      params: { id: check._id.toString()}
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/blogPost/${id}`)
  const data = await res.json();

  return {
    props: { post: data }
  }
}

const Post = ({post}) => { 

  const { postName, postSubtitle, postPreviewDescription, postContent, postThumbnail, date, time } = post;

  console.log('post: ', post);

  return (
    <div className='flex justify-center items-center w-full h-screen border border-red-500'>
      <div className='w-4/5 h-full border border-green-500 flex flex-col'>
        <div className='flex w-full h-2/5 border border-purple-500'>
          <div className='flex flex-col w-2/3 h-full border border-red-500 items-center justify-evenly'>
            <div className='w-full h-2/3 flex flex-col items-center border border-purple-200'>
              <h1 className='text-7xl my-3 border-b-2 border-slate-200'>{postName}</h1>
              <h2 className='text-4xl my-3'>{postSubtitle}</h2>
              <h3>Created on {`${date} - ${time}`}</h3>
            </div>
            <div >

            </div>
          </div>

          <div className='flex justify-center items-center w-1/3 h-full'>
            Video Goes here
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;