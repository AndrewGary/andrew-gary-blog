import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import * as loom from "@loomhq/loom-embed";
import { connectToDatabase } from "../../utils/mongoConnection";
const { ObjectId } = require("mongodb");
import { motion } from "framer-motion";

export const getStaticPaths = async () => {
	const connection = await connectToDatabase();

	const db = connection.db;

	const allPosts = await db.collection("blogPosts").find({}).toArray();

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
	const res = await db
		.collection("blogPosts")
		.findOne({ _id: ObjectId(context.params.id) });

	const aa = JSON.stringify(res);

	const data = JSON.parse(aa);

	return {
		props: { post: data },
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
		};
		fetchVideo();
	}, []);

	if (router.isFallback) {
		return (
			<>
				<h1>Loading</h1>
			</>
		);
	}
	//STOP HERE
	return (
		<div className="flex justify-center items-start w-full min-h-screen">
			<div className="w-4/5 sm:w-full h-full flex flex-col">
				<div className="flex sm:flex-col w-full h-2/5">
					<motion.div
						initial={{
							x: -200,
							opacity: 0
						}} 
						whileInView={{
							x: 0,
							opacity: 1
						}}
						transition={{
							duration: .6
						}}
						viewport={{once: true}}
						className="flex flex-col w-1/2 sm:w-full min-h-full items-center justify-center bg-carbon bg-opacity-25 rounded-lg border border-sky sm:border-none py-2">
						<div className="w-full h-1/2 flex flex-col items-center">
							<h1 className="text-7xl sm:text-4xl lg:text-4xl xl:text-5xl border-b-2 border-watermellon text-center">
								{post.postName}
							</h1>
							<h2 className="lg:text-2xl xl:text-3xl text-4xl my-3 text-center">{post.postSubtitle}</h2>
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

						<div className="sm:mt-5 flex flex-col w-full h-1/2 justify-evenly items-center">
							<div className="sm:text-sm border border-watermellon rounded-md min-h-1/2 flex flex-col justify-evenly items-center w-[85%] sm:w-[90%] h-[90%] bg-carbon bg-opacity-40 border-opacity-25">
								{/* <div className="text-3xl uppercase font-bold">Project Info</div> */}
								<div className="flex flex-col h-1/3 items-center justify-center">
									{/* <div> */}
										<span className="sm:text-xl text-2xl font-bold custom830:text-md">
											{post.project.name && post.project.name}
										</span>
									{/* </div> */}

									<div>
										<Link href={post.project.gitHub}>
											<a className="sm:text-sm mr-3 text-watermellon font-bold hover:font-extrabold">
												Project Github
											</a>
										</Link>
										<Link href={post.project.deployedLink}>
											<a className="ml-3 text-watermellon font-bold hover:font-extrabold">
												Project Github
											</a>
										</Link>
									</div>

									<span className="text-center text-sm">
										Created on {`${post.date} - ${post.time}`}
									</span>
								</div>
							</div>
						</div>
					</motion.div>

					<div className="sm:hidden w-3"></div>

					<motion.div 
						initial={{
							x: 200,
							opacity: 0
						}} 
						whileInView={{
							x: 0,
							opacity: 1
						}}
						transition={{
							duration: .6
						}}
						viewport={{once: true}}
						className="flex flex-col justify-center items-center w-1/2 sm:w-full min-h-full bg-carbon bg-opacity-25 rounded-lg border border-sky py-2 sm:border-none">
						<span className="mb-3 text-2xl sm:text-xl sm:font-bold">Video Explination</span>
						<motion.div
							initial={{
								opacity: 0
							}} 
							whileInView={{
								opacity: 1
							}}
							transition={{
								duration: .6
							}}
							viewport={{once: true}}
							className="w-1/2 sm:w-[90%] lg:w-3/4 h-auto"
							dangerouslySetInnerHTML={{ __html: loomVideo.html }}
						/>
					</motion.div>
				</div>

				<motion.div 
					initial={{
						y: 400,
						opacity: 0
					}} 
					animate={{
						y: 0,
						opacity: 1
					}}
					transition={{
						duration: .6
					}}
					className="flex justify-start bg-carbon bg-opacity-25 my-2 sm:my-1 rounded-md px-4 sm:px-1">
					<div className="w-4/5">
						{/* <div name="spacer" className="w-1/12 inline-block" /> */}
						<div
							className="w-full h-auto text-2xl sm:text-base font-semibold ml-1 mt-1"
							dangerouslySetInnerHTML={{ __html: post.postContent }}
						/>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default Post;
