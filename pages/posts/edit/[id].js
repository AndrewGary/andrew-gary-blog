import React, { useEffect, useState, useRef } from 'react'
import { currentProjects } from '../../../utils/projects';
import { useRouter } from 'next/router';
import ContentEditable from 'react-contenteditable';
import { unstable_getServerSession } from "next-auth";
import { authOptions } from '../../api/auth/[...nextauth]';
import { useSession } from "next-auth/react";

export async function getServerSideProps(context){
    const id = context.params.id;
    const res = await fetch(`http://localhost:3000/api/blogPost/${id}`)
    const data = await res.json();

    return{
        props: {
			post: data,
			session: await unstable_getServerSession(
				context.req,
				context.res,
				authOptions
			)
		}
    }
}

const Component = ({ post }) => {

	const { data: session} = useSession();

	const router = useRouter();
	const text = useRef(post.postContent);
	const [pageMessage, setPageMessage] = useState('');
    const [ formValues, setFormValues ] = useState(post);

    const letSee = post.postContent;

	useEffect(() => {
		console.log(formValues);
	}, [formValues])

    const handleSubmit = e => {
        e.preventDefault();
	


        const postChanges = document.getElementsByName('postContent');

        const upDatedPost = {
            ...formValues,
            postContent: text.current,
			searchQuery: post.postName
        }
		

        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(upDatedPost),
          }
          fetch(`http://localhost:3000/api/blogPost/${post._id}`, requestOptions)
		  .then(resp => {
			if(resp.status === 200){
				console.log('resp: ', resp);
				setPageMessage('Post Updated')

				setTimeout(() => {
					router.back();
				}, 1000)
			}
		  })

    }

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

	const handleContentChange = e => {
		text.current = e.target.value;
	}

	if(!session){
		return (
			<div className="w-full pt-32 flex items-center justify-center">
				<div className="w-1/5 h-1/6 flex flex-col justify-center items-center font-bold text-3xl">
					<div>Access Denied</div>
					<div>Admin Only Page</div>
				</div>
			</div>
		)
	}
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex flex-col border border-slate-300 rounded-md items-center w-4/5 h-full py-5 px-4">
                <h1 className="flex justify-center border-b border-slate-300 w-5/6">
					Edit Post
				</h1>
				<h2 className=' text-green-500'>
					{pageMessage}
				</h2>

                <form className=" w-1/2" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
						<label htmlFor="project" className=" text-gray-500">
							Select which project this Post is about.
						</label>
						<select required id="project" name="project" className="text-gray-500 border border-gray-400 w-1/2" onChange={handleChange}>
							<option>--Select Poject--</option>
							{currentProjects.map((project, index) => {
							return <option key={index} value={index}>{project.name}</option>
							})}
						</select>
					</div>

                    <div className="flex flex-col">
						<label htmlFor="postName">Post Title</label>
						<input
							type="text"
							onChange={handleChange}
							name="postName"
							value={formValues.postName}
							className="border border-black w-full"
						/>
					</div>

                    <div className="flex flex-col">
						<label htmlFor="postSubtitle">Post Subtitle</label>
						<input
							type="text"
							onChange={handleChange}
							name="postSubtitle"
							value={formValues.postSubtitle}
							className="border border-black w-full"
						/>
					</div>

                    <div className="flex flex-col">
						<label htmlFor="postPreviewDescription">Post Preview Description</label>
						<input
							type="text"
							onChange={handleChange}
							name="postPreviewDescription"
							value={formValues.postPreviewDescription}
							className="border border-black w-full"
						/>
					</div>
					<div className='flex flex-col'>
						<label htmlFor='videoURL'>Loom Video URL</label>
						<input
							name='videoURL'
							value={formValues.videoURL}
							onChange={handleChange}
							type='text'
							className="border border-black w-full"
						/>
					</div>

					<div className='flex flex-col'>
						<label htmlFor="postContent">Post</label>
						<ContentEditable
							name='postContent'
							className='border border-black'
							html={text.current}
							onChange={handleContentChange}
						/>
					</div>
                    <button type="submit">Submit</button>

                </form>
            </div>
        </div>
    )
}

export default Component