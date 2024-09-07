"use client";

import {
	AppShell,
	Box,
	Burger,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { AdminHeader } from "@/components/Headers/AdminHeader";
import { Navbar } from "@/components/Navbar/Navbar";
import { navLinks } from "@/config";
import AsideComponent from "@/components/Aside/AsideComponent";

interface Props {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
	const [opened, { toggle }] = useDisclosure();
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const bg =
		colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			aside={{
				width: 250,
				breakpoint: "sm",
				collapsed: { mobile: true },
				// Adjust top position based on header height
			}}
			padding="md"
			transitionDuration={500}
			transitionTimingFunction="ease"
		>
			<AppShell.Navbar
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					height: "100vh",
					backgroundColor:
						colorScheme === "dark"
							? theme.colors.dark[7]
							: theme.colors.navy[6],
					width: opened && !isSmallScreen ? 0 : 300,
				}}
				// hidden={isSmallScreen && !opened}
			>
				<Navbar data={navLinks} hidden={!opened} />
			</AppShell.Navbar>
			<AppShell.Header
				style={{ position: "absolute", left: isSmallScreen ? 0 : 300 }}
			>
				<AdminHeader
					burger={
						<Burger
							opened={opened}
							onClick={toggle}
							hiddenFrom="sm"
							size="sm"
							mr="xl"
						/>
					}
				/>
			</AppShell.Header>

			{/* <AppShell.Aside pos={"absolute"} w={{ sm: 60, md: 80, lg: 80 }} p={20}>
				<AsideComponent />
			</AppShell.Aside> */}
			<AppShell.Main
				style={{
					width: "100%", // Make Main take full width
					maxWidth: "100%",
					marginTop: "50px",
					// marginLeft: isSmallScreen ? 0 : opened ? 0 : 300,
					padding: isSmallScreen ? "20px" : "20px 20px 20px 320px", // Adjust padding
					overflowX: "hidden", // Prevent horizontal overflow
					backgroundColor: bg,
				}}
				bg={bg}
			>
				{children}
			</AppShell.Main>
			<AppShell.Footer
				style={{
					position: "fixed",
					bottom: 0,
					left: 0,
					width: "100%",
				}}
			>
				<Text w="full" size="sm" c="gray">
					CopyRight © Asynchronous Aces
				</Text>
			</AppShell.Footer>
		</AppShell>
	);
}
