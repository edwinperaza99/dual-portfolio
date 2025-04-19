"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DynamicIcon } from "@/lib/dynamic-icon";
import type { ContactSectionType } from "@/lib/types";
import { toast } from "react-hot-toast";

interface Props {
	contactData: ContactSectionType;
}

export default function ContactSection({ contactData }: Props) {
	const {
		title,
		description,
		label,
		formTitle,
		formSubtitle,
		accessToken,
		primaryCard,
		secondaryCard,
	} = contactData;

	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSubmitting(true);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		formData.append("access_key", accessToken);

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: { Accept: "application/json" },
				body: formData,
			});
			const result = await response.json();

			if (result.success) {
				toast.success("Message sent successfully!");
				form.reset();
			} else {
				toast.error("Failed to send message. Please try again.");
			}
		} catch (error) {
			console.error(error);
			toast.error("An error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<section
			id="contact"
			className="py-20 relative overflow-hidden bg-[url('/subtle-dots.png')] bg-repeat"
		>
			<div className="container mx-auto px-4">
				<motion.div
					className="max-w-4xl mx-auto text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					viewport={{ once: true }}
				>
					{label && (
						<span className="inline-block rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-white/20 px-3 py-1 text-sm mb-4">
							{label}
						</span>
					)}
					<h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
						{title}
					</h2>
					{description && (
						<p className="text-white/70 max-w-2xl mx-auto">{description}</p>
					)}
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					{primaryCard && (
						<motion.div
							initial={{ opacity: 0, x: -40 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							viewport={{ once: true }}
						>
							<Card className="h-full bg-blue-900/30 border border-blue-500/20 rounded-lg p-6 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20">
								<CardHeader>
									<CardTitle className="text-white">
										{primaryCard.title}
									</CardTitle>
									<CardDescription className="text-white/80">
										{primaryCard.subtitle}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{primaryCard.contactInfo?.map((item, i) => {
										if (!item) return null;
										const Icon = DynamicIcon(item.icon);
										return (
											<div key={i} className="flex items-center gap-3">
												{Icon && <Icon className="h-4 w-4 text-blue-400" />}
												<span className="text-white/90">{item.value}</span>
											</div>
										);
									})}
								</CardContent>
							</Card>
						</motion.div>
					)}

					{secondaryCard && (
						<motion.div
							initial={{ opacity: 0, x: 40 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
							viewport={{ once: true }}
						>
							<Card className="h-full bg-purple-900/30 border border-pink-500/20 rounded-lg p-6 transition-all duration-300 hover:border-pink-500/40 hover:shadow-lg hover:shadow-purple-900/20">
								<CardHeader>
									<CardTitle className="text-white">
										{secondaryCard.title}
									</CardTitle>
									<CardDescription className="text-white/80">
										{secondaryCard.subtitle}
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{secondaryCard.contactInfo?.map((item, i) => {
										if (!item) return null;
										const Icon = DynamicIcon(item.icon);
										return (
											<div key={i} className="flex items-center gap-3">
												{Icon && <Icon className="h-5 w-5 text-pink-400" />}
												<span className="text-white/90">{item.value}</span>
											</div>
										);
									})}
								</CardContent>
							</Card>
						</motion.div>
					)}
				</div>

				<motion.div
					className="max-w-4xl mx-auto mt-8"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
					viewport={{ once: true }}
				>
					<Card className="bg-gray-950/30 border border-white/10 rounded-lg p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-gray-800/30">
						<CardHeader>
							<CardTitle className="text-white">{formTitle}</CardTitle>
							<CardDescription className="text-white/70">
								{formSubtitle}
							</CardDescription>
						</CardHeader>

						<CardContent>
							<form onSubmit={handleSubmit} className="grid gap-6">
								<div className="grid gap-4 md:grid-cols-2">
									<div className="space-y-1">
										<Label
											htmlFor="first-name"
											className="text-sm font-semibold text-white"
										>
											First name
										</Label>
										<Input
											id="first-name"
											name="First Name"
											placeholder="Enter your first name"
											className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white/20"
											required
										/>
									</div>
									<div className="space-y-1">
										<Label
											htmlFor="last-name"
											className="text-sm font-semibold text-white"
										>
											Last name
										</Label>
										<Input
											id="last-name"
											name="Last Name"
											placeholder="Enter your last name"
											className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white/20"
											required
										/>
									</div>
								</div>

								<div className="space-y-1">
									<Label
										htmlFor="email"
										className="text-sm font-semibold text-white"
									>
										Email
									</Label>
									<Input
										id="email"
										name="Email"
										type="email"
										placeholder="Enter your email"
										className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white/20"
										required
									/>
								</div>

								<div className="space-y-1">
									<Label
										htmlFor="subject"
										className="text-sm font-semibold text-white"
									>
										Subject
									</Label>
									<Input
										id="subject"
										name="Subject"
										placeholder="Enter message subject"
										className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white/20"
										required
									/>
								</div>

								<div className="space-y-1">
									<Label
										htmlFor="message"
										className="text-sm font-semibold text-white"
									>
										Message
									</Label>
									<Textarea
										id="message"
										name="Message"
										placeholder="Enter your message"
										className="bg-transparent border-white/30 text-white placeholder:text-white/50 focus-visible:ring-white/20 min-h-[150px]"
										required
									/>
								</div>

								<label htmlFor="botcheck" className="sr-only">
									Botcheck, do not fill this out
								</label>
								<input
									type="checkbox"
									name="botcheck"
									id="botcheck"
									className="hidden"
									tabIndex={-1}
									autoComplete="off"
								/>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
								>
									{isSubmitting ? "Sending…" : "Send Message"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
