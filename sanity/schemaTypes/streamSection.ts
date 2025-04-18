import { defineType, defineField } from "sanity";

export const streamSection = defineType({
	name: "streamSection",
	title: "Stream Page",
	type: "document",
	fields: [
		defineField({
			name: "badge",
			type: "string",
			title: "Badge",
			description: "Badge of the page (e.g., 'My Stream')",
		}),
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "Main title of the page (e.g., 'My Stream')",
			validation: (r) => r.required(),
		}),
		defineField({
			name: "channelName",
			type: "string",
			title: "Channel Name",
			description: "Name of the channel used to fetch stream data",
			validation: (r) => r.required(),
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
			name: "categories",
			type: "array",
			of: [
				{
					type: "object",
					fields: [defineField({ name: "name", type: "string" })],
				},
			],
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

		defineField({
			name: "schedule",
			type: "object",
			fields: [
				defineField({
					name: "title",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
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
					name: "days",
					type: "array",
					validation: (Rule) => Rule.required(),
					of: [
						{
							type: "object",
							fields: [
								defineField({ name: "day", type: "string" }),
								defineField({ name: "time", type: "string" }),
							],
						},
					],
				}),
			],
		}),

		defineField({
			name: "events",
			type: "object",
			fields: [
				defineField({
					name: "title",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
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
					name: "list",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "title",
									type: "string",
									validation: (Rule) => Rule.required(),
								}),
								defineField({ name: "date", type: "date" }),
								defineField({ name: "description", type: "text" }),
							],
						},
					],
				}),
			],
		}),

		defineField({
			name: "support",
			type: "object",
			fields: [
				defineField({
					name: "title",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
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
					name: "buttons",
					type: "array",
					validation: (Rule) => Rule.required(),
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "label",
									type: "string",
									validation: (Rule) => Rule.required(),
								}),
								defineField({
									name: "url",
									type: "url",
									validation: (Rule) =>
										Rule.uri({ allowRelative: true }).required(),
								}),
							],
						},
					],
				}),
			],
		}),

		defineField({
			name: "marquee",
			title: "Marquee",
			type: "reference",
			to: [{ type: "marquee" }],
			description: "Pick which marquee to scroll above the page",
		}),
	],
});
