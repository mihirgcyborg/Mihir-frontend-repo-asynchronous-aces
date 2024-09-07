import React from "react";
import { Flex } from "@mantine/core";

import { Card, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

interface CardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
	bgcolor: string;
}

const FeatureCard: React.FC<CardProps> = ({
	icon,
	title,
	description,
	bgcolor,
}) => {
	const isSmallScreen = useMediaQuery("(max-width: 768px)");

	return (
		<Card
			withBorder
			h={325}
			w={274}
			radius="md"
			p="md"
			style={{ backgroundColor: bgcolor }}
		>
			<Group p="apart" justify="center" mb={39} mt={39}>
				{icon}
			</Group>

			<Text ta={"center"} c={"white"} mb={39}>
				{title}
			</Text>
			<Text ta={"center"} size="sm" c="white" opacity={40}>
				{description}
			</Text>
		</Card>
	);
};

export default FeatureCard;
