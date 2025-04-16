"use client";

import type React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { HeroSectionType } from "@/lib/types";

// Update the SliderView component to work with the header buttons

// Add props for the sliderPositionRef and onSliderChange
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
	// Use the ref value if provided, otherwise use the default
	const [sliderPosition, setSliderPosition] = useState(
		sliderPositionRef?.current || 0
	);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Handle mouse/touch events for slider
	const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		setIsDragging(true);
		// Prevent text selection during dragging
		e.preventDefault();
		document.body.classList.add("slider-dragging");
	};

	// No need since we are using the global mouseup event
	// const handleMouseUp = () => {
	// 	setIsDragging(false);
	// 	document.body.classList.remove("slider-dragging");
	// };

	// Update the handleMouseMove function to call onSliderChange
	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
	) => {
		if (!isDragging || !containerRef.current) return;

		let clientX: number;

		if ("touches" in e) {
			// Touch event
			clientX = e.touches[0].clientX;
		} else {
			// Mouse event
			clientX = e.clientX;
		}

		const rect = containerRef.current.getBoundingClientRect();
		const containerWidth = rect.width;
		const relativeX = clientX - rect.left;
		const newPosition = (relativeX / containerWidth) * 100;

		// Allow full range from 0 to 100
		const position = Math.min(Math.max(newPosition, 0), 100);
		setSliderPosition(position);

		// Update the ref if provided
		if (sliderPositionRef) {
			sliderPositionRef.current = position;
		}

		// Call the callback if provided
		if (onSliderChange) {
			onSliderChange(position);
		}
	};

	// Add event listeners for mouse/touch events
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

	// Add effect to update slider position when ref changes
	useEffect(() => {
		if (sliderPositionRef) {
			const updatePosition = () => {
				if (sliderPositionRef.current !== sliderPosition) {
					setSliderPosition(sliderPositionRef.current);
				}
			};

			// Update immediately
			updatePosition();

			// Also set up an interval to check for changes
			const interval = setInterval(updatePosition, 100);

			return () => clearInterval(interval);
		}
	}, [sliderPosition, sliderPositionRef]);

	// Replace the return statement with this improved version
	return (
		<div
			ref={containerRef}
			className="relative min-h-screen overflow-hidden"
			onMouseMove={handleMouseMove}
			onTouchMove={handleMouseMove}
		>
			{/* Stacked content containers */}

			{/* Secondary (streamer) side (bottom layer) */}
			<div
				className="absolute inset-0 z-0"
				style={{
					background: "linear-gradient(135deg, #0e0e10 0%, #772ce8 100%)",
				}}
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
							<button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-none transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/30 hover:translate-y-[-2px] px-4 py-2 rounded-md">
								{secondary.primaryCTA?.label}
							</button>
							<button className="border border-pink-500 text-pink-300 hover:bg-purple-900/50 transition-all duration-300 hover:border-pink-400 px-4 py-2 rounded-md">
								{secondary.secondaryCTA?.label}
							</button>
						</div>
						{secondary.socialLinks && secondary.socialLinks.length > 0 && (
							<div className="flex items-center gap-4">
								{secondary.socialLinks.map((link, i) => {
									const Icon = DynamicIcon(link.icon);
									return Icon ? (
										<Link
											key={i}
											href={link.link}
											className="text-white/60 hover:text-primary transition-colors"
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

			{/* Primary (sysadmin) side (top layer with clip path) */}
			<div
				className="absolute inset-0 primary-layer z-20"
				style={{
					background: "linear-gradient(135deg, #0f172a 0%, #1e40af 100%)",
					clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`, // This clips the right side
					transition: isDragging ? "none" : "clip-path 0.5s ease-in-out", // Add smooth transition when not dragging
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
							<button className="bg-blue-600 hover:bg-blue-700 text-white border-none transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/30 hover:translate-y-[-2px] px-4 py-2 rounded-md">
								{primary.primaryCTA?.label}
							</button>
							<button className="border border-blue-500 text-blue-300 hover:bg-blue-900/50 transition-all duration-300 hover:border-blue-400 px-4 py-2 rounded-md">
								{primary.secondaryCTA?.label}
							</button>
						</div>
						{primary.socialLinks && primary.socialLinks.length > 0 && (
							<div className="flex items-center gap-4">
								{primary.socialLinks.map((link, i) => {
									const Icon = DynamicIcon(link.icon);
									return Icon ? (
										<Link
											key={i}
											href={link.link}
											className="text-white/60 hover:text-primary transition-colors"
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

			{/* slider handle */}
			<div
				className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-ew-resize z-10 backdrop-blur-sm slider-handle"
				style={{
					left: `${sliderPosition}%`,
					boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
					transition: isDragging ? "none" : "left 0.5s ease-in-out", // Add smooth transition when not dragging
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
