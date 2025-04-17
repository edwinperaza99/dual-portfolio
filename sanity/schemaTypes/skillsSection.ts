import { defineField, defineType } from "sanity";

export const skillsSection = defineType({
	name: "skillsSection",
	title: "Skills Section",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: 'Main title for the skills section (e.g., "Skills")',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "badge",
			title: "Badge",
			type: "string",
			description: 'Badge for the skills section (e.g., "Technical Expertise")',
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [
				{
					type: "object",
					name: "skillCategory",
					title: "Skill Category",
					validation: (Rule) => Rule.required(),
					fields: [
						defineField({
							name: "categoryTitle",
							title: "Category Title",
							type: "string",
							description:
								"Title of the skill category (e.g., 'Programming Languages')",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "categoryIcon",
							title: "Category Icon",
							type: "iconPicker",
							options: {
								outputFormat: "react",
								providers: ["fa", "hi", "fi", "si"],
							},
							description: "Select an icon for the category",
						}),
						defineField({
							name: "skills",
							title: "Skills",
							type: "array",
							of: [
								{
									type: "object",
									name: "skill",
									title: "Skill",
									fields: [
										defineField({
											name: "skillName",
											title: "Skill",
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
											description: "Select an icon for the skill",
										}),
									],
									preview: {
										select: {
											title: "skillName",
										},
										prepare(selection) {
											return { title: selection.title };
										},
									},
								},
							],
						}),
					],
					preview: {
						select: {
							categoryTitle: "categoryTitle",
							skills: "skills",
						},
						prepare(selection) {
							const { categoryTitle, skills } = selection;
							const count = skills ? skills.length : 0;
							return {
								title: categoryTitle,
								subtitle: `${count} skill${count === 1 ? "" : "s"}`,
							};
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			badge: "badge",
			categories: "categories",
		},
		prepare(selection) {
			const { title, badge, categories } = selection;
			const count = categories ? categories.length : 0;
			return {
				title: title,
				subtitle: `${badge} • ${count} category${count === 1 ? "" : "s"}`,
			};
		},
	},
});
