import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(5);


  useEffect(() => {
    if(countdown !== 0){
    setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    }else{
      router.push('/')
    }
  }, [countdown])

  return (
    <div className='w-full h-screen flex-col flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center border border-slate-300 rounded-md w-3/5 h-3/5'>
      <div className='my-4'>
        <h1 className='text-3xl'>Sorry, the page you are looking for does not exist</h1>
      </div>

      <div className='my-4'>
        {/* <h2 className='text-2xl'>Click <Link href='/'><a className=' text-blue-600'>here</a></Link> to go back to the homepage</h2> */}
        <h2 className='text-2xl'>Redirecting you back to the homepage in {<span className='text-red-500 font-bold'>{countdown}</span>} seconds. </h2>
      </div>
      </div>
    </div>
  )
}

export default NotFound