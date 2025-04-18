"use client";

import { useEffect, useRef } from "react";

interface Props {
	channel: string;
	width?: number | string;
	height?: number | string;
}

export default function TwitchEmbed({
	channel,
	width = "100%",
	height = "100%",
}: Props) {
	const ref = useRef<HTMLDivElement>(null);
	const inited = useRef(false);

	useEffect(() => {
		if (inited.current) return;
		inited.current = true;

		let script = document.querySelector<HTMLScriptElement>(
			'script[src="https://embed.twitch.tv/embed/v1.js"]'
		);
		if (!script) {
			script = document.createElement("script");
			script.src = "https://embed.twitch.tv/embed/v1.js";
			script.async = true;
			document.body.appendChild(script);
		}

		const setup = () => {
			if (!ref.current) return;
			// don’t re-create if an <iframe> already exists
			if (ref.current.querySelector("iframe")) return;

			// @ts-expect-error: Twitch.Embed is not defined, but we know it is available
			new window.Twitch.Embed(ref.current.id, {
				channel,
				width,
				height,
				layout: "video-with-chat",
				theme: "light",
				autoplay: false,
				parent: [window.location.hostname],
			});
		};

		// @ts-expect-error: Twitch.Embed is not defined, but we know it is available
		if (window.Twitch?.Embed) {
			setup();
		} else {
			script.addEventListener("load", setup);
		}
	}, [channel, width, height]);

	return (
		<div className="aspect-[3/4] md:aspect-video">
			<div id={`twitch-embed-${channel}`} ref={ref} className="w-full h-full" />
		</div>
	);
}
