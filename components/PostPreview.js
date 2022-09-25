import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DeleteConfirmation from "./DeleteConfirmation";

const PostPreview = ({ post, posts, setPosts }) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const router = useRouter();

  const { data: session } = useSession();

  const handleclick = (e) => {
    router.push(`/posts/${post._id}`);
  };

  const handleDelete = async (e) => {
    setDeleteConfirmation(!deleteConfirmation);
  };

  return (
    <div className="flex w-full bg-carbon bg-opacity-25 my-3">
      <div className="flex flex-col w-full py-4 items-center">
        <div className="flex flex-col justify-center items-center h-2/5">
          <span
            onClick={handleclick}
            className="my-2 text-3xl border-b border-watermellon"
          >
            {post.postName}
          </span>
          <span onClick={handleclick} className="my-2 text-xl">
            {post.postSubtitle}
          </span>
        </div>

        <div className="flex items-center px-10 h-3/5">
          {post.postPreviewDescription}
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <button
            onClick={handleclick}
            className="w-1/6 flex justify-center items-center border-2 border-carbon font-bold hover:bg-carbon hover:border-2 hover:border-watermellon rounded-xl bg-watermellon transition-all duration-300"
          >
            View Post
          </button>
          {session && !deleteConfirmation && (
            <button
              onClick={handleDelete}
              className="w-1/6 flex justify-center items-center border-2 border-carbon font-bold hover:bg-carbon hover:border-2 hover:border-watermellon rounded-xl bg-watermellon transition-all duration-300"
            >
              Delete Post
            </button>
          )}
          {deleteConfirmation && (
            <DeleteConfirmation
              deleteConfirmation={deleteConfirmation}
              setDeleteConfirmation={setDeleteConfirmation}
              id={post._id}
              posts={posts}
              setPosts={setPosts}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
