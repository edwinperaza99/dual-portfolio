import { defineField, defineType } from "sanity";

export const firstHero = defineType({
	name: "firstHero",
	title: "First Hero Section",
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			description: "Name or primary heading (e.g., 'John Doe').",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "role",
			title: "Role / Title",
			type: "string",
			description:
				"Short role or descriptive title (e.g., 'System Administrator')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description:
				"A short paragraph describing expertise (e.g., 'Expert system administrator...').",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "primaryCtaText",
			title: "Primary CTA Text",
			type: "string",
			description:
				"Text for the main call-to-action button (e.g. 'Download Resume').",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "primaryCtaLink",
			title: "Primary CTA Link",
			type: "url",
			description: "URL for the primary call-to-action.",
			validation: (Rule) => Rule.uri({ allowRelative: true }).required(),
		}),
		defineField({
			name: "secondaryCtaText",
			title: "Secondary CTA Text",
			type: "string",
			description:
				"Text for the second call-to-action button (e.g. 'View Projects').",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "secondaryCtaLink",
			title: "Secondary CTA Link",
			type: "url",
			description: "URL for the secondary call-to-action.",
			validation: (Rule) => Rule.uri({ allowRelative: true }).required(),
		}),
		defineField({
			name: "resume",
			title: "Resume",
			type: "file",
			description: "Upload your resume file.",
		}),

		defineField({
			name: "socials",
			title: "Social Links",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "social" }],
				},
			],
			description:
				"Select which social links to display for this hero section.",
		}),
	],
	preview: {
		select: {
			name: "name",
			role: "role",
			description: "description",
		},
		prepare(selection) {
			const { name, role, description } = selection;
			const truncatedDesc =
				description && description.length > 60
					? description.slice(0, 60) + "..."
					: description;
			return {
				title: `${name} – ${role}`,
				subtitle: truncatedDesc,
			};
		},
	},
});
