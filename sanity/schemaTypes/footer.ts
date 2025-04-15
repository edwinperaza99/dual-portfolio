import { defineField, defineType } from "sanity";

export const footer = defineType({
	name: "footer",
	title: "Footer Section",
	type: "document",
	description: "Configure the footer section of your portfolio.",
	fields: [
		defineField({
			name: "header",
			title: "Header",
			type: "string",
			description: "Could be the name of your site (e.g., 'John Doe')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subhead",
			title: "Subhead",
			type: "string",
			description:
				"A subheadline or tagline for the footer (e.g., 'All rights reserved')",
		}),
		defineField({
			name: "socials",
			title: "Socials",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "social" }],
				},
			],
			description: "Select which social links to display in the footer",
		}),
	],
	preview: {
		select: {
			name: "name",
			subhead: "subhead",
			socials: "socials",
		},
		prepare(selection) {
			const { name, subhead, socials } = selection;
			const count = socials ? socials.length : 0;
			return {
				title: name,
				subtitle: `${subhead} • ${count} social link${count === 1 ? "" : "s"}`,
			};
		},
	},
});
