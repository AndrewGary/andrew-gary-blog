import React, { useState, useEffect, useRef } from "react";
import date from 'date-and-time';
import { currentProjects } from "../../utils/projects";
import ContentEditable from "react-contenteditable";
import AddLink from "../../components/AddLink";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context){
	return {
		props: {
			session: await unstable_getServerSession(
				context.req,
				context.res,
				authOptions
			)
		}
	}
}

const initailVallues = {
	postName: "",
	postSubtitle: "",
	postPreviewDescription: "",
	postContent: "",
	videoUrl: '',
	postThumbnail: "",
	project: null
};

const CreatePost = () => {
	const { data: session } = useSession();

	const router = useRouter();
	
	const [formValues, setFormValues] = useState(initailVallues);
	const [pageMessage, setPageMessage] = useState("");
	const [insertActive, setInsertActive] = useState({active: false, type: ''});
	const text = useRef('');

	const handleChange = (e) => {

		if(e.target.name === 'project'){

			const indexValue = parseInt(e.target.value); 

			setFormValues({
				...formValues,
				project: {...currentProjects[indexValue]}
			})
		}else{
			setFormValues({
				...formValues,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		const now = new Date();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				postName: formValues.postName,
				postSubtitle: formValues.postSubtitle,
				postPreviewDescription: formValues.postPreviewDescription,
				postContent: text.current,
				videoURL: formValues.videoUrl,
				date: date.format(now, 'MM/DD/YYYY'),
				time: date.format(now, 'HH:mm:ss:A'),
				project: {...formValues.project},
				timeStamp: Date.now()
			}),
		};

		fetch("/api/blogPost", requestOptions)
			.then((resp) => {
				if (resp.status === 201) {
					setPageMessage("Post successfully uploaded");

					setTimeout(() => {
						router.push('/')
					}, 1000)
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleContentChange = e => {
		text.current = e.target.value;
	}

    const handleSaveDraft = async e => {
        e.preventDefault();

        const now = new Date();

        const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				postName: formValues.postName,
				postSubtitle: formValues.postSubtitle,
				postPreviewDescription: formValues.postPreviewDescription,
				postContent: text.current,
				videoURL: formValues.videoUrl,
				date: date.format(now, 'MM/DD/YYYY'),
				time: date.format(now, 'HH:mm:ss:A'),
				project: {...formValues.project}
			}),
		};

        const resp = await fetch('/api/drafts', requestOptions)

		router.push('/AllDrafts')
    }

	const insertLink = e => {
		e.preventDefault();
		setInsertActive({
			...insertActive,
			active: !insertActive.active,
			type: e.target.name
		})
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
				<h1 className="flex justify-center border-b border-slate-300 w-5/6 text-3xl">
					New Post
				</h1>
				<div>{pageMessage}</div>
				<form className=" w-1/2" onSubmit={handleSubmit}>

					<div className="flex flex-col">
						<label htmlFor="project" className=" text-gray-500">
							Select which project this Post is about.
						</label>
						<select required id="project" name="project" className="text-gray-500 border border-gray-400 w-1/2" onChange={handleChange}>
							<option value=''>--Select Poject--</option>
							{currentProjects.map((project, index) => {
							return <option key={index} value={index}>{project.name}</option>
							})}
						</select>
					</div>

					<div className="flex flex-col">
						<label htmlFor="postName">Post Title</label>
						<input
							required
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
							required	
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
							required
							type="text"
							onChange={handleChange}
							name="postPreviewDescription"
							value={formValues.postPreviewDescription}
							className="border border-black w-full"
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor='videoUrl'>Loom Video URL</label>
						<input
							className="border border-black"
							name='videoUrl'
							type='text'
							onChange={handleChange}
						/>
					</div>
					<label htmlFor="postContent">Post</label>
					<div>
						Insert:
						<button name='link' onClick={insertLink} className="border border-slate-300 hover:border-slate-500 rounded-md">Link</button>
						<button name='youtube' onClick={insertLink} className="border border-slate-300 hover:border-slate-500 rounded-md">Youtube</button>
					</div>

					{insertActive.active ? <AddLink type={insertActive.type} text={text} insertActive={insertActive} setInsertActive={setInsertActive}/> : ''}

					<ContentEditable
						name='postContent'
						className="border border-black bg-white"
						html={text.current}
						onChange={handleContentChange}
					/>
					<div className="flex justify-center">
						<button className="border border-black mt-3 py-2 px-4 rounded-xl" type="submit">Submit</button>
                        <button onClick={handleSaveDraft} className="border border-black mt-3 py-2 px-4 rounded-xl" type="submit">Save Draft</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
