"use client";
import {
	Anchor,
	Box,
	Flex,
	Grid,
	GridCol,
	Text,
	Title,
	useMantineColorScheme,
} from "@mantine/core";
import classes from "./layout.module.css";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo/Logo";
import { RightSectionWallpaper } from "@/components/Auth/RightSectionWallpaper";
import { useMediaQuery } from "@mantine/hooks";

interface Props {
	children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
	const pathname = usePathname();
	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const title = pathname === "/login" ? "Login to " : "Welcome to ";
	const { colorScheme } = useMantineColorScheme();
	return (
		<Grid>
			<GridCol span={{ sm: 12, lg: 5 }}>
				<Box className={classes.wrapper}>
					<Title order={1} fw="bolder">
						<Flex gap={10}>
							{title}
							<Logo
								variant={colorScheme === "dark" ? "light" : "dark"}
								size="40px"
							/>
						</Flex>
					</Title>
					<Text c="dimmed" size="sm" mt={5}>
						{pathname === "/login" ? (
							<>
								Don&apos;t have an account?{" "}
								<Anchor size="sm" href="/register">
									Sign Up
								</Anchor>
							</>
						) : (
							<>
								Already have an account?{" "}
								<Anchor size="sm" href="/login">
									Sign In
								</Anchor>
							</>
						)}
					</Text>
					<Box w={400}>{children}</Box>
				</Box>
			</GridCol>
			{!isSmallScreen && (
				<GridCol span={7}>
					<RightSectionWallpaper />
				</GridCol>
			)}
		</Grid>
	);
}
