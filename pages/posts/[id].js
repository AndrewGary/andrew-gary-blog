import React from 'react'
import { useRouter } from 'next/router'

const Post = props => {

  const { post } = props;

  // postName: "",
	// postSubtitle: "",
	// postPreviewDescription: "",
	// post: "",
	// postThumbnail: "",

  const { postName, postSubtitle, postPreviewDescription, postContent, postThumbnail } = post;

  const router = useRouter();

  const { id } = router.query;
  return (
    <div className='flex justify-center items-center w-full h-screen border border-red-500'>
      <div className='w-4/5 h-full border border-green-500 flex flex-col'>
        <div className='flex w-full h-2/5 border border-purple-500'>
          <div className='flex flex-col w-2/3 h-full border border-red-500 items-center justify-evenly'>
            <h1>{post.postName}</h1>
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