"use client";

import { useState, useRef } from "react";
import NavBar from "@/components/sections/nav-bar";
// import AboutSection from "@/components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import SkillsSection from "@/components/sections/skills-section";
// import StreamingSection from "@/components/sections/streaming-section";
// import ContactSection from "@/components/sections/contact-section";
import SliderView from "@/components/sections/slider-view";
import { AnimatePresence } from "framer-motion";
import {
	AboutSectionType,
	ExperienceSection as ExperienceSectionType,
	HeroSectionType,
	SkillsSection as SkillsSectionType,
} from "@/lib/types";
import AboutSection from "@/components/sections/about-section";

type Props = {
	pageData: {
		skills: SkillsSectionType;
		experience: ExperienceSectionType;
		hero: HeroSectionType;
		about: AboutSectionType;
		// contact: ContactSection;
		// footer: FooterData;
	};
};

export default function Main({ pageData }: Props) {
	// Update the state type and initial value
	const [activePersona, setActivePersona] = useState<"primary" | "secondary">(
		"primary"
	);

	// Add a new ref for the slider position
	const sliderPositionRef = useRef(100); // Start at 100 for sysadmin

	// Fix the slider and button logic to ensure they're in sync

	// Update the slider change handler
	const handleSliderChange = (position: number) => {
		// If slider is more than 50% to the right, show secondary content
		if (position >= 50 && activePersona !== "primary") {
			setActivePersona("primary");
		} else if (position < 50 && activePersona !== "secondary") {
			setActivePersona("secondary");
		}
	};

	// Update the section change handler
	const handlePersonaChange = (persona: "primary" | "secondary") => {
		if (persona === activePersona) return;
		setActivePersona(persona);

		// Update the slider position based on the selected persona
		sliderPositionRef.current = persona === "primary" ? 100 : 0;
	};

	// In a real implementation, you would fetch this data from Sanity.io

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-950 to-[#0c0a1d] text-white overflow-hidden">
			{/* Update references to activeSection/setActiveSection */}
			<NavBar
				activePersona={activePersona}
				setActivePersona={handlePersonaChange}
			/>

			<main className="relative">
				{/* Hero Section with Slider */}
				<SliderView
					sliderPositionRef={sliderPositionRef}
					onSliderChange={handleSliderChange}
					heroData={pageData.hero}
				/>

				{/* TODO: make animation smoother with motion  */}
				<AnimatePresence mode="wait">
					{/* Update conditional rendering */}
					{activePersona === "primary" ? (
						<div key="primary-content">
							<AboutSection aboutData={pageData.about} />
							<ExperienceSection experienceData={pageData.experience} />
							<SkillsSection skillsData={pageData.skills} />
						</div>
					) : (
						<div key="secondary-content">
							placeholder
							{/* <StreamingSection /> */}
						</div>
					)}
				</AnimatePresence>

				{/* <ContactSection /> */}
			</main>
		</div>
	);
}
