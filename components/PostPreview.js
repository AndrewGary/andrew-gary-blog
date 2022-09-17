import React from 'react'
import { useRouter } from 'next/router'

const PostPreview = ({ post }) => {

    const router = useRouter();

    const handleclick = e => {
        router.push(`/posts/${post._id}`)
    }

    // const handleDelete = async e => {
    //     const requestOptions = {
    //         method: 'DELETE', 
    //     }

    //     const res = await fetch(`http://localhost:3000/api/blogPost/${post._id}`, requestOptions)
    //     router.push('/')
    // }
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
            <div className='w-full flex justify-center items-center'>
                <button  onClick={handleclick} className='w-1/6 flex justify-center items-center border-2 border-carbon font-bold hover:bg-carbon hover:border-2 hover:border-watermellon rounded-xl bg-watermellon transition-all duration-300'>
                    View Post
                </button>
            </div>
        </div>
    </div>
    
  )
}

export default PostPreview