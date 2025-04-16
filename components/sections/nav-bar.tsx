"use client";
import { Button } from "@/components/ui/button";
import { Monitor, Twitch } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
	activePersona: "primary" | "secondary";
	setActivePersona: (p: "primary" | "secondary") => void;
}

export default function NavBar({
	activePersona,
	setActivePersona,
}: HeaderProps) {
	const handlePersonaChange = (
		persona: "primary" | "secondary",
		e: React.MouseEvent<HTMLButtonElement>
	) => {
		if (persona === activePersona) return; // block repeat clicks

		setActivePersona(persona);
		(e.currentTarget as HTMLButtonElement).blur(); // drop focus ring quickly

		/* slide & recolor pill --------------------------------------- */
		const slider = document.querySelector(
			".slider-handle"
		) as HTMLElement | null;
		if (slider) {
			slider.style.left = persona === "primary" ? "0%" : "50%";
			slider.classList.toggle("from-sky-500", persona === "primary");
			slider.classList.toggle("from-fuchsia-500", persona === "secondary");
		}

		/* existing clip‑path logic ----------------------------------- */
		const primaryLayer = document.querySelector(
			".primary-layer"
		) as HTMLElement | null;
		if (primaryLayer) {
			primaryLayer.style.clipPath = `inset(0 ${persona === "primary" ? "50%" : "0"} 0 0)`;
		}
	};

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gray-950/30 backdrop-blur-lg">
			<div className="container mx-auto flex h-16 items-center justify-center px-4">
				{/* pill container */}
				<nav className="relative flex w-[19rem] rounded-full border border-white/20 bg-gray-900/50 px-2 py-1.5 backdrop-blur-sm">
					{/* sliding pill */}
					<span className="slider-handle pointer-events-none absolute inset-y-[3px] left-0 w-1/2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg transition-[left,background-color] duration-400 ease-in-out" />

					{/* SysAdmin */}
					<Button
						size="sm"
						variant="ghost"
						disabled={activePersona === "primary"}
						onClick={(e) => handlePersonaChange("primary", e)}
						className={cn(
							"relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-300",
							"disabled:pointer-events-none disabled:opacity-100",
							activePersona === "primary"
								? "text-white"
								: "text-blue-200 hover:text-white"
						)}
					>
						<Monitor className="h-4 w-4" />
						SysAdmin
					</Button>

					{/* Streamer */}
					<Button
						size="sm"
						variant="ghost"
						disabled={activePersona === "secondary"}
						onClick={(e) => handlePersonaChange("secondary", e)}
						className={cn(
							"relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-300",
							"disabled:pointer-events-none disabled:opacity-100",
							activePersona === "secondary"
								? "text-white"
								: "text-purple-200 hover:text-white"
						)}
					>
						<Twitch className="h-4 w-4" />
						Streamer
					</Button>
				</nav>
			</div>
		</header>
	);
}
