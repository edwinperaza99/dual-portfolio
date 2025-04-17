import {
	getExperienceSection,
	getSkillsSection,
	getHeroSection,
	getAboutSection,
	getContactSection,
} from "@/sanity/sanity";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/sections/footer";
import Main from "@/components/sections/main";

export default async function Home() {
	// fetch info for all the sections
	const pageData = {
		skills: await getSkillsSection(),
		experience: await getExperienceSection(),
		hero: await getHeroSection(),
		about: await getAboutSection(),
		contact: await getContactSection(),
	};
	return (
		<div>
			<Toaster position="bottom-center" />
			<Main pageData={pageData} />
			<Footer />
		</div>
	);
}
