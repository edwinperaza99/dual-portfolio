import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
	S.list()
		.title("Dual Portfolio")
		.items([
			// Unified Hero Section
			S.listItem()
				.title("Hero")
				.child(S.document().schemaType("hero").documentId("hero")),

			// First Profile grouping
			S.listItem()
				.title("First Profile")
				.child(
					S.list()
						.title("First Profile Content")
						.items([
							S.listItem()
								.title("About")
								.child(
									S.document()
										.schemaType("aboutSection")
										.documentId("aboutSection")
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
								.title("About Stream")
								.child(
									S.document()
										.schemaType("streamSection")
										.documentId("streamSection")
								),
						])
				),

			S.divider(),

			// Global Site Settings
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
							S.documentTypeListItem("contactSection").title("Contact Section"),
						])
				),
		]);
