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

type Props = {
	experienceData: ExperienceSectionType;
};

export default function ExperienceSection({ experienceData }: Props) {
	return (
		<section id="experience" className="pt-20 relative overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						badge={experienceData.badge}
						title={experienceData.title}
						gradient="primary"
					/>
					<div className="relative border-l-2 border-blue-600/50 pl-8 space-y-12 ml-4">
						{experienceData.experiences?.map((job, i) => (
							<div key={i} className="relative">
								<div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-blue-600 border-4 border-blue-950 flex items-center justify-center">
									<div className="w-2 h-2 bg-blue-200 rounded-full"></div>
								</div>

								<Card className="bg-blue-900/30 border-blue-500/20 overflow-hidden">
									<div className="absolute top-0 right-0 bg-blue-600/80 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
										{`${job.startDate} - ${job.endDate}`}
									</div>
									<CardHeader>
										<CardTitle className="text-white text-xl">
											{job.jobTitle}
										</CardTitle>
										<CardDescription className="text-blue-300 flex items-center gap-1">
											<span>{job.company}</span>
											<span className="text-blue-400">•</span>
											<span>{job.location}</span>
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
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
