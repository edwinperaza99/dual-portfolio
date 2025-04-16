import {
	getExperienceSection,
	getSkillsSection,
	getHeroSection,
} from "@/sanity/sanity";

import Footer from "@/components/ui/footer";
import Main from "@/components/sections/main";

export default async function Home() {
	// fetch info for all the sections
	const pageData = {
		skills: await getSkillsSection(),
		experience: await getExperienceSection(),
		hero: await getHeroSection(),
		// about: await getAboutSection(),
		// contact: await getContactSection(),
	};
	return (
		<div>
			<Main pageData={pageData} />
			<Footer />
		</div>
	);
}
