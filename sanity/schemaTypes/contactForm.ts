import { defineField, defineType } from "sanity";

export const contactForm = defineType({
	name: "contactForm",
	title: "Contact Form",
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
			name: "accessToken",
			title: "Access Token",
			type: "string",
			description:
				"The access token for Web3Forms. This is required to send emails from the contact form.",
			validation: (Rule) => Rule.required(),
		}),
	],
});
