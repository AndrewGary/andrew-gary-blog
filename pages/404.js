import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className='w-full h-screen flex-col flex justify-center items-center'>
      <div className='my-4'>
        <h1 className='text-3xl'>Sorry but the page you are looking for does not exist</h1>
      </div>

      <div className='my-4'>
        <h2 className='text-2xl'>Click <Link href='/'><a className=' text-blue-600'>here</a></Link> to go back to the homepage</h2>
      </div>
    </div>
  )
}

export default NotFound