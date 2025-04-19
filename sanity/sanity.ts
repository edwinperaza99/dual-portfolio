// import { createClient } from "next-sanity";
import {
	ExperienceSection,
	SkillsSection,
	SettingsSEO,
	FooterData,
	HeroSectionType,
	AboutSectionType,
	ContactSectionType,
	StreamSectionType,
	NavBarType,
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
    "socialLinks": socialLinks[]->{
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
    "socialLinks": socialLinks[]->{
        displayName,
        link,
        icon
  }
  }
}`);
}

export async function getAboutSection(): Promise<AboutSectionType> {
	return await sanityFetch<AboutSectionType>(`*[_type == "aboutSection"][0]{
        title,
        badge,
        paragraphs[],
    
        "infoBoxes": infoBoxes[]{
          title,
          value,
          icon
        },
    
        summaryCard{
          title,
          education{
            degree,
            institution
          },
          certifications{
            title,
            items[]{
              name
            }
          }
        }
      }`);
}

export async function getContactSection(): Promise<ContactSectionType> {
	return sanityFetch<ContactSectionType>(`*[_type == "contactSection"][0]{
      title,
      description,
      label,
      formTitle,
      formSubtitle,
      accessToken,
      primaryCard{
        title,
        subtitle,
        contactInfo[]{
          icon, 
          value
        }
      },
  
      secondaryCard{
        title,
        subtitle,
        contactInfo[]{
          icon,
          value
        }
      }
    }`);
}

export async function getStreamSection(): Promise<StreamSectionType> {
	return sanityFetch<StreamSectionType>(`*[_type == "streamSection"][0]{
  badge,
  title,
  channelName,
  paragraphs,
  "categories": categories[]{ name },
  "socialLinks": socials[]->{
    label,
    url,
    icon           
  },
  schedule{
    title,
    icon,
    "days": days[]{ day, time }
  },
  events{
    title,
    icon,
    "list": list[]{ title, date, description }
  },
  support{
    title,
    icon,
    "buttons": buttons[]{ label, url }
  },
  "marquee": marquee->{
    title,
    autoFill,
    pauseOnHover,
    pauseOnClick,
    direction,
    speed,
    "items": items[]{
      primaryText,
      secondaryText
    }
  }
}`);
}

export async function getNavBarData(): Promise<NavBarType> {
	return sanityFetch<NavBarType>(`*[_type == "navbar"][0]{
  primaryName,
  primaryIcon,
  secondaryName,
  secondaryIcon
}`);
}
