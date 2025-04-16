import type { IconType } from "react-icons";

import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as SiIcons from "react-icons/si";
import type { IconPicker } from "@/lib/types";

const iconSets: Record<string, Record<string, IconType>> = {
	fa: FaIcons,
	fi: FiIcons,
	hi: HiIcons,
	si: SiIcons,
};

export const DynamicIcon = (icon?: IconPicker | null): IconType | null => {
	if (!icon || !icon.provider || !icon.name) return null;
	const provider = icon.provider.toLowerCase();
	const iconSet = iconSets[provider];
	if (!iconSet) return null;
	return iconSet[icon.name as keyof typeof iconSet] || null;
};
