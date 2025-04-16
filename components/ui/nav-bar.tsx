"use client";
import { Button } from "@/components/ui/button";
import { Monitor, Twitch } from "lucide-react";

interface HeaderProps {
	activePersona: "primary" | "secondary";
	setActivePersona: (persona: "primary" | "secondary") => void;
}

export default function NavBar({
	activePersona,
	setActivePersona,
}: HeaderProps) {
	// Function to handle section change and update slider
	const handlePersonaChange = (persona: "primary" | "secondary") => {
		setActivePersona(persona);

		// Find the slider element and update its position
		const sliderElement = document.querySelector(
			".slider-handle"
		) as HTMLElement;
		if (sliderElement) {
			const newPosition = persona === "primary" ? 0 : 100;
			sliderElement.style.left = `${newPosition}%`;

			// Also update the clip path on the primary layer
			const primaryLayer = document.querySelector(
				".primary-layer"
			) as HTMLElement;
			if (primaryLayer) {
				primaryLayer.style.clipPath = `inset(0 ${100 - newPosition}% 0 0)`;
			}
		}
	};

	return (
		<header className="fixed top-0 z-50 w-full backdrop-blur-lg bg-gray-950/30 border-b border-white/10">
			<div className="container mx-auto flex h-16 items-center justify-center px-4">
				{/* Centered navigation with two buttons */}
				<nav className="flex gap-4 items-center">
					<Button
						onClick={() => handlePersonaChange("primary")}
						className={`flex items-center gap-2 transition-all duration-300 ${
							activePersona === "primary"
								? "bg-blue-600 hover:bg-blue-700 text-white"
								: "bg-transparent border border-blue-500/50 text-blue-300 hover:bg-blue-900/30"
						}`}
					>
						<Monitor className="h-4 w-4" />
						System Admin
					</Button>

					<Button
						onClick={() => handlePersonaChange("secondary")}
						className={`flex items-center gap-2 transition-all duration-300 ${
							activePersona === "secondary"
								? "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
								: "bg-transparent border border-pink-500/50 text-pink-300 hover:bg-purple-900/30"
						}`}
					>
						<Twitch className="h-4 w-4" />
						Streamer
					</Button>
				</nav>
			</div>
		</header>
	);
}
