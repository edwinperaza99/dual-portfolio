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
		? "rgba(93, 188, 252, 0.5)" // cyan
		: "rgba(244, 114, 182, 0.5)"; // pink

	const borderColor = isPrimary ? "border-blue-400" : "border-pink-400";

	// Subtle ripple waves config
	const waveVariants = {
		initial: { scale: 1, opacity: 0.15 },
		animate: { scale: 1.8, opacity: 0 },
	};

	const waveTransition = {
		duration: 3,
		ease: "easeOut",
		repeat: Infinity,
		repeatType: "loop" as const,
	};

	return (
		<div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72">
			{/* Glow pulse */}
			<motion.div
				className="absolute inset-0 rounded-full"
				initial={{ scale: 0.95, opacity: 0.4 }}
				animate={{
					scale: [0.95, 1.05, 0.95],
					opacity: [0.4, 0.7, 0.4],
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

			{/* Subtle wave rings */}
			{[0, 1, 2].map((index) => (
				<motion.div
					key={index}
					className="absolute inset-0 rounded-full border"
					variants={waveVariants}
					initial="initial"
					animate="animate"
					transition={{ ...waveTransition, delay: index * 0.6 }}
					style={{
						borderColor: glowColor,
						filter: "blur(1px)",
					}}
				/>
			))}

			{/* Main image */}
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
