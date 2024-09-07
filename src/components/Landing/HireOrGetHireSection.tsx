import React from "react";
import JobCard from "./JobCard";
import { Flex, SimpleGrid } from "@mantine/core";

export const cardData = [
	{
		title: "Find Your Next Dream Job",
		img: "/dreamJob.jpg",
		description:
			"Tired of endless job hunting? RecruitNext makes finding your perfect job easy. Search thousands of open positions,  and get matched with opportunities that fit your skills.",
		searchButtonDes: "Search Jobs Now.",
	},
	{
		title: "Hire Top Talent Faster",
		img: "/employee.jpg",
		description:
			"Struggling to fill open positions? RecruiitNext helps you attract, hire, and onboard top talent efficiently. Streamline your hiring process, save time, and reduce costs.",
		searchButtonDes: "Try It Free",
	},
];

export const HireOrGetHireSection = () => {
	const jobsCards = cardData.map((card, idx) => (
		<JobCard
			key={idx}
			// title={card.title}
			// description={card.description}
			// img={card.img}
			// searchButtonDes={card.searchButtonDes}
			{...card}
		/>
	));
	return (
		<Flex justify={"center"} mt={100}>
			<SimpleGrid
				mt={60}
				cols={{ base: 1, sm: 2, lg: 2 }}
				spacing={{ base: "lg", md: "lg", lg: "lg" }}
			>
				{jobsCards}
			</SimpleGrid>
		</Flex>
	);
};
