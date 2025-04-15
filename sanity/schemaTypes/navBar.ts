import { defineField, defineType } from "sanity";

export const navBar = defineType({
	name: "navbar",
	title: "Navbar",
	type: "document",
	description:
		"Settings for the navigation bar. For better styling set at least title or logo.",
	fields: [
		defineField({
			name: "websiteTitle",
			title: "Website Title",
			type: "string",
			description: "The title of your website.",
		}),
		defineField({
			name: "logo",
			title: "Logo",
			type: "image",
			options: { hotspot: true },
			description: "Upload your logo image.",
		}),
		defineField({
			name: "buttonOneTitle",
			title: "Button 1 Title",
			type: "string",
			description: "Title for the first navigation button. (e.g. 'SysAdmin')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "buttonTwoTitle",
			title: "Button 2 Title",
			type: "string",
			description: "Title for the second navigation button. (e.g. 'Streamer')",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			websiteTitle: "websiteTitle",
			buttonOneTitle: "buttonOneTitle",
			buttonTwoTitle: "buttonTwoTitle",
		},
		prepare(selection) {
			const { websiteTitle, buttonOneTitle, buttonTwoTitle } = selection;
			return {
				title: websiteTitle,
				subtitle: `${buttonOneTitle}, ${buttonTwoTitle}`,
			};
		},
	},
});
