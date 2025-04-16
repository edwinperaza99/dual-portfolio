// import { createClient } from "next-sanity";
import { ExperienceSection, SkillsSection } from "@/lib/types";
import { client } from "@/sanity/lib/client";

// export const client = createClient({
// 	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
// 	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
// 	apiVersion: "2023-05-03",
// 	useCdn: process.env.NODE_ENV === "production",
// });

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
