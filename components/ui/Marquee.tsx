import React from "react";
import Marquee from "react-fast-marquee";
import { MarqueeType } from "@/lib/types";

export default function MarqueeBlock({
	items,
	autoFill = true,
	pauseOnHover = true,
	pauseOnClick = true,
	direction = "left",
	speed = 50,
}: MarqueeType) {
	return (
		<Marquee
			autoFill={autoFill}
			pauseOnHover={pauseOnHover}
			pauseOnClick={pauseOnClick}
			direction={direction}
			speed={speed}
			gradient={false}
			className="bg-purple-900/30 border-t border-pink-500/20"
		>
			{items.map((item, idx) => (
				<div
					key={idx}
					className="flex items-center px-12 py-3 border-r border-pink-500/20 last:border-r-0"
				>
					{item.primaryText && (
						<span className="font-medium text-pink-400">
							{item.primaryText}
						</span>
					)}
					{item.secondaryText && (
						<span className="ml-2 text-pink-100">{item.secondaryText}</span>
					)}
				</div>
			))}
		</Marquee>
	);
}
