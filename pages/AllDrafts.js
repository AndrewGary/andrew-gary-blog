import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';

// export const getStaticProps = async () => {
//     const connection = await connectToDatabase();

//     const db = connection.db;

//     const response = await db.collection('drafts').find({}).toArray();

//     const stringified = JSON.stringify(response);

//     const allDrafts = JSON.parse(stringified);

//     return {
//         props: {
//             allDrafts: allDrafts
//         }
//     }

// }

const AllDrafts = (props) => {

  
  const router = useRouter();
  
  const [ allDrafts, setAllDrafts ] = useState([]);
  
  useEffect(() => {
    const effectFunction = async (e) => {
      const resp = await fetch('/api/drafts');

      const data = await resp.json();
      setAllDrafts(data);
      console.log('data: ' ,data);
    }

    effectFunction();
  }, [])

  return (
    <div className='w-full min-h-screen flex justify-center'>
        <table className='w-4/5'>
          <thead>
          <tr className='w-full flex justify-evenly border-b border-black'>
            <th>POST NAME</th>
            <th>UPLOAD DATE/TIME</th>
            <th>MANAGE</th>
          </tr>
          </thead>
          <tbody>
          {allDrafts.map((draft, index) => {

            // index % 2 === 0 ? blah = 'w-full flex justify-evenly bg-slate bg-opacity-50' : blah = 'w-full flex justify-evenly bg-slate bg-opacity-25'
            return (
              <tr key={index} className={'border-b py-2 w-full flex justify-evenly bg-carbon ' + (index % 2 ? 'bg-opacity-50' : '')}>
              {/* <tr key={index} className={'py-2 w-full flex justify-evenly bg-carbon border-b'}> */}

                <td className='w-1/3 border-r flex justify-center'>{draft.postName}</td>
                <td className='w-1/3 flex justify-center'>{draft.date} - {draft.time}</td>
                <td className='w-1/3 flex justify-center'>
                  <button onClick={e => {
                    router.push(`/CreatePost/${draft._id}`)
                  }} className='border border-black rounded-md bg-sky w-1/2 hover:bg-opacity-50'>Edit</button>
                  <button onClick={async () => {
                    const resp = await fetch(`/api/drafts/${draft._id}`, {method: 'DELETE'})
                    if(resp.status === 200){
                      setAllDrafts(allDrafts.filter(item => item._id !== draft._id))
                    }
                  }} className='border border-black rounded-md bg-watermellon w-1/2 hover:bg-opacity-50'>Delete Draft</button>
                </td>
              </tr>
            )
          })}
          </tbody>

        </table>
      {/* {allDrafts.map(draft => <DraftPreview draft={draft} />)} */}

    </div>
      
  )
}

export default AllDrafts