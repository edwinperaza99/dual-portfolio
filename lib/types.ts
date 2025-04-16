export type ExperienceSection = {
	title: string;
	badge?: string;
	experiences?: Array<{
		jobTitle?: string;
		company?: string;
		location?: string;
		startDate?: string;
		endDate?: string;
		responsibilities?: Array<string>;
	}>;
};

export type IconPicker = {
	provider?: string;
	name?: string;
};

export type SkillsSection = {
	title: string;
	badge?: string;
	categories?: Array<{
		categoryTitle?: string;
		categoryIcon?: IconPicker;
		skills?: Array<{
			skillName?: string;
			icon?: IconPicker;
		}>;
	}>;
};
