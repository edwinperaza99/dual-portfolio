import React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { StreamSectionType } from "@/lib/types";
import MarqueeBlock from "@/components/ui/Marquee";
import TwitchEmbed from "@/components/ui/twitch-embed";

interface Props {
	streamData: StreamSectionType;
}

export default function StreamingSection({ streamData }: Props) {
	const {
		badge,
		title,
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

			<section id="streaming" className="py-20 relative overflow-hidden">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{/* header */}
						<SectionHeader
							badge={badge}
							title={title}
							gradient="from-pink-400 to-purple-400"
						/>

						{/* Twitch hero placeholder */}
						{/* TODO: fetch and render featuredStream */}
						<TwitchEmbed channel="tofubinbin" />

						<div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-12">
							<div>
								{/* paragraphs */}
								<div className="prose max-w-none text-pink-100">
									<PortableText value={paragraphs} />
								</div>

								{/* categories */}
								{categories && categories.length > 0 && (
									<div className="flex flex-wrap gap-3 pt-4">
										{categories.map((cat, i) => (
											<Badge key={i} className="bg-pink-600/70 text-white">
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
													className="text-pink-400"
													aria-label={social.displayName}
												>
													{Icon && <Icon className="h-6 w-6" />}
													<span className="sr-only">{social.displayName}</span>
												</Link>
											);
										})}
									</div>
								)}

								{/* recent streams placeholder */}
								{/* TODO: fetch and render recentStreams */}
							</div>

							{/* sidebar */}
							<div className="space-y-6">
								{/* schedule */}
								{schedule && (
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												{(() => {
													const Icon = DynamicIcon(schedule.icon);
													return Icon ? (
														<Icon className="h-5 w-5 text-pink-400" />
													) : null;
												})()}
												{schedule.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
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
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												{(() => {
													const Icon = DynamicIcon(events.icon);
													return Icon ? (
														<Icon className="h-5 w-5 text-pink-400" />
													) : null;
												})()}
												{events.title}
											</CardTitle>
										</CardHeader>
										<CardContent>
											{events.list.map((e, i) => (
												<div
													key={i}
													className="bg-purple-800/30 rounded-lg p-3 border border-pink-500/20 transition-all duration-300"
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
									<Card>
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												{(() => {
													const Icon = DynamicIcon(support.icon);
													return Icon ? (
														<Icon className="h-5 w-5 text-pink-400" />
													) : null;
												})()}
												{support.title}
											</CardTitle>
										</CardHeader>
										<CardContent className="space-y-4">
											{support.buttons.map((b, i) => (
												<Button key={i} asChild>
													<a href={b.url}>{b.label}</a>
												</Button>
											))}
										</CardContent>
									</Card>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
