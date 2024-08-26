"use client";

import { ActionIcon, Box, Drawer, Stack, TextInput } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconSearch, IconSettings } from "@tabler/icons-react";
import classes from "./AdminHeader.module.css";
import { DirectionSwitcher } from "../DirectionSwitcher/DirectionSwitcher";
import { Logo } from "../Logo/Logo";
import { ThemeSwitcher } from "../ThemeSwitcher/ThemeSwitcher";

interface Props {
	burger?: React.ReactNode;
}

export function AdminHeader({ burger }: Props) {
	const [opened, { close, open }] = useDisclosure(false);
	const isSmallScreen = useMediaQuery("(max-width: 768px)");

	return (
		<header className={classes.header}>
			<div className={classes.headerSection}>
				{burger && burger}
				{isSmallScreen && <Logo />}
				<Box style={{ flex: 1 }} />
				<TextInput
					placeholder="Search"
					variant="filled"
					leftSection={<IconSearch size="0.8rem" />}
				/>
			</div>

			<div className={classes.headerSection}>
				<ActionIcon onClick={open} variant="subtle">
					<IconSettings size="1.25rem" />
				</ActionIcon>

				<Drawer
					opened={opened}
					onClose={close}
					title="Settings"
					position="right"
					transitionProps={{ duration: 0 }}
				>
					<Stack gap="lg">
						<ThemeSwitcher />
						<DirectionSwitcher />
					</Stack>
				</Drawer>
			</div>
		</header>
	);
}
