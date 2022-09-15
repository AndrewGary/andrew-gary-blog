import React from 'react'
import LoginButton from './LoginButton'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='flex justify-center items-center w-full py-4 bg-carbon mb-4 border-y border-watermellon'>
        <Link href='/'>
        <a className='py-2 px-3 text-black'>
        <span className='text-3xl mr-3'>Web Dev Blog</span> - <span className='text-xl ml-3'>by Andrew Gary</span>
        </a>
        </Link>
    </div>
  )
}

export default Header