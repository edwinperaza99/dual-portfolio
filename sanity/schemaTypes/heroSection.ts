import { defineField, defineType } from "sanity";

export const hero = defineType({
	name: "hero",
	title: "Hero Section",
	type: "document",
	fields: [
		defineField({
			name: "personalName",
			title: "Primary Persona Name",
			type: "string",
		}),
		defineField({
			name: "primary",
			title: "Primary Persona",
			type: "persona",
		}),
		defineField({
			name: "secondary",
			title: "Secondary Persona",
			type: "persona",
		}),
	],
});
