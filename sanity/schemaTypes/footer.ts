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
			name: "subheader",
			title: "Subheader",
			type: "string",
			description:
				"A subheader line or tagline for the footer (e.g., 'All rights reserved')",
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
			header: "header",
			subheader: "subheader",
			socials: "socials",
		},
		prepare({ header, subheader, socials }) {
			const socialCount = socials ? socials.length : 0;
			return {
				title: `Footer: ${header}`,
				subtitle: subheader
					? `${subheader} • ${socialCount} social${socialCount === 1 ? "" : "s"}`
					: `${socialCount} social${socialCount === 1 ? "" : "s"}`,
			};
		},
	},
});
