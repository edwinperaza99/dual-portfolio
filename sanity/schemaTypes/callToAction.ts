import { defineField, defineType } from "sanity";

export const cta = defineType({
	name: "cta",
	title: "Call to Action",
	type: "object",
	fields: [
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			description: "Text to display on the button.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
			description: "Optional. Leave blank to just use as a button label.",
			validation: (Rule) => Rule.uri({ allowRelative: true }).required(),
		}),
	],
});
