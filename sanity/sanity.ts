import { createClient } from "next-sanity";

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
	apiVersion: "2023-05-03",
	useCdn: process.env.NODE_ENV === "production",
});

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

export async function getExperienceSection() {
	return sanityFetch(`*[_type == "experienceSection"]{
  header,
  subheader,
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
