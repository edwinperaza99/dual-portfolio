"use client";

import type React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { HeroSectionType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import HeroPhoto from "@/components/ui/hero-photo";

interface SliderViewProps {
	sliderPositionRef?: React.RefObject<number>;
	onSliderChange?: (position: number) => void;
	heroData: HeroSectionType;
}

function SectionContent({
	variant,
	data,
	scrollLottie,
}: {
	variant: "primary" | "secondary";
	data: HeroSectionType["primary"];
	scrollLottie: string;
}) {
	const hasAnimated = useRef(false);
	const [shouldAnimate, setShouldAnimate] = useState(!hasAnimated.current);

	useEffect(() => {
		hasAnimated.current = true;
		setShouldAnimate(false);
	}, []);

	return (
		<div className="h-screen flex items-center justify-center px-8 md:px-16">
			<motion.div
				initial={shouldAnimate ? { opacity: 0 } : false}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut" }}
				className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center gap-10"
			>
				{/* Text Column */}
				<div className="w-full md:w-1/2 max-w-xl">
					<div
						className={`inline-block rounded-lg px-3 py-1 text-sm mb-4 ${
							variant === "primary"
								? "bg-blue-900/50 border border-blue-500/30"
								: "bg-purple-900/50 border border-pink-500/30"
						}`}
					>
						{data.title}
					</div>
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						<span
							className={`bg-clip-text text-transparent bg-gradient-to-r ${
								variant === "primary"
									? "from-blue-300 to-cyan-400"
									: "from-pink-400 to-purple-400"
							}`}
						>
							{data.name}
						</span>
					</h1>
					<p
						className={`text-lg mb-6 ${
							variant === "primary" ? "text-blue-100" : "text-pink-100"
						}`}
					>
						{data.tagline}
					</p>
					<div className="flex gap-4 mb-8 flex-wrap">
						{data.primaryCTA?.url && (
							<Button
								asChild
								className={`font-semibold px-5 py-2 rounded-md shadow-md transition duration-300 ${
									variant === "primary"
										? "bg-blue-600 text-white hover:bg-blue-500"
										: "bg-pink-600 text-white hover:bg-pink-500"
								}`}
							>
								<Link href={data.primaryCTA.url}>{data.primaryCTA.label}</Link>
							</Button>
						)}
						{data.secondaryCTA?.url && (
							<Button
								asChild
								className={`bg-transparent font-medium px-5 py-2 rounded-md shadow-sm transition duration-300 border ${
									variant === "primary"
										? "border-cyan-300 text-cyan-200 hover:bg-cyan-200/10 hover:text-white hover:border-cyan-100"
										: "border-pink-300 text-pink-200 hover:bg-pink-200/10 hover:text-white hover:border-pink-100"
								}`}
							>
								<Link href={data.secondaryCTA.url}>
									{data.secondaryCTA.label}
								</Link>
							</Button>
						)}
					</div>
					{data.socialLinks && data.socialLinks.length > 0 && (
						<div className="flex items-center gap-4">
							{data.socialLinks.map((link, i) => {
								const Icon = DynamicIcon(link.icon);
								return Icon ? (
									<Link
										key={i}
										href={link.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/60 hover:text-current transition-colors"
										aria-label={link.displayName}
									>
										<Icon className="h-5 w-5" />
									</Link>
								) : null;
							})}
						</div>
					)}
				</div>

				{/* Image Column */}
				<div className="w-full md:w-1/2 flex justify-center md:justify-end">
					<HeroPhoto image={data.image} variant={variant} />
				</div>
			</motion.div>

			<Link
				href="#about"
				className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-16 h-16 flex items-center justify-center"
				aria-label="Scroll to About"
			>
				<DotLottieReact
					src={scrollLottie}
					loop
					autoplay
					className="w-24 h-24"
				/>
			</Link>
		</div>
	);
}

export default function SliderView({
	sliderPositionRef,
	onSliderChange,
	heroData,
}: SliderViewProps) {
	const { primary, secondary } = heroData;

	const isDraggingRef = useRef(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		isDraggingRef.current = true;
		e.preventDefault();
		document.body.classList.add("slider-dragging");
	};

	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
	) => {
		if (!isDraggingRef.current || !containerRef.current) return;

		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const rect = containerRef.current.getBoundingClientRect();
		const containerWidth = rect.width;
		const relativeX = clientX - rect.left;
		const newPosition = (relativeX / containerWidth) * 100;
		const position = Math.min(Math.max(newPosition, 0), 100);

		if (rootRef.current) {
			rootRef.current.style.setProperty("--slider-position", `${position}%`);
		}
		if (sliderPositionRef) sliderPositionRef.current = position;
		if (onSliderChange) onSliderChange(position);
	};

	useEffect(() => {
		const handleGlobalMouseUp = () => {
			if (isDraggingRef.current) {
				isDraggingRef.current = false;
				document.body.classList.remove("slider-dragging");
			}
		};

		window.addEventListener("mouseup", handleGlobalMouseUp);
		window.addEventListener("touchend", handleGlobalMouseUp);

		return () => {
			window.removeEventListener("mouseup", handleGlobalMouseUp);
			window.removeEventListener("touchend", handleGlobalMouseUp);
			document.body.classList.remove("slider-dragging");
		};
	}, []);

	useEffect(() => {
		const position = sliderPositionRef?.current ?? 95;
		if (rootRef.current) {
			rootRef.current.style.setProperty("--slider-position", `${position}%`);
		}
	}, [sliderPositionRef]);

	return (
		<div
			ref={(el) => {
				containerRef.current = el;
				rootRef.current = el;
			}}
			className="relative min-h-screen overflow-hidden"
			onMouseMove={handleMouseMove}
			onTouchMove={handleMouseMove}
			style={
				{
					"--slider-position": `${sliderPositionRef?.current ?? 95}%`,
				} as React.CSSProperties
			}
		>
			{/* Secondary Section */}
			<div className="bg-purple-950 absolute inset-0 z-0 bg-[url('/skulls.png')] bg-repeat">
				<SectionContent
					variant="secondary"
					data={secondary}
					scrollLottie="https://lottie.host/c4495f9a-868f-4cb1-9d6c-f2a291f767c1/i2tUMYCVlh.lottie"
				/>
			</div>

			{/* Primary Section */}
			<div
				className="absolute bg-indigo-950 inset-0 primary-layer z-20 bg-[url('/skulls.png')] bg-repeat"
				style={{
					clipPath: `inset(0 calc(100% - var(--slider-position)) 0 0)`,
				}}
			>
				<SectionContent
					variant="primary"
					data={primary}
					scrollLottie="https://lottie.host/949e8af6-087a-4cd3-8ce8-491733b6ce1c/PmenX962N7.lottie"
				/>
			</div>

			{/* Slider Handle */}
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-ew-resize z-30 backdrop-blur-sm"
				style={{
					left: `var(--slider-position)`,
					boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
				}}
				onMouseDown={handleMouseDown}
				onTouchStart={handleMouseDown}
			>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center cursor-ew-resize transition-transform duration-200 hover:scale-110">
					<div className="flex items-center">
						<ChevronLeft className="h-4 w-4 text-blue-600" />
						<ChevronRight className="h-4 w-4 text-purple-600" />
					</div>
				</div>
			</div>
		</div>
	);
}
