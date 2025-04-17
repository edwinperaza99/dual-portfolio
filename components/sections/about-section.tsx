import { SectionHeader } from "@/components/ui/section-header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AboutSectionType } from "@/lib/types";
import components from "@/components/portable-text-component";
import { DynamicIcon } from "@/lib/dynamic-icon";

import { PortableText } from "@portabletext/react";

interface Props {
	aboutData: AboutSectionType;
}

export default function AboutSection({ aboutData }: Props) {
	return (
		<section id="about" className="py-20 relative overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						badge={aboutData.badge}
						title={aboutData.title}
						gradient="from-blue-300 to-cyan-400"
					/>

					{/* main layout */}
					<div className="animate-cards grid md:grid-cols-[2fr_1fr] gap-8 mt-12">
						{/* left column ------------------------------------------------ */}
						<div className="animate-card space-y-6">
							{aboutData.paragraphs && (
								<PortableText
									value={aboutData.paragraphs}
									components={components}
								/>
							)}

							{aboutData.infoBoxes?.length && (
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
									{aboutData.infoBoxes.map((box, i) => {
										if (!box) return null;
										const Icon = DynamicIcon(box.icon);

										return (
											<div
												key={i}
												className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20 hover:translate-y-[-4px]"
											>
												{box.title && (
													<div className="text-blue-300 mb-2 font-medium">
														{box.title}
													</div>
												)}
												<div className="flex items-center gap-2">
													{Icon && <Icon className="h-4 w-4 text-blue-400" />}
													<span>{box.value}</span>
												</div>
											</div>
										);
									})}
								</div>
							)}
						</div>

						{/* right column (summary card) ------------------------------- */}
						{aboutData.summaryCard && (
							<div className="animate-card bg-blue-900/30 border border-blue-500/20 rounded-lg p-6 h-fit transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20">
								{aboutData.summaryCard.title && (
									<h3 className="text-xl font-bold mb-4 text-blue-200">
										{aboutData.summaryCard.title}
									</h3>
								)}

								{/* education */}
								{aboutData.summaryCard.education && (
									<>
										<div className="font-medium text-white">
											{aboutData.summaryCard.education.degree}
										</div>
										<div className="text-sm text-blue-300 mb-4">
											{aboutData.summaryCard.education.institution}
										</div>
										<Separator className="bg-blue-700/50" />
									</>
								)}

								{/* certifications */}
								{aboutData.summaryCard.certifications && (
									<div className="space-y-2 mt-4">
										{aboutData.summaryCard.certifications.title && (
											<h4 className="text-sm font-medium text-blue-200">
												{aboutData.summaryCard.certifications.title}
											</h4>
										)}
										<div className="flex flex-wrap gap-2">
											{aboutData.summaryCard.certifications.items.map(
												(cert, i) => (
													<Badge
														key={i}
														className="bg-blue-600/50 hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105"
													>
														{cert.name}
													</Badge>
												)
											)}
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
