import React from 'react'
import Link from 'next/link'

const PostPreview = () => {
  return (
    <Link>
    <div className='flex border border-green-500 w-full h-2/5 '>
        <div className='flex flex-col w-2/3 border border-red-500'>
            <div className='flex flex-col justify-center items-center h-2/5'>
                <span className='my-2 text-3xl'>Post 1 Title</span>
                <span className='my-2 text-xl'>Post 1 Subtitle</span>
            </div>

            <div className='flex items-center px-10 h-3/5'>
                Minim est consectetur occaecat in qui id. Elit qui est fugiat cillum reprehenderit esse officia pariatur in in nisi sunt sunt labore. Eu ut aliqua incididunt aliquip sit occaecat cillum labore ullamco pariatur labore. Labore aute excepteur anim excepteur occaecat cupidatat esse incididunt id in.
                Esse cupidatat ex exercitation fugiat officia cillum aliquip adipisicing occaecat voluptate aliqua amet mollit aute. Eiusmod nisi pariatur quis dolore deserunt quis incididunt sunt. Et proident et enim culpa commodo aute mollit.
            </div>
        </div>

        <div className='w-1/3 border border-red-500'>

        </div>
    </div>
    </Link>
  )
}

export default PostPreview