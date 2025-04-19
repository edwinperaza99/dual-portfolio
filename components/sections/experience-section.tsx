"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { ChevronRight } from "lucide-react";
import { ExperienceSection as ExperienceSectionType } from "@/lib/types";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

type Props = {
	experienceData: ExperienceSectionType;
};

export default function ExperienceSection({ experienceData }: Props) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end center"],
	});
	const scaleY = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

	return (
		<section id="experience" className="pt-20 relative overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						badge={experienceData.badge}
						title={experienceData.title}
						gradient="primary"
					/>

					<div className="relative ml-4 pl-8" ref={ref}>
						<motion.div
							className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-600 to-blue-400 origin-top"
							style={{ scaleY }}
						/>

						<div className="space-y-20">
							{experienceData.experiences?.map((job, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: i * 0.2 }}
									className="relative"
								>
									{/* Timeline Dot */}
									<div className="absolute -left-[40px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-blue-950 shadow-lg" />

									<Card className="bg-blue-900/30 border border-blue-500/20 rounded-lg px-0 py-8 md:py-6 md:px-6 transition-all duration-300 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-900/30 relative overflow-hidden">
										{/* Date badge */}
										<div className="absolute top-0 right-0 bg-blue-600/90 text-white text-xs font-medium px-3 py-1 rounded-bl-lg z-10 backdrop-blur">
											{`${job.startDate} - ${job.endDate}`}
										</div>

										<CardHeader>
											<CardTitle className="text-white text-xl">
												{job.jobTitle}
											</CardTitle>
											<CardDescription className="text-blue-300">
												{job.company} <span className="text-blue-400">•</span>{" "}
												{job.location}
											</CardDescription>
										</CardHeader>

										<CardContent>
											<ul className="space-y-2 text-blue-100">
												{job.responsibilities?.map((res, j) => (
													<li key={j} className="flex items-start gap-2">
														<ChevronRight className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
														<span>{res}</span>
													</li>
												))}
											</ul>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
