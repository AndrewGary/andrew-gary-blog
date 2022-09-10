import React from 'react'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as loom from '@loomhq/loom-embed'

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
  const resp = await loom.oembed(data.videoURL)

  return {
    props: { post: data,
      video: resp
    }
  }
}

const Post = ({post, video}) => { 

  const { data: session } = useSession();
  const router = useRouter();

  console.log('data: ', post);

  console.log('video: ', video);

  const { postName, postSubtitle, postContent, postThumbnail, date, time, project } = post;

  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='w-4/5 h-full flex flex-col'>
        <div className='flex w-full h-2/5'>
          
          <div className='flex flex-col w-2/3 h-full items-center justify-evenly'>

            <div className='w-full h-2/3 flex flex-col items-center'>
              <h1 className='text-7xl my-3 border-b-2 border-slate-200'>{postName}</h1>
              <h2 className='text-4xl my-3'>{postSubtitle}</h2>
              {session && 
                <button onClick={() => {
                  router.push(`/posts/edit/${post._id}`)
                }} className='border border-black rounded-md'>Edit post</button>
              }
            </div>
            
            <div className='flex flex-col w-full h-1/2 justify-evenly items-center'>
            <div className='border border-slate-200 rounded-md h-full flex flex-col justify-evenly items-center w-1/2 pb-3'>
              <div className='text-3xl'>
                Project Info
              </div>
              <div className='flex flex-col h-1/3 items-center'>
                <div>
                  <span className=' text-2xl font-bold'>{post.project.name}</span>
                </div>

                <div>
                  <Link href={post.project.gitHub}>
                    <a className='mr-3 text-blue-500 font-bold hover:font-extrabold'>
                      Project Github
                    </a>
                  </Link>
                  <Link href={post.project.deployedLink}>
                    <a className='ml-3 text-blue-500 font-bold hover:font-extrabold'>
                      Project Github
                    </a>
                  </Link>
                </div>
                
                <div className=' text-sm'>Created on {`${date} - ${time}`}</div>
              </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center items-center w-1/3 h-full'>
            <div className='w-full h-auto' dangerouslySetInnerHTML={{ __html: video.html }} />
          </div>
        </div>

        <div className='flex justify-start'>
          <div className='mt-5 w-4/5'>
            <div name='spacer' className='w-1/12 inline-block' />
            <div className='w-full h-auto' dangerouslySetInnerHTML={{ __html: postContent }} />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;