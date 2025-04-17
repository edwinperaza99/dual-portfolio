import { defineField, defineType } from "sanity";

export const contactSection = defineType({
	name: "contactSection",
	title: "Contact Section",
	type: "document",
	description:
		"In order to receive emails from your contact form, you will need to navigate to the following website https://web3forms.com/ from there create and access token and provide that here.",
	fields: [
		defineField({
			name: "title",
			title: "Form Title",
			type: "string",
			initialValue: "Send A Message",
			description:
				"Title for the contact form. This will be displayed above the form.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Form Description",
			type: "string",
			initialValue: "I would love to hear from you!",
			description: "A brief description or instruction for the contact form.",
		}),
		defineField({
			name: "label",
			title: "Label",
			type: "string",
			initialValue: "Get In Touch",
			description:
				"Label for the contact form. This will be displayed above the form.",
		}),
		defineField({
			name: "formTitle",
			title: "Form Title",
			type: "string",
			initialValue: "Send a Message",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "formSubtitle",
			title: "Form Subtitle",
			type: "string",
			initialValue: "I usually reply in under 24 h.",
		}),

		defineField({
			name: "accessToken",
			title: "Access Token",
			type: "string",
			description:
				"The access token for Web3Forms. This is required to send emails from the contact form.",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "primaryCard",
			title: "Primary Card",
			type: "object",
			fields: [
				defineField({
					name: "title",
					title: "Card Title",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "subtitle",
					title: "Card Subtitle",
					type: "string",
				}),
				defineField({
					name: "contactInfo",
					title: "Contact Information",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "icon",
									title: "Icon",
									type: "iconPicker",
									options: {
										outputFormat: "react",
										providers: ["fa", "hi", "fi", "si"],
									},
								}),
								defineField({
									name: "value",
									title: "Text / Value",
									type: "string",
									validation: (Rule) => Rule.required(),
								}),
							],
						},
					],
				}),
			],
		}),

		defineField({
			name: "secondaryCard",
			title: "Secondary Card",
			type: "object",
			fields: [
				defineField({
					name: "title",
					title: "Card Title",
					type: "string",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "subtitle",
					title: "Card Subtitle",
					type: "string",
				}),
				defineField({
					name: "contactInfo",
					title: "Contact Information",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "icon",
									title: "Icon",
									type: "iconPicker",
									options: {
										outputFormat: "react",
										providers: ["fa", "hi", "fi", "si"],
									},
								}),
								defineField({
									name: "value",
									title: "Text / Value",
									type: "string",
									validation: (Rule) => Rule.required(),
								}),
							],
						},
					],
				}),
			],
		}),
	],
});
