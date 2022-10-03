import React from 'react'
import Header from './Header';
import Head from 'next/head';
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
  return (
    <div className='bg-neutral p-3'>
        <Head>
          <title>Andrew Gary - Dev Blog</title>
        </Head>

        <motion.div initial={{opacity: 0}} transition={{duration: 1}} whileInView={{ opacity: 1}} viewport={{ once: true}}>
          <Header />
        </motion.div>
        { children }
    </div>
  )
}

export default Layout