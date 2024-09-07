"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
	fontFamily: "Space Grotesk, sans-serif",
	headings: {
		fontFamily: "Space Grotesk, sans-serif",
	},
	colors: {
		emerald: [
			"#f0fdf5",
			"#dcfce8",
			"#bbf7d1",
			"#86efad",
			"#4ade80",
			"#22c55e",
			"#16a34a",
			"#15803c",
			"#166533",
			"#14532b",
			"#052e14",
		],
		yellow: [
			"#FFF9DB", 
			"#FFF2B3",
			"#FFEB8A",
			"#FFE562",
			"#FFDE3A",
			"#F3DD15", 
			"#E2C514",
			"#D1AE13",
			"#BF9811",
			"#AD830F",
			"#99700D", 
		],
		navy: [
			"#E8EBF0", // Lightest shade
			"#C0C7D1",
			"#99A3B3",
			"#717F95",
			"#4A5B77",
			"#243759",
			"#071126", // Your secondary color
			"#060F20",
			"#050D1A",
			"#040B14",
			"#03080E", // Darkest shade
		],
	},
	primaryColor: "yellow",  
	defaultRadius: "md",
});
