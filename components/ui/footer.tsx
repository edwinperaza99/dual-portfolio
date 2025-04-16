import Link from "next/link";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { getFooterData } from "@/sanity/sanity";

export default async function Footer() {
	const footerData = await getFooterData();
	const { header, subheader, socialLinks = [] } = footerData;

	return (
		<footer className="relative z-10 border-t border-white/10 bg-gray-950/50 backdrop-blur-sm">
			<div className="container mx-auto py-6 px-4">
				<div className="flex flex-col items-center gap-4">
					<div className="text-center">
						<div className="font-bold text-xl mb-2">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
								{header}
							</span>
						</div>
						{subheader && <p className="text-white/60 text-sm">{subheader}</p>}
					</div>

					{socialLinks && socialLinks.length > 0 && (
						<div className="flex gap-6">
							{socialLinks.map((link, i) => {
								const Icon = DynamicIcon(link.icon);
								return Icon ? (
									<Link
										key={i}
										href={link.link}
										className="text-white/60 hover:text-primary transition-colors"
										aria-label={link.displayName}
									>
										<Icon className="h-5 w-5" />
									</Link>
								) : null;
							})}
						</div>
					)}
				</div>
			</div>
		</footer>
	);
}
