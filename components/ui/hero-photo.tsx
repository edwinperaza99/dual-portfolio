"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImageData } from "@/lib/types";

type Props = {
	image: ImageData;
	variant?: "primary" | "secondary";
};

export default function HeroPhoto({ image, variant = "primary" }: Props) {
	const isPrimary = variant === "primary";

	const glowColor = isPrimary
		? "rgba(93, 188, 252, 0.6)" // blue/cyan
		: "rgba(244, 114, 182, 0.6)"; // pink

	const borderColor = isPrimary ? "border-blue-400" : "border-pink-400";

	return (
		<div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72">
			<motion.div
				className="absolute inset-0 rounded-full"
				initial={{ scale: 0.95, opacity: 0.5 }}
				animate={{
					scale: [0.95, 1.05, 0.95],
					opacity: [0.4, 0.8, 0.4],
				}}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
				style={{
					boxShadow: `0 0 25px 8px ${glowColor}`,
					filter: "blur(4px)",
				}}
			/>

			<div
				className={`relative w-full h-full rounded-full overflow-hidden border-[3px] ${borderColor} z-10`}
			>
				<Image
					src={image.asset.url}
					alt="Profile Picture"
					fill
					className="object-cover"
					priority
				/>
			</div>
		</div>
	);
}
