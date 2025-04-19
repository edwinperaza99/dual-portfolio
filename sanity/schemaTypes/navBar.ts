import { defineField, defineType } from "sanity";

export const navBar = defineType({
	name: "navbar",
	title: "Navigation Bar",
	description: "Configure the navigation bar of your portfolio.",
	type: "document",
	fields: [
		defineField({
			name: "primaryName",
			title: "Primary Persona Label",
			type: "string",
			description: "Displayed label for the primary persona (e.g. 'SysAdmin')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "primaryIcon",
			title: "Primary Persona Icon",
			type: "iconPicker",
			options: {
				outputFormat: "react",
				providers: ["fa", "hi", "fi", "si"],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "secondaryName",
			title: "Secondary Persona Label",
			type: "string",
			description:
				"Displayed label for the secondary persona (e.g. 'Streamer')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "secondaryIcon",
			title: "Secondary Persona Icon",
			type: "iconPicker",
			options: {
				outputFormat: "react",
				providers: ["fa", "hi", "fi", "si"],
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			primary: "primaryName",
			secondary: "secondaryName",
		},
		prepare({ primary, secondary }) {
			return {
				title: `Toggle: ${primary} vs ${secondary}`,
			};
		},
	},
});
