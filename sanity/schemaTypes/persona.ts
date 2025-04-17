import { defineField, defineType } from "sanity";

export const persona = defineType({
	name: "persona",
	title: "Persona",
	type: "object",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Title for the persona section. (e.g., 'SysAdmin')",
		}),
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			description: "Name of the persona. (e.g., 'John Doe')",
		}),
		defineField({
			name: "tagline",
			title: "Tagline",
			type: "string",
			description: "Tagline or short description of the persona.",
		}),
		defineField({
			name: "primaryCTA",
			title: "Primary CTA",
			type: "cta",
		}),
		defineField({
			name: "secondaryCTA",
			title: "Secondary CTA",
			type: "cta",
		}),
		defineField({
			name: "socialLinks",
			title: "Social Links",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "social" }],
				},
			],
		}),
	],
});
