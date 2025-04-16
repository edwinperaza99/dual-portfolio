interface SectionHeaderProps {
	badge?: string;
	title: string;
	gradient: string;
}

export function SectionHeader({ badge, title, gradient }: SectionHeaderProps) {
	return (
		<>
			{badge && (
				<div className="inline-block rounded-lg bg-blue-900/50 border border-blue-500/30 px-3 py-1 text-sm mb-4">
					{badge}
				</div>
			)}
			<h2
				className={`text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
			>
				{title}
			</h2>
		</>
	);
}
