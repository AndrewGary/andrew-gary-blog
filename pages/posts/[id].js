import React, {useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as loom from "@loomhq/loom-embed";
import { connectToDatabase } from "../../utils/mongoConnection";
const {ObjectId} = require('mongodb');


export const getStaticPaths = async () => {
	const connection = await connectToDatabase();

    const db = connection.db;

	const allPosts = await db.collection('blogPosts').find({}).toArray();

	// const data = await allPosts.json();
	// const res = await fetch("http://localhost:3000/api/blogPost");
	// const data = await res.json();

	const paths = allPosts.map((check) => {
		return {
			params: { id: check._id.toString() },
		};
	});

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async (context) => {
	const connection = await connectToDatabase();

    const db = connection.db;
	const id = context.params.id;
	const res = await db.collection('blogPosts').findOne({ _id : ObjectId(context.params.id)})

	const aa = JSON.stringify(res);

	const data = JSON.parse(aa);

	return {
		props: { post: data},
	};
};

const Post = ({ post }) => {
	const { data: session } = useSession();
	const router = useRouter();

	const [loomVideo, setLoomVideo] = useState({});

	useEffect(() => {
		const fetchVideo = async () => {
			const v = await loom.oembed(post.videoURL);
			setLoomVideo(v);
		}
		fetchVideo();
	}, [])

	if(router.isFallback){
		return(
			<>
			<h1>Loading</h1>
			</>
		)
	}
	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="w-4/5 h-full flex flex-col">
				<div className="flex w-full h-2/5">
					<div className="flex flex-col w-1/2 h-full items-center justify-center bg-carbon bg-opacity-25 rounded-lg border border-sky">
						<div className="w-full h-1/2 flex flex-col items-center">
							<h1 className="text-7xl my-3 border-b-2 border-watermellon">
								{post.postName}
							</h1>
							<h2 className="text-4xl my-3">{post.postSubtitle}</h2>
							{session && (
								<button
									onClick={() => {
										router.push(`/posts/edit/${post._id}`);
									}}
									className="border border-black rounded-md"
								>
									Edit post
								</button>
							)}
						</div>

						<div className="flex flex-col w-full h-1/2 justify-evenly items-center ">
							<div className="border rounded-md h-5/6 flex flex-col justify-evenly items-center w-1/2 pb-3 bg-carbon bg-opacity-40">
								<div className="text-3xl uppercase font-bold">Project Info</div>
								<div className="flex flex-col h-1/3 items-center">
									<div>
										<span className=" text-2xl font-bold">
											{post.project.name && post.project.name}
										</span>
									</div>

									<div>
										<Link href={post.project.gitHub}>
											<a className="mr-3 text-watermellon font-bold hover:font-extrabold">
												Project Github
											</a>
										</Link>
										<Link href={post.project.deployedLink}>
											<a className="ml-3 text-watermellon font-bold hover:font-extrabold">
												Project Github
											</a>
										</Link>
									</div>

									<div className=" text-sm">
										Created on {`${post.date} - ${post.time}`}
									</div>
								</div>
							</div>
						</div>
					</div>

          <div className="w-3">

          </div>

					<div className="flex flex-col justify-center items-center w-1/2 h-full bg-carbon bg-opacity-25 rounded-lg border border-sky">
						<span className="mb-3 text-2xl">Video description of changes</span>
						<div
							className="w-1/2 h-auto"
							dangerouslySetInnerHTML={{ __html: loomVideo.html }}
						/>
					</div>
				</div>

				<div className="flex justify-start">
					<div className="mt-5 w-4/5">
						<div name="spacer" className="w-1/12 inline-block" />
						<div
							className="w-full h-auto"
							dangerouslySetInnerHTML={{ __html: post.postContent }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
