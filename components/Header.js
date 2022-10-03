import React from "react";
import Link from "next/link";

const Header = () => {
	return (
		<div className="flex justify-center items-center w-full py-4 bg-carbon mb-4 sm:mb-0 border-y border-watermellon hover:bg-opacity-50">
			<Link href="/">
				<a className="sm:flex sm:flex-col py-2 px-3 text-black">
					<span className="text-3xl">Web Dev Blog</span> 
					<span className="text-xl ml-3">- by Andrew Gary</span>
				</a>
			</Link>
		</div>
	);
};

export default Header;
