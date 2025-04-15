import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Dual Portfolio")
		.items([
			// First Profile grouping
			S.listItem()
				.title("First Profile")
				.child(
					S.list()
						.title("First Profile Content")
						.items([
							S.listItem()
								.title("Hero")
								.child(
									S.document().schemaType("firstHero").documentId("firstHero")
								),
							S.listItem()
								.title("About")
								.child(
									S.document().schemaType("firstAbout").documentId("firstAbout")
								),
							S.listItem()
								.title("Experience")
								.child(
									S.document()
										.schemaType("experienceSection")
										.documentId("experienceSection")
								),
							S.listItem()
								.title("Skills")
								.child(
									S.document()
										.schemaType("skillsSection")
										.documentId("skillsSection")
								),
						])
				),

			// Second Profile grouping
			S.listItem()
				.title("Second Profile")
				.child(
					S.list()
						.title("Second Profile Content")
						.items([
							S.listItem()
								.title("Hero")
								.child(
									S.document().schemaType("secondHero").documentId("secondHero")
								),
							S.listItem()
								.title("About")
								.child(
									S.document()
										.schemaType("secondAbout")
										.documentId("secondAbout")
								),
							// S.listItem()
							// 	.title("Additional Section 1")
							// 	.child(
							// 		S.document()
							// 			.schemaType("secondAdditional1")
							// 			.documentId("secondAdditional1")
							// 	),
						])
				),

			// Divider between profiles and global settings
			S.divider(),

			// Site Settings (shared across the site)
			S.listItem()
				.title("Site Settings")
				.child(
					S.list()
						.title("Site Settings")
						.items([
							S.documentTypeListItem("navbar").title("Nav Bar"),
							S.documentTypeListItem("footer").title("Footer"),
							S.documentTypeListItem("social").title("Social Links"),
							S.documentTypeListItem("settingsSEO").title("SEO Settings"),
							S.documentTypeListItem("contactForm").title("Contact Form"),
						])
				),
		]);
