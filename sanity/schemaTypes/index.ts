import { type SchemaTypeDefinition } from "sanity";
import { experienceSection } from "@/sanity/schemaTypes/experienceSection";
import { skillsSection } from "@/sanity/schemaTypes/skillsSection";
import { social } from "@/sanity/schemaTypes/social";
import { settingsSEO } from "@/sanity/schemaTypes/settingsSEO";
import { footer } from "@/sanity/schemaTypes/footer";
import { contactSection } from "@/sanity/schemaTypes/contactSection";
import { navBar } from "@/sanity/schemaTypes/navBar";
import { hero } from "@/sanity/schemaTypes/heroSection";
import { cta } from "@/sanity/schemaTypes/callToAction";
import { persona } from "@/sanity/schemaTypes/persona";
import { aboutSection } from "@/sanity/schemaTypes/aboutSection";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [
		experienceSection,
		skillsSection,
		aboutSection,
		social,
		contactSection,
		navBar,
		footer,
		settingsSEO,
		hero,
		cta,
		persona,
	],
};
