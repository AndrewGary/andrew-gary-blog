import React, { useState, useEffect, useRef } from "react";
import date from 'date-and-time';
import { currentProjects } from "../utils/projects";
import ContentEditable from "react-contenteditable";
import AddLink from "../components/AddLink";



const initailVallues = {
	postName: "",
	postSubtitle: "",
	postPreviewDescription: "",
	postContent: "",
	videoUrl: '',
	postThumbnail: "",
	project: null
};

// const AddLink = (props) => {

// 	const {text, insertActive, setInsertActive} = props;

// 	const initalLinkState = {
// 		linkText: '',
// 		linkHref: ''
// 	}

// 	const [linkInfo, setLinkInfo] = useState(initalLinkState);

// 	const handleLinkChange = e => {
// 		setLinkInfo({
// 			...linkInfo,
// 			[e.target.name]: e.target.value
// 		})
// 	}

// 	const handleFinishLink = e => {
// 		e.preventDefault();
// 		text.current = text.current + `<a style="color:blue;" href="${linkInfo.linkHref}">${linkInfo.linkText}</a>`

// 		setInsertActive(!insertActive);
// 	}

// 	return (
// 		<div className="border border-black w-52 h-32 flex flex-col">
// 			<div className="flex flex-col">
// 			<label for='linkText'>Text</label>
// 			<input
// 				type='text'
// 				name='linkText'
// 				onChange={handleLinkChange}
// 				className="border border-black"
// 			/>
// 			</div>

// 			<div className="flex flex-col">
// 			<label for='linkHref'>Href</label>
// 			<input
// 				type='text'
// 				name='linkHref'
// 				onChange={handleLinkChange}
// 				className="border border-black"
// 			/>
// 			</div>

// 			<button onClick={handleFinishLink}>Finished</button>

// 		</div>
// 	)
// }

const CreatePost = () => {
	const [formValues, setFormValues] = useState(initailVallues);
	const [pageMessage, setPageMessage] = useState("");
	const [insertActive, setInsertActive] = useState(false);
	const text = useRef('');

	const handleChange = (e) => {
		console.log(e.target.name);

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
		text.current = e.target.value;
	}

	useEffect(() => {
		console.log(text.current);
	}, [text])

	const insertLink = e => {
		e.preventDefault();
		setInsertActive(!insertActive)
	}

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
					<div className="flex flex-col">
						<label for='videoUrl'>Loom Video URL</label>
						<input
							className="border border-black"
							name='videoUrl'
							type='text'
							onChange={handleChange}
						/>
					</div>
					<label for="postContent">Post</label>
					<div>
						Insert:
						<button onClick={insertLink} className="border border-slate-300 hover:border-slate-500 rounded-md">Link</button>
					</div>

					{insertActive ? <AddLink text={text} insertActive={insertActive} setInsertActive={setInsertActive}/> : ''}

					<ContentEditable
						name='postContent'
						className="border border-black"
						html={text.current}
						onChange={handleContentChange}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
