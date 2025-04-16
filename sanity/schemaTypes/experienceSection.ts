import { defineField, defineType } from "sanity";

export const experienceSection = defineType({
	name: "experienceSection",
	title: "Work Experience",
	type: "document",
	description: "Configure the work experience section of your portfolio.",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: 'Main title of the section (e.g., "Work Experience")',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "badge",
			title: "Badge",
			type: "string",
			description: 'Badge of the section (e.g., "Professional Journey")',
		}),
		defineField({
			name: "experiences",
			title: "Experiences",
			type: "array",
			validation: (Rule) => Rule.required(),
			of: [
				{
					type: "object",
					name: "job",
					title: "Job Experience",
					fields: [
						defineField({
							name: "jobTitle",
							title: "Job Title",
							type: "string",
						}),
						defineField({
							name: "company",
							title: "Company",
							type: "string",
						}),
						defineField({
							name: "location",
							title: "Location",
							type: "string",
							description: "City, State, Country",
						}),
						defineField({
							name: "startDate",
							title: "Start Date",
							type: "string",
						}),
						defineField({
							name: "endDate",
							title: "End Date",
							type: "string",
						}),
						defineField({
							name: "responsibilities",
							title: "Responsibilities / Achievements",
							type: "array",
							of: [{ type: "string" }],
							description:
								"Bullet points for responsibilities or achievements.",
						}),
					],
					preview: {
						select: {
							jobTitle: "jobTitle",
							company: "company",
							startDate: "startDate",
							endDate: "endDate",
						},
						prepare(selection) {
							const { jobTitle, company, startDate, endDate } = selection;
							return {
								title: jobTitle,
								subtitle: `${company} | ${startDate} - ${endDate}`,
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
			experiences: "experiences",
		},
		prepare(selection) {
			const { title, badge, experiences } = selection;
			const count = experiences ? experiences.length : 0;
			return {
				title: title,
				subtitle: `${badge} • ${count} experience${count === 1 ? "" : "s"}`,
			};
		},
	},
});
