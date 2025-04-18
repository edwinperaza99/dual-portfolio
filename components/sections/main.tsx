"use client";

import { useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import NavBar from "@/components/sections/nav-bar";
import AboutSection from "@/components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import SkillsSection from "@/components/sections/skills-section";
import StreamingSection from "@/components/sections/stream-section";
import ContactSection from "@/components/sections/contact-section";
import SliderView from "@/components/sections/slider-view";
import {
	AboutSectionType,
	ExperienceSection as ExperienceSectionType,
	HeroSectionType,
	SkillsSection as SkillsSectionType,
	ContactSectionType,
	StreamSectionType,
} from "@/lib/types";

type Props = {
	pageData: {
		skills: SkillsSectionType;
		experience: ExperienceSectionType;
		hero: HeroSectionType;
		about: AboutSectionType;
		contact: ContactSectionType;
		stream: StreamSectionType;
	};
};

const EXIT_DURATION = 0.5;

const paneVariants: Variants = {
	enter: {
		opacity: 1,
		transition: {
			duration: EXIT_DURATION,
			ease: "easeInOut",
			// wait for the exit animation
			delay: EXIT_DURATION,
		},
		display: "block",
	},
	exit: {
		opacity: 0,
		transition: {
			duration: EXIT_DURATION,
			ease: "easeInOut",
		},
		transitionEnd: {
			display: "none",
		},
	},
};

export default function Main({ pageData }: Props) {
	const [activePersona, setActivePersona] = useState<"primary" | "secondary">(
		"primary"
	);
	const sliderPositionRef = useRef(95);

	const handleSliderChange = (pos: number) => {
		setActivePersona(pos >= 50 ? "primary" : "secondary");
	};
	const handlePersonaChange = (p: "primary" | "secondary") => {
		setActivePersona(p);
		sliderPositionRef.current = p === "primary" ? 100 : 0;
	};

	return (
		<>
			<NavBar
				activePersona={activePersona}
				setActivePersona={handlePersonaChange}
			/>

			<main>
				<SliderView
					sliderPositionRef={sliderPositionRef}
					onSliderChange={handleSliderChange}
					heroData={pageData.hero}
				/>

				<div className="relative">
					{/* Primary Pane */}
					<motion.div
						variants={paneVariants}
						initial="exit"
						animate={activePersona === "primary" ? "enter" : "exit"}
						className="w-full"
					>
						<AboutSection aboutData={pageData.about} />
						<ExperienceSection experienceData={pageData.experience} />
						<SkillsSection skillsData={pageData.skills} />
					</motion.div>

					{/* Streaming Pane */}
					<motion.div
						variants={paneVariants}
						initial="exit"
						animate={activePersona === "secondary" ? "enter" : "exit"}
						className="w-full"
					>
						<StreamingSection streamData={pageData.stream} />
					</motion.div>
				</div>

				<ContactSection contactData={pageData.contact} />
			</main>
		</>
	);
}
