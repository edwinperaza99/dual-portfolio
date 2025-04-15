import { defineType, defineField } from "sanity";

export const settingsSEO = defineType({
	name: "settingsSEO",
	title: "Settings for SEO",
	type: "document",
	fields: [
		defineField({
			name: "siteTitle",
			title: "Site Title",
			type: "string",
			description:
				"The main title of your site. This appears in the browser tab and as the default title in search results.",
			initialValue: "My Awesome Site",
			validation: (Rule) => Rule.required().error("Site Title is required"),
		}),
		defineField({
			name: "siteDescription",
			title: "Site Description",
			type: "text",
			description:
				"A short description of your site’s purpose. Shown in search engine results and when sharing on social media by default.",
			initialValue:
				"Welcome to My Awesome Site, where we share amazing content.",
			validation: (Rule) =>
				Rule.required().error("Site Description is required"),
		}),
		defineField({
			name: "applicationName",
			title: "Application Name",
			type: "string",
			description:
				'Used in <meta name="application-name">. Example: your site or app’s name.',
			initialValue: "MyApp",
		}),
		defineField({
			name: "authors",
			title: "Authors",
			type: "array",
			of: [
				defineField({
					name: "author",
					title: "Author",
					type: "object",
					fields: [
						defineField({
							name: "name",
							title: "Name",
							type: "string",
							description:
								'Author name. Used in <meta name="author"> and Next.js authors metadata.',
							validation: (Rule) =>
								Rule.required().error("Author name is required"),
						}),
						defineField({
							name: "url",
							title: "URL",
							type: "url",
							description: "Author’s website or profile URL.",
						}),
					],
				}),
			],
			description:
				"List of site authors. Appears in search results and page metadata.",
			initialValue: [{ name: "Your Name", url: "https://example.com" }],
		}),
		defineField({
			name: "creator",
			title: "Creator",
			type: "string",
			description: 'Content creator. Used in <meta name="creator">.',
			initialValue: "Your Name",
		}),
		defineField({
			name: "publisher",
			title: "Publisher",
			type: "string",
			description: 'Content publisher. Used in <meta name="publisher">.',
			initialValue: "Your Name or Company",
		}),
		defineField({
			name: "defaultKeywords",
			title: "Default Keywords",
			type: "array",
			of: [{ type: "string" }],
			description:
				'Comma-separated keywords for SEO. Used in <meta name="keywords">.',
			initialValue: ["blog", "portfolio", "web development"],
		}),

		// Open Graph settings
		defineField({
			name: "openGraphUrl",
			title: "Open Graph URL",
			type: "url",
			description:
				"The canonical URL of your site for social sharing (og:url).",
			initialValue: "https://example.com",
		}),
		defineField({
			name: "openGraphType",
			title: "Open Graph Type",
			type: "string",
			initialValue: "website",
			description:
				'og:type: Defines the type of your content. Usually "website" for home pages.',
		}),
		defineField({
			name: "openGraphLocale",
			title: "Open Graph Locale",
			type: "string",
			initialValue: "en_US",
			description: "og:locale: The locale of your website, e.g. en_US.",
		}),
		defineField({
			name: "openGraphSiteName",
			title: "Open Graph Site Name",
			type: "string",
			description: "og:site_name: The name of your site in social previews.",
			initialValue: "My Awesome Site",
		}),
		defineField({
			name: "openGraphImages",
			title: "Open Graph Images",
			type: "array",
			of: [
				defineField({
					name: "image",
					title: "Image",
					type: "image",
					options: { hotspot: true },
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alt Text",
							description:
								"Alternative text for the image. Important for accessibility and social previews.",
						},
					],
				}),
			],
			description:
				"Images for social sharing (og:image). Recommended size: 1200x630px.",
		}),

		// Twitter card settings
		defineField({
			name: "twitterCard",
			title: "Twitter Card Type",
			type: "string",
			initialValue: "summary_large_image",
			description:
				'twitter:card: Controls how your content is displayed on Twitter. "summary_large_image" shows a large image preview.\n' +
				"Examples: summary (small image), summary_large_image (large image), player, app.",
			options: {
				list: [
					{ title: "Summary", value: "summary" },
					{ title: "Summary Large Image", value: "summary_large_image" },
					{ title: "Player", value: "player" },
					{ title: "App", value: "app" },
				],
				layout: "dropdown",
			},
		}),
		defineField({
			name: "twitterImages",
			title: "Twitter Images",
			type: "array",
			of: [
				defineField({
					name: "image",
					title: "Image",
					type: "image",
					options: { hotspot: true },
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alt Text",
							description: "Alt text for Twitter card images.",
						},
					],
				}),
			],
			description:
				"Images for Twitter card previews. Use same aspect ratio as Open Graph images.",
		}),
	],
});
