import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon } from "@/lib/dynamic-icon";

import type { SkillsSection } from "@/lib/types";
import { SkillsSection as SkillsSectionType } from "@/lib/types";

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
						gradient="from-blue-300 to-cyan-400"
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{skillsData.categories?.map((category, index) => {
							// Get the dynamic icon for the category if it exists
							const CategoryIcon = category.categoryIcon
								? DynamicIcon(category.categoryIcon)
								: null;

							return (
								<div
									key={index}
									className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20 rounded-xl p-6 backdrop-blur-sm h-full transition-all duration-300 hover:border-blue-500/40"
								>
									<h3 className="text-xl font-bold mb-6 text-blue-200 flex items-center gap-2">
										{CategoryIcon && <CategoryIcon className="h-5 w-5" />}
										{category.categoryTitle}
									</h3>

									<div className="flex flex-wrap gap-2">
										{category.skills?.map((skill, i) => {
											// Get the dynamic icon for each skill if it exists
											const SkillIcon = skill.icon
												? DynamicIcon(skill.icon)
												: null;
											return (
												<Badge
													key={i}
													className="bg-blue-600/40 hover:bg-blue-600/60 text-white border border-blue-400/20 px-3 py-1"
												>
													{SkillIcon && (
														<SkillIcon className="h-4 w-4 inline-block mr-2" />
													)}
													{skill.skillName}
												</Badge>
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
