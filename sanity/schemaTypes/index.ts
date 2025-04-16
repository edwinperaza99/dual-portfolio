import { type SchemaTypeDefinition } from "sanity";
import { experienceSection } from "@/sanity/schemaTypes/experienceSection";
import { skillsSection } from "@/sanity/schemaTypes/skillsSection";
import { social } from "@/sanity/schemaTypes/social";
import { settingsSEO } from "@/sanity/schemaTypes/settingsSEO";
import { footer } from "@/sanity/schemaTypes/footer";
import { contactForm } from "@/sanity/schemaTypes/contactForm";
import { navBar } from "@/sanity/schemaTypes/navBar";
import { hero } from "@/sanity/schemaTypes/heroSection";
import { cta } from "@/sanity/schemaTypes/callToAction";
import { personaSection } from "@/sanity/schemaTypes/persona";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		experienceSection,
		skillsSection,
		social,
		contactForm,
		navBar,
		footer,
		settingsSEO,
		hero,
		cta,
		personaSection,
	],
};
