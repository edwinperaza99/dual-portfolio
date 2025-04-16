// import { createClient } from "next-sanity";
import {
	ExperienceSection,
	SkillsSection,
	SettingsSEO,
	FooterData,
	HeroSectionType,
} from "@/lib/types";
import { client } from "@/sanity/lib/client";

export function sanityFetch<
	T,
	Params extends Record<string, unknown> = Record<string, never>,
>(
	query: string,
	params?: Params,
	options?: {
		revalidate?: number | false;
	}
): Promise<T> {
	return client.fetch<T>(query, params ?? {}, {
		// set to false to disable revalidation
		next: { revalidate: options?.revalidate ?? 1 },
	});
}

export async function getExperienceSection(): Promise<ExperienceSection> {
	return await sanityFetch<ExperienceSection>(`*[_type == "experienceSection"][0]{
  title,
  badge,
  experiences[]{
    jobTitle,
    company,
    location,
    startDate,
    endDate,
    responsibilities
  }
}`);
}

export async function getSkillsSection(): Promise<SkillsSection> {
	return await sanityFetch<SkillsSection>(`*[_type == "skillsSection"][0]{
  title,
  badge,
  categories[]{
    categoryTitle,
    categoryIcon,
    skills[]{
      skillName,
      icon
    }
  }
}`);
}

export async function getSettingsSEO(): Promise<SettingsSEO> {
	return await sanityFetch<SettingsSEO>(
		`*[_type == "settingsSEO"][0]{
    siteTitle,
    siteDescription,
    applicationName,
    authors[] {
      name,
      url
    },
    creator,
    publisher,
    defaultKeywords,
    openGraphUrl,
    openGraphType,
    openGraphLocale,
    openGraphSiteName,
    openGraphImages[] {
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    twitterCard,
    twitterImages[] {
      asset->{
        url
      },
      alt
    }
  }`
	);
}

export async function getFooterData(): Promise<FooterData> {
	return await sanityFetch<FooterData>(`*[_type == "footer"][0]{
  header,
  subheader,
  "socialLinks": socials[]->{
    displayName,
    link,
    icon
  }
}`);
}

export async function getHeroSection(): Promise<HeroSectionType> {
	return await sanityFetch<HeroSectionType>(`*[_type == "hero"][0]{
  primary {
    title,
    name,
    tagline,
    primaryCTA,
    secondaryCTA,
    "socialLinks": socials[]->{
        displayName,
        link,
        icon
  }
  },
  secondary {
    title,
    name,
    tagline,
    primaryCTA,
    secondaryCTA,
    "socialLinks": socials[]->{
        displayName,
        link,
        icon
  }
  }
}`);
}
