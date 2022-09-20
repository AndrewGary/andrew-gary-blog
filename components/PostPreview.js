import React from 'react'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/react';

const PostPreview = ({ post, posts, setPosts }) => {

    const router = useRouter();

    const { data: session } = useSession();


    const handleclick = e => {
        router.push(`/posts/${post._id}`)
    }

    console.log('router: ', router)

    const handleDelete = async e => {
        const options = {
            method: 'DELETE'
        }

        const resp = await fetch(`/api/blogPost/${post._id}`, options)

        const newArray = posts.filter(p => p._id !== post._id);

        setPosts(newArray);

        console.log(resp);
    }

  return (
        
    <div className='flex w-full bg-carbon bg-opacity-25 my-3'>
        <div className='flex flex-col w-full py-4 items-center'>
            <div className='flex flex-col justify-center items-center h-2/5'>
                <span onClick={handleclick} className='my-2 text-3xl border-b border-watermellon'>{post.postName}</span>
                <span onClick={handleclick} className='my-2 text-xl'>{post.postSubtitle}</span>
            </div>

            <div className='flex items-center px-10 h-3/5'>
                {post.postPreviewDescription}
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <button  onClick={handleclick} className='w-1/6 flex justify-center items-center border-2 border-carbon font-bold hover:bg-carbon hover:border-2 hover:border-watermellon rounded-xl bg-watermellon transition-all duration-300'>
                    View Post
                </button>
                {session && <button onClick={handleDelete} className='w-1/6 flex justify-center items-center border-2 border-carbon font-bold hover:bg-carbon hover:border-2 hover:border-watermellon rounded-xl bg-watermellon transition-all duration-300'>Delete Post</button>}
            </div>
        </div>
    </div>
    
  )
}

export default PostPreview