import { defineField, defineType } from "sanity";

export const social = defineType({
	name: "social",
	title: "Social Link",
	type: "document",
	description: "A single social link with an icon, display name, and URL.",
	fields: [
		defineField({
			name: "icon",
			title: "Icon",
			type: "iconPicker",
			options: {
				outputFormat: "react",
				providers: ["fa", "hi", "fi", "si"],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "displayName",
			title: "Display Name",
			type: "string",
			description: "The name to display (e.g. 'Instagram' or your handle).",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "link",
			title: "URL",
			type: "url",
			description:
				"The URL to the social media profile or page. Must be a valid URL including 'https://'.",
			validation: (Rule) => Rule.required(),
		}),
	],
});
