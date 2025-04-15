import { defineField, defineType } from "sanity";

export const experienceSection = defineType({
	name: "experienceSection",
	title: "Work Experience",
	type: "document",
	description: "Configure the work experience section of your portfolio.",
	fields: [
		defineField({
			name: "header",
			title: "Header",
			type: "string",
			description: 'Main title of the section (e.g., "Work Experience")',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subhead",
			title: "Subhead",
			type: "string",
			description: 'Subtitle of the section (e.g., "Professional Journey")',
			validation: (Rule) => Rule.required(),
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
							name: "startDate",
							title: "Start Date",
							type: "date",
						}),
						defineField({
							name: "endDate",
							title: "End Date",
							type: "date",
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
							let dateRange = "";
							if (startDate && endDate) {
								const start = new Date(startDate).toLocaleDateString();
								const end = new Date(endDate).toLocaleDateString();
								dateRange = ` (${start} - ${end})`;
							}
							return {
								title: jobTitle,
								subtitle: `${company}${dateRange}`,
							};
						},
					},
				},
			],
		}),
	],
	preview: {
		select: {
			header: "header",
			subhead: "subhead",
			experiences: "experiences",
		},
		prepare(selection) {
			const { header, subhead, experiences } = selection;
			const count = experiences ? experiences.length : 0;
			return {
				title: header,
				subtitle: `${subhead} • ${count} experience${count === 1 ? "" : "s"}`,
			};
		},
	},
});
