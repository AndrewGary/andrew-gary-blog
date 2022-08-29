import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter();

  const [countdown, setCountdown] = useState(5);
 

  const delay = (num) =>{
    const timerArray = [5, 4, 3, 2, 1];
    setTimeout(() => {
      console.log(timerArray[num])
    }, 1000)
  }

  useEffect(() => {
    for(let i = 0; i < 5; i++){
      delay(i)
    }
  }, [])

  return (
    <div className='w-full h-screen flex-col flex justify-center items-center'>
      <div className='my-4'>
        <h1 className='text-3xl'>Sorry but the page you are looking for does not exist</h1>
      </div>

      <div className='my-4'>
        {/* <h2 className='text-2xl'>Click <Link href='/'><a className=' text-blue-600'>here</a></Link> to go back to the homepage</h2> */}
        <h2 className='text-2xl'>{`redirecting you back to the homepage in ${countdown} seconds`}</h2>
      </div>
    </div>
  )
}

export default NotFound