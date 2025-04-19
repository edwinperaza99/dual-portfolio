"use client";

import type React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { HeroSectionType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface SliderViewProps {
	sliderPositionRef?: React.RefObject<number>;
	onSliderChange?: (position: number) => void;
	heroData: HeroSectionType;
}

export default function SliderView({
	sliderPositionRef,
	onSliderChange,
	heroData,
}: SliderViewProps) {
	const { primary, secondary } = heroData;
	const [sliderPosition, setSliderPosition] = useState(
		sliderPositionRef?.current || 0
	);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		setIsDragging(true);
		e.preventDefault();
		document.body.classList.add("slider-dragging");
	};

	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
	) => {
		if (!isDragging || !containerRef.current) return;

		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const rect = containerRef.current.getBoundingClientRect();
		const containerWidth = rect.width;
		const relativeX = clientX - rect.left;
		const newPosition = (relativeX / containerWidth) * 100;
		const position = Math.min(Math.max(newPosition, 0), 100);
		setSliderPosition(position);

		if (sliderPositionRef) sliderPositionRef.current = position;
		if (onSliderChange) onSliderChange(position);
	};

	useEffect(() => {
		const handleGlobalMouseUp = () => {
			if (isDragging) {
				setIsDragging(false);
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
	}, [isDragging]);

	useEffect(() => {
		if (sliderPositionRef) {
			const updatePosition = () => {
				if (sliderPositionRef.current !== sliderPosition) {
					setSliderPosition(sliderPositionRef.current);
				}
			};
			updatePosition();
			const interval = setInterval(updatePosition, 100);
			return () => clearInterval(interval);
		}
	}, [sliderPosition, sliderPositionRef]);

	return (
		<div
			ref={containerRef}
			className="relative min-h-screen overflow-hidden"
			onMouseMove={handleMouseMove}
			onTouchMove={handleMouseMove}
		>
			{/* Secondary Section */}
			<div
				className="bg-purple-950 absolute inset-0 z-0 bg-[url('/skulls.png')] bg-repeat"
				// style={{
				// 	background: "linear-gradient(135deg, #0e0e10 0%, #772ce8 100%)",
				// }}
			>
				<div className="h-screen flex items-center justify-center px-8 md:px-16">
					<div className="max-w-xl">
						<div className="inline-block rounded-lg bg-purple-900/50 border border-pink-500/30 px-3 py-1 text-sm mb-4">
							{secondary.title}
						</div>
						<h1 className="text-4xl md:text-6xl font-bold mb-4">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
								{secondary.name}
							</span>
						</h1>
						<p className="text-lg text-pink-100 mb-6">{secondary.tagline}</p>
						<div className="flex gap-4 mb-8">
							{secondary.primaryCTA?.url && (
								<Button
									asChild
									className="bg-pink-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-pink-500 shadow-md transition duration-300"
								>
									<Link href={secondary.primaryCTA.url}>
										{secondary.primaryCTA.label}
									</Link>
								</Button>
							)}
							{secondary.secondaryCTA?.url && (
								<Button
									asChild
									className="bg-transparent border border-pink-300 text-pink-200 hover:bg-pink-200/10 hover:text-white hover:border-pink-100 font-medium px-5 py-2 rounded-md shadow-sm transition duration-300"
								>
									<Link href={secondary.secondaryCTA.url}>
										{secondary.secondaryCTA.label}
									</Link>
								</Button>
							)}
						</div>
						{secondary.socialLinks && secondary.socialLinks?.length > 0 && (
							<div className="flex items-center gap-4">
								{secondary.socialLinks.map((link, i) => {
									const Icon = DynamicIcon(link.icon);
									return Icon ? (
										<Link
											key={i}
											href={link.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-white/60 hover:text-pink-400 transition-colors"
											aria-label={link.displayName}
										>
											<Icon className="h-5 w-5" />
										</Link>
									) : null;
								})}
							</div>
						)}
					</div>
				</div>
				<Link
					href="#about"
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-16 h-16 flex items-center justify-center"
					aria-label="Scroll to About"
				>
					<DotLottieReact
						src="https://lottie.host/4ccec20d-7448-4a90-b486-e4a06925ae55/wI9rHhTLPW.lottie"
						loop
						autoplay
						className="w-24 h-24"
					/>
				</Link>
			</div>

			{/* Primary Section */}
			<div
				className="absolute bg-indigo-950 inset-0 primary-layer z-20 bg-[url('/skulls.png')] bg-repeat"
				style={{
					// background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)",
					clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
					transition: isDragging ? "none" : "clip-path 0.5s ease-in-out",
				}}
			>
				<div className="h-screen flex items-center justify-center px-8 md:px-16">
					<div className="max-w-xl">
						<div className="inline-block rounded-lg bg-blue-900/50 border border-blue-500/30 px-3 py-1 text-sm mb-4">
							{primary.title}
						</div>
						<h1 className="text-4xl md:text-6xl font-bold mb-4">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
								{primary.name}
							</span>
						</h1>
						<p className="text-lg text-blue-100 mb-6">{primary.tagline}</p>
						<div className="flex gap-4 mb-8">
							{primary.primaryCTA?.url && (
								<Button
									asChild
									className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-500 shadow-md transition duration-300"
								>
									<Link href={primary.primaryCTA.url}>
										{primary.primaryCTA.label}
									</Link>
								</Button>
							)}
							{primary.secondaryCTA?.url && (
								<Button
									asChild
									className="bg-transparent border border-cyan-300 text-cyan-200 hover:bg-cyan-200/10 hover:text-white hover:border-cyan-100 font-medium px-5 py-2 rounded-md shadow-sm transition duration-300"
								>
									<Link href={primary.secondaryCTA.url}>
										{primary.secondaryCTA.label}
									</Link>
								</Button>
							)}
						</div>
						{primary.socialLinks && primary.socialLinks?.length > 0 && (
							<div className="flex items-center gap-4">
								{primary.socialLinks.map((link, i) => {
									const Icon = DynamicIcon(link.icon);
									return Icon ? (
										<Link
											key={i}
											href={link.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-white/60 hover:text-cyan-400 transition-colors"
											aria-label={link.displayName}
										>
											<Icon className="h-5 w-5" />
										</Link>
									) : null;
								})}
							</div>
						)}
					</div>
				</div>
				<Link
					href="#about"
					className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-16 h-16 flex items-center justify-center"
					aria-label="Scroll to About"
				>
					<DotLottieReact
						src="https://lottie.host/38924ef0-6d5f-4867-a732-b9599327fde7/0GzyzWsbtS.lottie"
						loop
						autoplay
						className="w-24 h-24"
					/>
				</Link>
			</div>

			{/* Slider Handle */}
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-ew-resize z-30 backdrop-blur-sm"
				style={{
					left: `${sliderPosition}%`,
					boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
					transition: isDragging ? "none" : "left 0.5s ease-in-out",
				}}
				onMouseDown={handleMouseDown}
				onTouchStart={handleMouseDown}
			>
				<div
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center cursor-ew-resize transition-transform duration-200 hover:scale-110"
					onMouseDown={handleMouseDown}
					onTouchStart={handleMouseDown}
				>
					<div className="flex items-center">
						<ChevronLeft className="h-4 w-4 text-blue-600" />
						<ChevronRight className="h-4 w-4 text-purple-600" />
					</div>
				</div>
			</div>
		</div>
	);
}
