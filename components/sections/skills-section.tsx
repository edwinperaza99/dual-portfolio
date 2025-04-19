"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { motion } from "framer-motion";

import type { SkillsSection as SkillsSectionType } from "@/lib/types";

type Props = {
	skillsData: SkillsSectionType;
};

export default function SkillsSection({ skillsData }: Props) {
	return (
		<section id="skills" className="py-20 relative overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="max-w-4xl mx-auto">
					<SectionHeader
						badge={skillsData.badge}
						title={skillsData.title}
						gradient="primary"
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{skillsData.categories?.map((category, index) => {
							const CategoryIcon = category.categoryIcon
								? DynamicIcon(category.categoryIcon)
								: null;

							return (
								<div
									key={index}
									className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-6 h-fit transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-900/20"
								>
									<h3 className="text-xl font-bold mb-6 text-blue-200 flex items-center gap-2">
										{CategoryIcon && <CategoryIcon className="h-5 w-5" />}
										{category.categoryTitle}
									</h3>

									<div className="flex flex-wrap gap-2">
										{category.skills?.map((skill, i) => {
											const SkillIcon = skill.icon
												? DynamicIcon(skill.icon)
												: null;

											return (
												<motion.div
													key={i}
													initial={{ opacity: 0, scale: 0.9 }}
													whileInView={{ opacity: 1, scale: 1 }}
													transition={{ duration: 0.3, delay: i * 0.05 }}
												>
													<Badge className="bg-blue-600/40 hover:bg-blue-600/60 text-white border border-blue-400/20 px-3 py-1 transition-all duration-200">
														{SkillIcon && (
															<SkillIcon className="h-4 w-4 inline-block mr-2" />
														)}
														{skill.skillName}
													</Badge>
												</motion.div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
