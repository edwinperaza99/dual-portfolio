import Link from "next/link";
import { DynamicIcon } from "@/lib/dynamic-icon";
import { getFooterData } from "@/sanity/sanity";
import { MotionDiv } from "@/lib/motion-utils";

export default async function Footer() {
	const footerData = await getFooterData();
	const { header, subheader, socialLinks = [] } = footerData;

	return (
		<footer className="relative z-10 border-t border-white/10 bg-gray-950/50 backdrop-blur-sm">
			<div className="container mx-auto py-6 px-4">
				<MotionDiv
					className="flex flex-col items-center gap-4"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					viewport={{ once: true }}
				>
					<div className="text-center">
						<div className="font-bold text-xl mb-2">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
								{header}
							</span>
						</div>
						{subheader && <p className="text-white/60 text-sm">{subheader}</p>}
					</div>

					{socialLinks.length > 0 && (
						<MotionDiv
							className="flex gap-6"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={{
								visible: {
									transition: {
										staggerChildren: 0.1,
									},
								},
							}}
						>
							{socialLinks.map((link, i) => {
								const Icon = DynamicIcon(link.icon);
								return Icon ? (
									<MotionDiv
										key={i}
										variants={{
											hidden: { opacity: 0, y: 10 },
											visible: { opacity: 1, y: 0 },
										}}
										transition={{ duration: 0.4, ease: "easeOut" }}
									>
										<Link
											href={link.link}
											target="_blank"
											rel="noopener noreferrer"
											className="text-white/60 hover:text-primary transition-colors"
											aria-label={link.displayName}
										>
											<Icon className="h-5 w-5" />
										</Link>
									</MotionDiv>
								) : null;
							})}
						</MotionDiv>
					)}
				</MotionDiv>
			</div>
		</footer>
	);
}
