import type { PortableTextReactComponents } from "@portabletext/react";

const accent = "from-blue-400 to-cyan-400";

const components: Partial<PortableTextReactComponents> = {
	marks: {
		link: ({
			value,
			children,
		}: {
			value?: { href: string };
			children: React.ReactNode;
		}) => (
			<a
				href={value?.href}
				target="_blank"
				rel="noopener noreferrer"
				className="text-cyan-400 underline hover:text-cyan-300"
			>
				{children}
			</a>
		),
	},

	block: {
		normal: ({ children }: { children?: React.ReactNode }) => (
			<p className="mb-5 leading-relaxed text-blue-100">{children}</p>
		),

		quote: ({ children }: { children?: React.ReactNode }) => (
			<blockquote className="my-8 text-center text-lg italic font-medium text-blue-200">
				<span
					className={`mx-auto mb-4 block h-1 w-24 rounded-full bg-gradient-to-r ${accent}`}
				/>
				“{children}”
			</blockquote>
		),
	},
};

export default components;
