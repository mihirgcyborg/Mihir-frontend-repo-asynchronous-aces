"use client";

import {
	Container,
	Flex,
	Paper,
	SimpleGrid,
	Space,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import {
	IconBrandMantine,
	IconBrandNextjs,
	IconBrandOauth,
	IconBrandPlanetscale,
	IconBrandReact,
} from "@tabler/icons-react";
import classes from "./FeatureSection.module.css";
import { MdAccessTime, MdRocket } from "react-icons/md";
import { RiCashLine, RiUser3Line } from "react-icons/ri";
import FeatureCardList from "./FeatureCard";
import FeatureCard from "./FeatureCard";

export const cardData = [
	{
		icon: <MdAccessTime size={70} color="white" />,
		title: "Reduce Time-to-Hire by 25%",
		description:
			"Our intuitive platform simplifies the process, freeing up your time to focus on what matters most.",
		bgcolor: "#E96592",
	},
	{
		icon: <MdRocket size={70} color="white" />,
		title: "Boost Recruiter Productivity",
		description:
			"Manage more postings and candidates with powerful search filters and communication tools.",
		bgcolor: "#AD9CFC",
	},
	{
		icon: <RiCashLine size={70} color="white" />,
		title: "Cost-Effective Recruitment",
		description:
			"Offer a seamless application process that keeps candidates engaged and informed.",
		bgcolor: "#7BD5EE",
	},
	{
		icon: <RiUser3Line size={70} color="white" />,
		title: "Enhanced Candidate Experience",
		description:
			"Eliminate unnecessary expenses with automated workflows and efficient candidate management.",
		bgcolor: "#E9B06F",
	},
];

interface FeatureProps {
	icon: React.FC<any>;
	title: React.ReactNode;
	description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
	return (
		<Paper h="100%" shadow="md" px="lg" py="sm" radius="md" withBorder>
			<ThemeIcon variant="light" size={60} radius={60}>
				<Icon size="2rem" stroke={1.5} />
			</ThemeIcon>
			<Text mt="sm" mb={7} fw="600">
				{title}
			</Text>
			<Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
				{description}
			</Text>
		</Paper>
	);
}

interface FeaturesGridProps {
	title: React.ReactNode;
	description: React.ReactNode;
	data?: FeatureProps[];
}

export function FeaturesSection({ title, description }: FeaturesGridProps) {
	const features = cardData.map((card, idx) => (
		<FeatureCard key={idx} {...card} />
	));

	return (
		<Container className={classes.wrapper}>
			<Title className={classes.title}>{title}</Title>
			<Space h="md" />

			<Container size={560} p={0}>
				<Text size="sm" className={classes.description}>
					{description}
				</Text>
			</Container>

			{/* <Flex justify={"center"} gap={200} mt={100} mb={100}>
				<JobCard
              title="Find Your Next Dream Job"
              img="/dreamJob.jpg"
              description="Tired of endless job hunting? RecruitNext makes finding your perfect job easy. Search thousands of open positions, upload your resume, and get matched with opportunities that fit your skills."
              searchButtonDes="Search Jobs Now."
            />
            <JobCard
              title="Hire Top Talent Faster"
              img="/employee.jpg"
              description="Struggling to fill open positions? RecruiitNext helps you attract, hire, and onboard top talent efficiently. Streamline your hiring process, save time, and reduce costs."
              searchButtonDes="Try It Free"
            />
			</Flex> */}
			<SimpleGrid
				mt={60}
				cols={{ base: 1, sm: 2, lg: 2 }}
				spacing={{ base: "lg", md: "lg", lg: "lg" }}
			>
				{features}
			</SimpleGrid>
		</Container>
	);
}
