import React, { useState, useEffect } from "react";
import axios from "axios";

const initailVallues = {
	postName: "",
	postSubtitle: "",
	postPreviewDescription: "",
	post: "",
	postThumbnail: "",
};

const CreatePost = () => {
	const [formValues, setFormValues] = useState(initailVallues);
	const [pageMessage, setPageMessage] = useState("");

	const handleChange = (e) => {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	};

	const handlePostChange = (e) => {
		console.log(e);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const idk = document.getElementsByName("post");

		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				postName: formValues.postName,
				postSubtitle: formValues.postSubtitle,
				postPreviewDescription: formValues.postPreviewDescription,
				post: idk[0].textContent,
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

	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="flex flex-col border border-slate-300 rounded-md items-center w-4/5 h-full py-5 px-4">
				<h1 className="flex justify-center border-b border-slate-300 w-5/6">
					New Post
				</h1>
				<form className=" w-1/2" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<label for="postName">Post Title</label>
						<input
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
							type="text"
							onChange={handleChange}
							name="postPreviewDescription"
							value={formValues.postPreviewDescription}
							className="border border-black w-full"
						/>
					</div>
					<label for="post">Post</label>
					<div
						name="post"
						onChange={handlePostChange}
						className="px-3 w-full h-max border border-black"
						contentEditable="true"
					></div>

					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
