import React from 'react'
import Link from 'next/link'

const PostPreview = ({ post }) => {
  return (
    
    <div className='flex border border-green-500 w-full h-2/5 '>
        <div className='flex flex-col w-2/3 border border-red-500 py-4'>
            <div className='flex flex-col justify-center items-center h-2/5'>
                <span className='my-2 text-3xl underline'>{post.postName}</span>
                <span className='my-2 text-xl'>{post.postSubtitle}</span>
            </div>

            <div className='flex items-center px-10 h-3/5'>
                {post.postSmallDescription}
            </div>
            <div className='w-full flex justify-center items-center'>
                <a className='w-1/6 flex justify-center items-center border border-gray-300 hover:border-gray-500 bg-gray-200 hover:bg-gray-400 rounded-xl'>
                    View Post
                </a>
            </div>
        </div>

        <div className='w-1/3 border border-red-500'>
        </div>
    </div>
    
  )
}

export default PostPreview