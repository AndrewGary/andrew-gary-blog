import { useState } from "react";

const AddLink = (props) => {

	const {text, insertActive, setInsertActive} = props;

	const initalLinkState = {
		linkText: '',
		linkHref: ''
	}

	const [linkInfo, setLinkInfo] = useState(initalLinkState);

	const handleLinkChange = e => {
		setLinkInfo({
			...linkInfo,
			[e.target.name]: e.target.value
		})
	}

	const handleFinishLink = e => {
		e.preventDefault();
		text.current = text.current + `<a style="color:blue;" href="${linkInfo.linkHref}">${linkInfo.linkText}</a>`

		setInsertActive(!insertActive);
	}

	return (
		<div className="border border-black w-52 h-32 flex flex-col">
			<div className="flex flex-col">
			<label for='linkText'>Text</label>
			<input
				type='text'
				name='linkText'
				onChange={handleLinkChange}
				className="border border-black"
			/>
			</div>

			<div className="flex flex-col">
			<label for='linkHref'>Href</label>
			<input
				type='text'
				name='linkHref'
				onChange={handleLinkChange}
				className="border border-black"
			/>
			</div>

			<button onClick={handleFinishLink}>Finished</button>

		</div>
	)
}

export default AddLink;