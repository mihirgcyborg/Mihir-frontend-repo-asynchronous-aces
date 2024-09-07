import { theme } from "@/styles/theme";
import {
	Box,
	Image,
	Stack,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import React from "react";

const RightSectionWallpaper = () => {
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	// const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const bg = colorScheme === "dark" ? theme.colors.gray[9] : "#0F1829";

	return (
		<Box
			style={{
				backgroundColor: bg,
				position: "relative",
				height: "100%",
				width: "100%",
			}}
		>
			<Image
				src="/3dGirlStanding.svg"
				alt="3D girl standing"
				pos="absolute"
				bottom={"5vh"}
				height={"42%"}
				right={"19%"}
				w={"auto"}
			/>
			<Image
				src="/3dKey.svg"
				alt="3D key"
				pos="absolute"
				height={"25%"}
				w={"auto"}
				top={"20%"}
				right={"7%"}
			/>
			<Image
				src="/3dlock.svg"
				alt="3D lock"
				pos="absolute"
				top={"30%"}
				left={"15%"}
				height={"20%"}
				w={"auto"}
			/>
			<Image
				src="/3dStar.svg"
				alt="3D star"
				pos="absolute"
				height={"17%"}
				w={"auto"}
				top={"10%"}
				right={"21%"}
			/>
			<Image
				src="/3dStar.svg"
				alt="3D star"
				pos="absolute"
				height={"17%"}
				w={"auto"}
				left={"8%"}
				bottom={"30%"}
			/>
			<Image
				src="/3dStar.svg"
				alt="3D star"
				pos="absolute"
				height={"17%"}
				w={"auto"}
				top={"40%"}
				right={"8%"}
			/>
			<Image
				src="/3dStar.svg"
				alt="3D star"
				pos="absolute"
				height={"17%"}
				w={"auto"}
				top={"5%"}
				left={"8%"}
			/>
		</Box>
	);
};

export default RightSectionWallpaper;
