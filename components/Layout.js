import React from 'react'
import Header from './Header';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <div className='bg-neutral p-3'>
        <Head>
          <title>Andrew Gary - Dev Blog</title>
        </Head>
        <Header />
        { children }
    </div>
  )
}

export default Layout