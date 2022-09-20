import { useState } from "react";

const AddLink = (props) => {
  const { type, text, insertActive, setInsertActive } = props;
  console.log(type);

  const initalLinkState = {
    linkText: "",
    linkHref: "",
  };

  const [linkInfo, setLinkInfo] = useState(initalLinkState);
  const [youtubeURLState, setYoutubeURLState] = useState("");

  const handleLinkChange = (e) => {
    setLinkInfo({
      ...linkInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleYoutubeURLChange = (e) => {
    setYoutubeURLState(e.target.value);
  };

  const handleFinishYoutubeURL = (e) => {
    e.preventDefault();
    const value = youtubeURLState.replace("watch?v=", "embed/");
    text.current =
      text.current +
      `<iframe width="560" height="315" src="${value}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    // console.log('text.current: ', text.current);
    setInsertActive({
      ...insertActive,
      active: !insertActive.active,
    });
  };

  const handleFinishLink = (e) => {
    e.preventDefault();
    text.current =
      text.current +
      `<a style="color:blue;" href="${linkInfo.linkHref}">${linkInfo.linkText}</a>`;

    setInsertActive(!insertActive);
  };

  if (type === "youtube") {
    return (
      <div className="border border-black w-52 h-32 flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="youtubeURL">Youtube URL</label>
          <input
            type="text"
            // name='youtubeURL'
            name="t"
            onChange={handleYoutubeURLChange}
            className="border border-black"
          />
          <button onClick={handleFinishYoutubeURL}>Finish</button>
        </div>
      </div>
    );
  }
  if (type === "link") {
    return (
      <div className="border border-black w-52 h-32 flex flex-col">
        <div className="flex flex-col">
          <label htmlFor="linkText">Text</label>
          <input
            type="text"
            name="linkText"
            onChange={handleLinkChange}
            className="border border-black"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="linkHref">Href</label>
          <input
            type="text"
            name="linkHref"
            onChange={handleLinkChange}
            className="border border-black"
          />
        </div>

        <button onClick={handleFinishLink}>Finished</button>
      </div>
    );
  }
};

export default AddLink;
