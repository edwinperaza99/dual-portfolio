import { defineType, defineField } from "sanity";

export const marquee = defineType({
	name: "marquee",
	title: "Marquee",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Internal Title",
			type: "string",
			description:
				"A short name to identify this marquee (not shown on the site)",
		}),

		defineField({
			name: "items",
			title: "Items",
			type: "array",
			description:
				"Items to scroll. Each item has two parts: a **primary** part (in your primary color) and a **secondary** part (in white). Either part can be left blank.\n\n" +
				"**Examples:**\n" +
				"- Primary only: `Breaking News:` → renders only “Breaking News:” in primary color.\n" +
				"- Secondary only: `Check out our latest updates.` → renders only that text in white.\n" +
				"- Both: Primary = `Breaking News:`, Secondary = `Check out our latest updates.` → renders “Breaking News:” in primary, followed by “Check out our latest updates.” in white.",
			of: [
				{
					type: "object",
					name: "marqueeItem",
					title: "Marquee Item",
					fields: [
						defineField({
							name: "primaryText",
							title: "Primary Text",
							type: "string",
							description:
								"Rendered in your primary color. Optional — leave blank if you only want secondary text.",
						}),
						defineField({
							name: "secondaryText",
							title: "Secondary Text",
							type: "string",
							description:
								"Rendered in white. Optional — leave blank if you only want primary text.",
						}),
					],
				},
			],
			validation: (Rule) => Rule.min(1).error("At least one item is required"),
		}),

		defineField({
			name: "autoFill",
			title: "Auto‑fill",
			type: "boolean",
			description: "Repeat items to fill the width",
			initialValue: true,
		}),

		defineField({
			name: "pauseOnHover",
			title: "Pause on Hover",
			type: "boolean",
			initialValue: true,
		}),

		defineField({
			name: "pauseOnClick",
			title: "Pause on Click",
			type: "boolean",
			initialValue: true,
		}),

		defineField({
			name: "direction",
			title: "Direction",
			type: "string",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
				],
				layout: "radio",
			},
			initialValue: "left",
		}),

		defineField({
			name: "speed",
			title: "Speed",
			type: "number",
			description: "Scroll speed in pixels per second",
			initialValue: 50,
			validation: (Rule) =>
				Rule.min(10).max(200).warning("Too slow or too fast?"),
		}),
	],
});
