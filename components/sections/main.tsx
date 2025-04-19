"use client";

import { useState, useRef, useLayoutEffect } from "react";
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
	NavBarType,
} from "@/lib/types";

type Props = {
	pageData: {
		skills: SkillsSectionType;
		experience: ExperienceSectionType;
		hero: HeroSectionType;
		about: AboutSectionType;
		contact: ContactSectionType;
		stream: StreamSectionType;
		navBar: NavBarType;
	};
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
	// refs to measure each pane
	const primaryRef = useRef<HTMLDivElement>(null);
	const secondaryRef = useRef<HTMLDivElement>(null);

	// wrapper height state
	const [wrapperHeight, setWrapperHeight] = useState<number>(0);

	// when activePersona (or content) changes, measure the currently active pane
	useLayoutEffect(() => {
		const el =
			activePersona === "primary" ? primaryRef.current : secondaryRef.current;
		if (el) {
			setWrapperHeight(el.offsetHeight);
		}
	}, [activePersona, pageData]); // also if your sections’ data changes

	const paneVariants: Variants = {
		enter: {
			opacity: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
		exit: {
			opacity: 0,
			transition: { duration: 1, ease: "easeIn" },
		},
	};

	return (
		<>
			<NavBar
				activePersona={activePersona}
				setActivePersona={handlePersonaChange}
				navBarData={pageData.navBar}
			/>

			<main>
				<SliderView
					sliderPositionRef={sliderPositionRef}
					onSliderChange={handleSliderChange}
					heroData={pageData.hero}
				/>

				{/* height-locked container */}
				<div
					style={{
						height: wrapperHeight,
						overflow: "hidden",
						transition: "height 0.5s ease-in-out",
					}}
				>
					{/* primary pane */}
					<motion.div
						ref={primaryRef}
						variants={paneVariants}
						initial="exit"
						animate={activePersona === "primary" ? "enter" : "exit"}
						style={{
							display: activePersona === "primary" ? "block" : "none",
						}}
						className="bg-indigo-950 bg-[url('/triangles.png')]"
					>
						<AboutSection aboutData={pageData.about} />
						<ExperienceSection experienceData={pageData.experience} />
						<SkillsSection skillsData={pageData.skills} />
					</motion.div>

					{/* streaming pane */}
					<motion.div
						ref={secondaryRef}
						variants={paneVariants}
						initial="exit"
						animate={activePersona === "secondary" ? "enter" : "exit"}
						style={{
							display: activePersona === "secondary" ? "block" : "none",
						}}
						className="bg-purple-950 bg-[url('/tasky.png')]"
					>
						<StreamingSection streamData={pageData.stream} />
					</motion.div>
				</div>

				<ContactSection contactData={pageData.contact} />
			</main>
		</>
	);
}
