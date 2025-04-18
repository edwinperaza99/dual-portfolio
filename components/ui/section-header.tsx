interface SectionHeaderProps {
	badge?: string;
	title: string;
	gradient?: "primary" | "secondary";
}

export function SectionHeader({
	badge,
	title,
	gradient = "primary",
}: SectionHeaderProps) {
	const styles = {
		primary: {
			heading: "from-blue-300 to-cyan-400",
			badge: "bg-blue-900/50 border-blue-500/30",
		},
		secondary: {
			heading: "from-pink-400 to-purple-400",
			badge: "bg-purple-900/50 border-pink-500/30",
		},
	}[gradient];

	return (
		<>
			{badge && (
				<div
					className={`inline-block rounded-lg px-3 py-1 text-sm mb-4 border ${styles.badge}`}
				>
					{badge}
				</div>
			)}
			<h2
				className={`text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${styles.heading}`}
			>
				{title}
			</h2>
		</>
	);
}
