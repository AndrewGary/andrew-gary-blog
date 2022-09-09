import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PostPreview = ({ post }) => {

    const router = useRouter();

    const handleclick = e => {
        router.push(`/posts/${post._id}`)
    }

    const handleDelete = async e => {
        const requestOptions = {
            method: 'DELETE', 
        }

        const res = await fetch(`http://localhost:3000/api/blogPost/${post._id}`, requestOptions)
        router.push('/')
    }
  return (
        
    <div className='flex w-full h-2/5 '>
        <div className='flex flex-col w-full py-4 items-center'>
            <div className='flex flex-col justify-center items-center h-2/5'>
                <span onClick={handleclick} className='my-2 text-3xl underline'>{post.postName}</span>
                <span onClick={handleclick} className='my-2 text-xl'>{post.postSubtitle}</span>
            </div>

            <div className='flex items-center px-10 h-3/5'>
                {post.postPreviewDescription}
            </div>
            <div className='w-full flex justify-center items-center'>
                <button  onClick={handleclick} className='w-1/6 flex justify-center items-center border border-gray-300 hover:border-gray-500 bg-gray-200 hover:bg-gray-400 rounded-xl'>
                    View Post
                </button>

                <button onClick={handleDelete}>
                    Delete this post
                </button>
            </div>
        </div>
    </div>
    
  )
}

export default PostPreview