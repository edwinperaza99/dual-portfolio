"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { NavBarType } from "@/lib/types";
import { DynamicIcon } from "@/lib/dynamic-icon";

interface HeaderProps {
	activePersona: "primary" | "secondary";
	setActivePersona: (p: "primary" | "secondary") => void;
	navBarData: NavBarType;
}

export default function NavBar({
	activePersona,
	setActivePersona,
	navBarData,
}: HeaderProps) {
	const isPrimary = activePersona === "primary";

	const togglePersona = (e: React.MouseEvent<HTMLButtonElement>) => {
		setActivePersona(isPrimary ? "secondary" : "primary");
		e.currentTarget.blur();
	};

	const PrimaryIcon = DynamicIcon(navBarData.primaryIcon);
	const SecondaryIcon = DynamicIcon(navBarData.secondaryIcon);

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-gray-950/30 backdrop-blur-lg">
			<nav className="container mx-auto flex h-16 items-center justify-center px-4">
				{/* single‑toggle pill, a bit taller */}
				<button
					onClick={togglePersona}
					className="group relative flex w-[19rem] rounded-full border border-white/20 bg-gray-900/50 px-2 py-2 backdrop-blur-sm"
				>
					{/* slider */}
					<span
						className={cn(
							"pointer-events-none absolute left-1 inset-y-[3px] w-[calc(50%_-_0.25rem)] rounded-full transition-transform duration-300 ease-in-out",
							isPrimary
								? "bg-gradient-to-r from-sky-500 to-blue-600 translate-x-0"
								: "bg-gradient-to-r from-fuchsia-500 to-purple-600 translate-x-full"
						)}
					/>

					{/* Primary */}
					<span
						className={cn(
							"relative z-10 flex w-1/2 items-center justify-center gap-2 text-sm font-medium transition-colors duration-300",
							isPrimary ? "text-white" : "text-blue-200 group-hover:text-white"
						)}
					>
						{PrimaryIcon && <PrimaryIcon className="h-4 w-4" />}
						{navBarData.primaryName}
					</span>

					{/* Secondary */}
					<span
						className={cn(
							"relative z-10 flex w-1/2 items-center justify-center gap-2 text-sm font-medium transition-colors duration-300",
							!isPrimary
								? "text-white"
								: "text-purple-200 group-hover:text-white"
						)}
					>
						{SecondaryIcon && <SecondaryIcon className="h-4 w-4" />}
						{navBarData.secondaryName}
					</span>
				</button>
			</nav>
		</header>
	);
}
