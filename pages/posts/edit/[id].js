import React, { useEffect, useState } from 'react'
import { currentProjects } from '../../../utils/projects';

export async function getServerSideProps(context){
    const id = context.params.id;
    const res = await fetch(`http://localhost:3000/api/blogPost/${id}`)
    const data = await res.json();

    return{
        props: {post: data}
    }
}

const Component = ({ post }) => {

	const [pageMessage, setPageMessage] = useState('');

    const [ postBeingEdited, setPostBeingEdited ] = useState(post);
    const [ sectionsThatChanged, setSectionsThatChanged ] = useState([]);

    const letSee = post.postContent;

    const handleSubmit = e => {
        e.preventDefault();
	


        const postChanges = document.getElementsByName('postContent');

		console.log('typeof post.postName: ', typeof post.postName)
		console.log('post.postName: ', post.postName[0])
        const upDatedPost = {
            ...postBeingEdited,
            postContent: postChanges[0].textContent,
			searchQuery: post.postName[0]
        }

		
        console.log('upDatedPost: ', upDatedPost);
		

        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(upDatedPost),
          }
          fetch(`http://localhost:3000/api/blogPost/${post._id}`, requestOptions)
		  .then(resp => {
			if(resp.status === 200){
				console.log('resp: ', resp);
				console.log('resp.status: ', resp.status);
				console.log('about to set pageMessage');
				setPageMessage('Post Updated')
			}
		  })

        e.preventDefault();
    }

    const handleChange = e => {
        if(!sectionsThatChanged.includes(e.target.name)){
            setSectionsThatChanged([ ...sectionsThatChanged, e.target.name])
        }

        setPostBeingEdited({
            ...postBeingEdited,
            [e.target.name]: e.target.value
        })
    }

    const handlePostChange = e => {
        console.log('postContent has changed');
    }

    useEffect(() => {
        console.log('inside edit useEffect');
        console.log('edit post: ', post);
    }, [])

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
						<label for="postName">Post Title</label>
						<input
							type="text"
							onChange={handleChange}
							name="postName"
							value={postBeingEdited.postName}
							className="border border-black w-full"
						/>
					</div>

                    <div className="flex flex-col">
						<label for="postSubtitle">Post Subtitle</label>
						<input
							type="text"
							onChange={handleChange}
							name="postSubtitle"
							value={postBeingEdited.postSubtitle}
							className="border border-black w-full"
						/>
					</div>

                    <div className="flex flex-col">
						<label for="postPreviewDescription">Post Preview Description</label>
						<input
							type="text"
							onChange={handleChange}
							name="postPreviewDescription"
							value={postBeingEdited.postPreviewDescription}
							className="border border-black w-full"
						/>
					</div>

                    <label for="postContent">Post</label>
					<div
						name="postContent"
						onChange={handlePostChange}
						className="px-3 w-full h-max border border-black"
						contentEditable="true"
                        suppressContentEditableWarning={true}
					>{letSee}</div>

                    <button type="submit">Submit</button>

                </form>
            </div>
        </div>
    )
}

export default Component