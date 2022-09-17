import React from 'react'
import date from 'date-and-time';
import * as loom from '@loomhq/loom-embed';

export const getStaticProps = async () => {

  const resp = await loom.oembed('https://www.loom.com/share/84beba96d1884ee98a67ec4fc5073efe')
  // const data = await resp.json();

  return {
    props: {
      yeahhh: resp
    }
  }

}

const now = new Date();

const testing = ({yeahhh}) => {

  if(process.env.NODE_ENV === 'development'){
    console.log('development');
  }

  console.log('yeah: ',yeahhh);
  return (
    <div className='flex w-full h-screen justify-center items-center'>
    <div className='w-1/2 h-auto' dangerouslySetInnerHTML={{ __html: yeahhh.html }} />;
        {/* <div class=\"lo-emb-vid\" style=\"position: relative; padding-bottom: 75%; height: 0;\"><iframe src=\"https://www.loom.com/embed/0281766fa2d04bb788eaf19e65135184\" style=\"position: absolute; top: 0; left: 0; width: 100%; height: 100%;\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div> */}
    </div>
  )
}

export default testing