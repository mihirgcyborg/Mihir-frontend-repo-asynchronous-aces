"use client";
import { Button, Card, Group, Image, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookie } from "react-use";

interface JobCardProps {
	title: string;
	img: string;
	description: string;
	searchButtonDes: string;
}
const JobCard: React.FC<JobCardProps> = ({
	title,
	img,
	description,
	searchButtonDes,
}) => {
	const router = useRouter();

	const handleLoginClick = () => {
		router.push("/dashboard");
	};
	return (
		<Card
			withBorder
			h={{ base: 450, sm: 483, lg: 483 }}
			w={{ base: 350, sm: 446, lg: 446 }}
			radius="md"
			p="md"
		>
			<Group justify="center">
				<Text ta={"center"} fw={500} mb={{ base: 10, sm: 39, lg: 39 }}>
					{title}
				</Text>
				<Group p="apart" justify="center" mb={{ base: 10, sm: 39, lg: 39 }}>
					<Image src={img} alt={title} width={283} height={174} />
				</Group>
				<Text size="sm" opacity={40}>
					{description}
				</Text>
				<Button
					w={201}
					c={"white"}
					fw={700}
					bg={"#071126"}
					fullWidth
					variant="filled"
					color="blue"
					onClick={handleLoginClick}
				>
					{searchButtonDes}
				</Button>
			</Group>
		</Card>
	);
};

export default JobCard;
