import { defineType, defineField } from "sanity";

export const aboutSection = defineType({
	name: "aboutSection",
	title: "About Section",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "Main title of the section (e.g., 'About Me')",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "badge",
			title: "Badge",
			type: "string",
			description: "Badge of the section (e.g., 'Who I Am')",
		}),

		defineField({
			name: "paragraphs",
			title: "Paragraphs",
			description: "Rich‑text blocks shown in the left column",
			validation: (Rule) => Rule.required(),
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Quote", value: "quote" },
					],
					marks: {
						decorators: [
							{ title: "Bold", value: "strong" },
							{ title: "Italic", value: "em" },
						],
						annotations: [
							{
								name: "link",
								title: "External Link",
								type: "object",
								fields: [
									{
										name: "href",
										title: "URL",
										type: "url",
										validation: (Rule) => Rule.uri({ allowRelative: true }),
									},
								],
							},
						],
					},
				},
			],
		}),

		defineField({
			name: "infoBoxes",
			title: "Info Boxes",
			description: "Array of info boxes with title, value and icon",
			type: "array",
			of: [
				{
					name: "infoBox",
					title: "Info Box",
					type: "object",
					description: "Info box with an icon and a value",
					fields: [
						{ name: "title", title: "Title", type: "string" },
						{ name: "value", title: "Value", type: "string" },
						{
							name: "icon",
							title: "Icon",
							type: "iconPicker",
							options: {
								outputFormat: "react",
								providers: ["fa", "hi", "fi", "si"],
							},
						},
					],
				},
			],
		}),

		defineField({
			name: "summaryCard",
			title: "Summary Card",
			description: "Card shown in the right column",
			type: "object",
			fields: [
				{ name: "title", title: "Card Title", type: "string" },

				{
					name: "education",
					title: "Education",
					description: "Highest education credentials",
					type: "object",
					fields: [
						{ name: "degree", title: "Degree", type: "string" },
						{ name: "institution", title: "Institution", type: "string" },
					],
				},

				{
					name: "certifications",
					title: "Certifications",
					description: "Professional certifications list",
					type: "object",
					fields: [
						{ name: "title", title: "Section Title", type: "string" },
						{
							name: "items",
							title: "Items",
							type: "array",
							of: [
								{
									name: "certItem",
									title: "Certification Item",
									type: "object",
									description: "Single certification",
									fields: [{ name: "name", title: "Name", type: "string" }],
								},
							],
						},
					],
				},
			],
		}),
	],
});
