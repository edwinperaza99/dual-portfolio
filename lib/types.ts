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

export interface ImageData {
	asset: {
		_id: string;
		url: string;
	};
	alt?: string;
}

export type SettingsSEO = {
	_type: "settingsSEO";
	siteTitle?: string;
	siteDescription?: string;
	applicationName?: string;
	authors?: Array<{
		name?: string;
		url?: string;
		_type: "author";
		_key: string;
	}>;
	creator?: string;
	publisher?: string;
	defaultKeywords?: Array<string>;
	openGraphUrl?: string;
	openGraphType?: string;
	openGraphLocale?: string;
	openGraphSiteName?: string;
	openGraphImages?: Array<ImageData>;
	twitterCard?: "summary_large_image" | "summary" | "player" | "app";
	twitterImages?: Array<ImageData>;
};

export type SocialLink = {
	displayName: string;
	link: string;
	icon: IconPicker;
};

export type FooterData = {
	header: string;
	subheader?: string;
	socialLinks?: SocialLink[];
};

// TODO: will need to add values as we accept resume
export type CTA = {
	label: string;
	url?: string;
};

export type Persona = {
	title: string;
	name: string;
	tagline?: string;
	primaryCTA?: CTA;
	secondaryCTA?: CTA;
	socialLinks?: SocialLink[];
};

export type HeroSectionType = {
	primary: Persona;
	secondary: Persona;
};
