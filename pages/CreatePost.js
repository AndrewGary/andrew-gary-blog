import React, { useState, useEffect } from "react";
const initailVallues = {
  postName: "",
  postSubtitle: "",
  postPreviewDescription: "",
  post: "",
  postThumbnail: "",
};

const CreatePost = () => {
  const [formValues, setFormValues] = useState(initailVallues);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col border border-slate-300 rounded-md items-center w-4/5 h-full py-5 px-4">
        <h1 className="flex justify-center border-b border-slate-300 w-5/6">
          New Post
        </h1>
        <form className=" w-1/2">
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
        </form>
      </div>
    </div>
  );
};

export default CreatePost;