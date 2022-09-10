import React, { useState, useEffect } from "react";
import date from 'date-and-time';
import { currentProjects } from "../utils/projects";



const initailVallues = {
	postName: "",
	postSubtitle: "",
	postPreviewDescription: "",
	postContent: "",
	postThumbnail: "",
	project: null
};

const CreatePost = () => {
	const [formValues, setFormValues] = useState(initailVallues);
	const [pageMessage, setPageMessage] = useState("");
	const [postMaterial, setPostMaterial] = useState('');

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

	const processConent = (string) => {
		console.log(string)
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		let letsSee = processConent(postMaterial)

		
		const now = new Date();

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				postName: formValues.postName,
				postSubtitle: formValues.postSubtitle,
				postPreviewDescription: formValues.postPreviewDescription,
				postContent: postMaterial,
				date: date.format(now, 'MM/DD/YYYY'),
				time: date.format(now, 'HH:mm:ss:A'),
				project: {...formValues.project}
			}),
		};

		fetch("/api/blogPost", requestOptions)
			.then((resp) => {
				if (resp.status === 201) {
					setPageMessage("Post successfully uploaded");
					setFormValues(initailVallues);
					idk[0].textContent = "";
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleContentChange = e => {

		if(e.key === 'Enter'){
			setPostMaterial(postMaterial + '<br>')
		}else if(e.key === 'Backspace'){
			const gg = postMaterial.slice(0, -1);

			setPostMaterial(gg);
		}else if(e.key === 'Shift' || e.key === 'CapsLock' || e.key === 'Control' || e.key === 'Alt'){
			
		}else if(e.key === 'Tab'){
			console.log(e.key)
		}else{
			setPostMaterial(
				postMaterial + e.key
			)
		}
		// if(e.key === 'Shift'){

		// } else if(e.key === 'Backspace'){
		// 	console.log(postMaterial[0])
		// }else{
		// 	setPostMaterial(postMaterial + e.key)
		// }
		
	}

	useEffect(() => {
		console.log(postMaterial);
	}, [postMaterial])

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="flex flex-col border border-slate-300 rounded-md items-center w-4/5 h-full py-5 px-4">
				<h1 className="flex justify-center border-b border-slate-300 w-5/6">
					New Post
				</h1>
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
						<label for="postName">Post Title</label>
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
						<label for="postSubtitle">Post Subtitle</label>
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
						<label for="postPreviewDescription">Post Preview Description</label>
						<input
							required
							type="text"
							onChange={handleChange}
							name="postPreviewDescription"
							value={formValues.postPreviewDescription}
							className="border border-black w-full"
						/>
					</div>
					<label for="postContent">Post</label>
					<div
						name="postContent"
						className="px-3 w-full h-max border border-black"
						contentEditable="true"
						onKeyDown={(e) => {if(e.key === 'Tab'){e.preventDefault()}}}
						onKeyUp={handleContentChange}
					></div>

					<button type="submit">Submit</button>
				</form>

				{/* <div className="border border-slate-200 w-full">

					{postMaterial}
				</div> */}
				<div className='w-full h-auto' dangerouslySetInnerHTML={{ __html: postMaterial }} />
			</div>
		</div>
	);
};

export default CreatePost;
