"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface Props {
	channel: string;
	width?: number | string;
	height?: number | string;
}

export function TwitchEmbed({
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
				theme: "dark",
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

export function VODList({
	channel,
	limit = 3,
}: {
	channel: string;
	limit?: number;
}) {
	interface VOD {
		id: string;
	}

	const [vods, setVods] = useState<VOD[]>([]);

	useEffect(() => {
		const fetchVods = async () => {
			const res = await fetch(
				`/api/twitch/vods?limit=${limit}&channel=${channel}`
			);
			const data = await res.json();
			setVods(data.data || []);
			console.log(data);
		};
		fetchVods();
	}, [limit, channel]);

	return (
		<div className="grid grid-cols-1 gap-6 mt-12">
			{vods.map((vod, i) => (
				<div className="aspect-video" key={vod.id}>
					<iframe
						src={`https://player.twitch.tv/?video=${vod.id}&parent=${window.location.hostname}`}
						title={`Recent Twitch VOD #${i}`}
						allowFullScreen
						className="w-full h-full relative overflow-hidden rounded-xl border border-pink-500/30 transition-border transition-shadow duration-300 hover:border-pink-500/50 hover:shadow-lg"
						loading="eager"
					/>
				</div>
			))}
		</div>
	);
}

export function ClipList({
	channel,
	limit = 5,
}: {
	channel: string;
	limit?: number;
}) {
	interface Clip {
		id: string;
	}
	const [clips, setClips] = useState<Clip[]>([]);

	useEffect(() => {
		const fetchClips = async () => {
			const res = await fetch(
				`/api/twitch/clips?limit=${limit}&channel=${channel}`
			);
			const data = await res.json();
			setClips(data.data || []);
		};
		fetchClips();
	}, [limit, channel]);

	return (
		<div className="space-y-4">
			{clips.map((clip, i) => (
				<div key={clip.id} className="aspect-video">
					<iframe
						src={`https://clips.twitch.tv/embed?clip=${clip.id}&parent=${window.location.hostname}`}
						allowFullScreen
						className="w-full h-full relative overflow-hidden rounded-xl border border-pink-500/30 transition-border transition-shadow duration-300 hover:border-pink-500/50 hover:shadow-lg"
						title={`Twitch Clip: ${i}`}
						loading="eager"
					/>
				</div>
			))}
		</div>
	);
}

interface Emote {
	id: string;
	name: string;
	images: {
		url_1x: string;
		url_2x: string;
		url_4x: string;
	};
}

export function EmoteList({ channel }: { channel: string }) {
	const [emotes, setEmotes] = useState<Emote[]>([]);

	useEffect(() => {
		const fetchEmotes = async () => {
			const res = await fetch(`/api/twitch/emotes?channel=${channel}`);
			const data = await res.json();
			setEmotes(data.data || []);
		};
		fetchEmotes();
	}, [channel]);

	if (!emotes.length) return null;

	return (
		<Card className="gap-0 py-0 bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-pink-500/20">
			<CardHeader className="bg-purple-900/50 py-6 gap-0">
				<CardTitle className="text-white flex items-center gap-2">
					🎭 Emotes
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<TooltipProvider delayDuration={100}>
					<div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
						{emotes.map((emote) => (
							<Tooltip key={emote.id}>
								<TooltipTrigger asChild>
									<div className="flex items-center justify-center">
										<Image
											src={emote.images.url_1x}
											alt={emote.name}
											className="h-10 w-10 p-0.5 rounded-md shadow"
											width={32}
											height={32}
										/>
									</div>
								</TooltipTrigger>
								<TooltipContent
									side="top"
									className="bg-purple-600/90 text-white border-4 border-purple-500/20 rounded-lg p-2 shadow-lg"
								>
									{emote.name}
								</TooltipContent>
							</Tooltip>
						))}
					</div>
				</TooltipProvider>
			</CardContent>
		</Card>
	);
}
