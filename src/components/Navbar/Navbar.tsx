"use client";

import { Box, Flex, ScrollArea, Switch } from "@mantine/core";
import { UserButton } from "@/components/UserButton/UserButton";
import type { NavItem } from "@/types/nav-item";
import { NavLinksGroup } from "./NavLinksGroup";
import classes from "./Navbar.module.css";
import { Logo } from "../Logo/Logo";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toggleBetweenRecruiterAndCandidate } from "@/redux/features/toggle/toogle";

interface Props {
	data: NavItem[];
	hidden?: boolean;
}

export function Navbar({ data }: Props) {
	const [selected, setSelected] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	// Access userProfile from Redux store
	const userProfile = useAppSelector((state) => state.userProfile);
	const isRecruiter = useAppSelector((state) => state.toggle.isRecruiter); // Get the current role
	const dispatch = useAppDispatch();

	// Set default avatar, name, and email
	const avatar = userProfile?.avatar
		? URL.createObjectURL(userProfile.avatar)
		: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80";
	const name =
		userProfile?.firstName && userProfile?.lastName
			? `${userProfile.firstName} ${userProfile.lastName}`
			: "Complete your profile";
	useEffect(() => {
		if (typeof window !== "undefined") {
			// Access localStorage and sessionStorage only on the client-side
			const storedEmail = userProfile?.email
				? userProfile.email
				: sessionStorage.getItem("userEmail") ||
					localStorage.getItem("userEmail");
			setEmail(storedEmail);
		}
	}, [userProfile?.email]);
	// useEffect(() => {
	// 	const savedSelection = localStorage.getItem("selectedNavLink");
	// 	setSelected(savedSelection || "Dashboard");
	// }, []);
	const handleLinkClick = (label: string) => {
		setSelected(label);
		localStorage.setItem("selectedNavLink", label);
	};
	const handleToggle = () => {
		dispatch(toggleBetweenRecruiterAndCandidate());
	};
	const links = data.map((item) => (
		<NavLinksGroup
			key={item.label}
			{...item}
			isSelected={selected === item.label}
			linkClicked={handleLinkClick}
		/>
	));

	return (
		<>
			<Box p="md">
				<Logo variant="light" size="2.5rem" />
			</Box>
			<ScrollArea className={classes.links}>
				<div className={classes.linksInner}>{links}</div>
				<Flex justify="center" align="center" mt="md">
					<Switch
						checked={isRecruiter}
						onChange={handleToggle}
						label={isRecruiter ? "Recruiter Mode" : "Candidate Mode"}
					/>
				</Flex>
			</ScrollArea>

			<div className={classes.footer}>
				<UserButton image={avatar} name={name} email={email ? email : ""} />
			</div>
		</>
	);
}
