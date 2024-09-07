"use client";

import {
	Box,
	Button,
	Container,
	Flex,
	Grid,
	GridCol,
	Group,
	Image,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconArrowRight, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./HeroSection.module.css";
import Cookies from "js-cookie";
import hrlottieImg from "../../../assests/HrLottieImage.json";
import LottieComponent from "./LottieComponent";
import { relative } from "path";
export function HeroSection() {
	const router = useRouter();
	const handleGetStarted = () => {
		const token = Cookies.get("token");

		if (token) {
			router.push("/dashboard");
		} else {
			router.push("/login");
		}
	};

	return (
		<Container pt="sm" size="lg">
			<div className={classes.inner}>
				<Title className={classes.subtitle}>
					Stop Wasting Time. Find Your Perfect Fit. Faster !!
				</Title>

				<Grid justify="space-between" mt={"10vh"}>
					<GridCol span={6}>
						<Stack gap={68}>
							<div>
								<Text className={classes.titleDesc}>
									Streamline Recruitment for Small to Medium Startups using
								</Text>
								<Text fw="normal" ta={"left"} size="36px">
									Recruit
									<Text
										component="span"
										fw="bolder"
										className={classes.subheading}
									>
										Next
									</Text>
								</Text>
							</div>
							<Text className={classes.description} mt={30}>
								Are you tired of sifting through endless resumes and struggling
								to find the right talent? You're not alone. At RecruitNext, we
								understand the challenges SMEs face in recruitment..
							</Text>
							<Group mt={40}>
								<Button
									size="lg"
									className={classes.control}
									onClick={handleGetStarted}
									rightSection={<IconArrowRight />}
								>
									Get started
								</Button>
								<Button
									variant="outline"
									size="lg"
									className={classes.control}
									onClick={() => {
										// window.open("https://github.com/jotyy/mantine-admin");
									}}
									rightSection={<IconStar />}
								>
									Give a Star
								</Button>
							</Group>
						</Stack>
					</GridCol>
					<GridCol span={6}>
						<LottieComponent animationData={hrlottieImg} />
					</GridCol>
				</Grid>
			</div>
			<SimpleGrid
				mt={60}
				cols={{ base: 1, sm: 2, lg: 2 }}
				spacing={{ base: "lg", md: "lg", lg: "xl" }}
			>
				<Image src="/Rectangle.svg" alt="Thumbs Up" />

				<Flex justify="center" align="center">
					<Text className={classes.titleDesc}>
						Everything In A Single
						<br /> Platform,
						<br /> Our One-Stop{" "}
						<Text
							component="span"
							fw={"bolder"}
							opacity={"100%"}
							size="36px"
							className={classes.subheading}
						>
							Solution
						</Text>
						<br />
						Delivers!
					</Text>
				</Flex>
			</SimpleGrid>
		</Container>
	);
}
