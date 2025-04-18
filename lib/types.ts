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

export type PortableText = Array<{
	children?: Array<{
		marks?: Array<string>;
		text?: string;
		_type: "span";
	}>;
	style?: "normal" | "quote";
	listItem?: "bullet" | "number";
	markDefs?: Array<{
		href?: string;
		_type: "link";
	}>;
	level?: number;
	_type: "block";
}>;

export interface AboutSectionType {
	title: string;
	badge?: string;
	paragraphs: PortableText;

	infoBoxes?: {
		title?: string;
		value?: string;
		icon?: IconPicker;
	}[];

	summaryCard: {
		title?: string;
		education?: {
			degree?: string;
			institution?: string;
		};
		certifications?: {
			title?: string;
			items: {
				name: string;
			}[];
		};
	};
}

export interface ContactInfoItem {
	icon: IconPicker;
	value: string;
}

export interface ContactCard {
	title: string;
	subtitle?: string;
	contactInfo: ContactInfoItem[];
}

export interface ContactSectionType {
	title: string;
	description?: string;
	label?: string;
	formTitle?: string;
	formSubtitle?: string;
	accessToken: string;

	primaryCard: ContactCard;
	secondaryCard: ContactCard;
}

export interface MarqueeItem {
	primaryText?: string;
	secondaryText?: string;
}

export interface MarqueeType {
	items: MarqueeItem[];
	autoFill: boolean;
	pauseOnHover: boolean;
	pauseOnClick: boolean;
	direction: "left" | "right";
	speed: number;
}

export interface StreamSectionType {
	badge?: string;
	title: string;
	channelName?: string;
	paragraphs: PortableText;

	categories?: { name: string }[];
	socialLinks?: SocialLink[];

	schedule?: {
		title: string;
		icon: IconPicker;
		days: { day: string; time: string }[];
	};

	events?: {
		title: string;
		icon: IconPicker;
		list: { title: string; date?: string; description?: string }[];
	};

	support?: {
		title: string;
		icon: IconPicker;
		buttons: { label: string; url: string }[];
	};

	marquee?: MarqueeType;
}
