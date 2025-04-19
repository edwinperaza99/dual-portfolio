"use client";

import React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion"; // added
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { StreamSectionType } from "@/lib/types";
import MarqueeBlock from "@/components/ui/Marquee";
import { ClipList, EmoteList, TwitchEmbed } from "@/components/ui/twitch-embed";

interface Props {
	streamData: StreamSectionType;
}

export default function StreamingSection({ streamData }: Props) {
	const {
		badge,
		title,
		channelName,
		paragraphs,
		categories,
		socialLinks,
		schedule,
		events,
		support,
		marquee,
	} = streamData;

	return (
		<>
			{/* marquee (if any) */}
			{marquee && <MarqueeBlock {...marquee} />}

			<section id="stream" className="py-20 relative overflow-hidden">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* header */}
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							viewport={{ once: true }}
						>
							<SectionHeader badge={badge} title={title} gradient="secondary" />
						</motion.div>

						{/* Twitch hero placeholder */}
						{channelName && (
							<motion.div
								className="relative overflow-hidden rounded-xl border border-pink-500/30 mb-12 mt-12 transition-border transition-shadow duration-300 hover:border-pink-500/50 hover:shadow-lg"
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
							>
								<TwitchEmbed channel={channelName} />
							</motion.div>
						)}

						<div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-12">
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5 }}
								viewport={{ once: true }}
							>
								{/* paragraphs */}
								<div className="prose max-w-none text-pink-100">
									<PortableText value={paragraphs} />
								</div>

								{/* categories */}
								{categories && categories.length > 0 && (
									<div className="flex flex-wrap gap-3 pt-4">
										{categories.map((cat, i) => (
											<Badge
												key={i}
												className="bg-pink-600/70 text-white transition-colors duration-200 hover:bg-pink-600"
											>
												{cat.name}
											</Badge>
										))}
									</div>
								)}

								{/* socials */}
								{socialLinks && socialLinks.length > 0 && (
									<div className="flex items-center gap-4 pt-4">
										{socialLinks.map((social, i) => {
											const Icon = DynamicIcon(social.icon);
											return (
												<Link
													key={i}
													href={social.link}
													className="text-pink-400 transition-colors duration-200 hover:text-pink-300"
													aria-label={social.displayName}
												>
													{Icon && <Icon className="h-6 w-6" />}
													<span className="sr-only">{social.displayName}</span>
												</Link>
											);
										})}
									</div>
								)}

								{/* recent clips  */}
								{channelName && (
									<div className="mt-8">
										<h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
											Recent Clips
										</h2>
										<ClipList limit={3} channel={channelName} />
									</div>
								)}
							</motion.div>

							{/* sidebar */}
							<motion.div
								className="space-y-6"
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								viewport={{ once: true }}
							>
								{/* schedule */}
								{schedule && (
									<Card className="gap-0 py-0 bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-pink-500/20 overflow-hidden transition-border transition-shadow duration-300 hover:border-pink-500/40 hover:shadow-lg">
										<CardHeader className="bg-purple-900/50 py-6 gap-0">
											<CardTitle className="text-white flex items-center gap-2 ">
												{(() => {
													const Icon = DynamicIcon(schedule.icon);
													return Icon ? (
														<Icon className="h-5 w-5 text-pink-400" />
													) : null;
												})()}
												{schedule.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="p-4">
											{schedule.days.map((d, i) => (
												<div
													key={i}
													className="flex justify-between border-b border-pink-500/20 pb-2 last:border-0"
												>
													<span className="text-pink-200">{d.day}</span>
													<span className="text-pink-100">{d.time}</span>
												</div>
											))}
										</CardContent>
									</Card>
								)}

								{/* events */}
								{events && (
									<Card className="gap-0 py-0 bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-pink-500/20 overflow-hidden transition-border transition-shadow duration-300 hover:border-pink-500/40 hover:shadow-lg">
										<CardHeader className="bg-purple-900/50 py-6 gap-0">
											<CardTitle className="text-white flex items-center gap-2">
												{(() => {
													const Icon = DynamicIcon(events.icon);
													return Icon ? (
														<Icon className="h-5 w-5 text-pink-400" />
													) : null;
												})()}
												{events.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="p-4 space-y-4">
											{events.list.map((e, i) => (
												<div
													key={i}
													className="bg-purple-800/30 rounded-lg p-3 border border-pink-500/20 transition-border transition-shadow duration-200 hover:border-pink-500/40 hover:shadow"
												>
													<div className="text-sm text-pink-300 mb-1">
														{e.date}
													</div>
													<div className="font-medium text-white mb-1">
														{e.title}
													</div>
													<div className="text-sm text-pink-100">
														{e.description}
													</div>
												</div>
											))}
										</CardContent>
									</Card>
								)}

								{/* support */}
								{support && (
									<Card className="gap-0 py-0 bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-pink-500/20 overflow-hidden transition-border transition-shadow duration-300 hover:border-pink-500/40 hover:shadow-lg">
										<CardHeader className="bg-purple-900/50 py-6 gap-0">
											<CardTitle className="text-white flex items-center gap-2">
												{(() => {
													const Icon = DynamicIcon(support.icon);
													return Icon ? (
														<Icon className="h-5 w-5 text-pink-400" />
													) : null;
												})()}
												{support.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="p-4 space-y-4">
											{support.buttons.map((b, i) => (
												<Button
													key={i}
													asChild
													className="w-full bg-pink-600 hover:bg-pink-700 text-white transition-colors duration-300 shadow hover:shadow-lg"
												>
													<a href={b.url}>{b.label}</a>
												</Button>
											))}
										</CardContent>
									</Card>
								)}
								{channelName && (
									<div className="mt-8">
										<EmoteList channel={channelName} />
									</div>
								)}
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
