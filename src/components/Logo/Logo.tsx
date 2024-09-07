import {
	Flex,
	MantineSize,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import classes from "./Logo.module.css";

interface Props {
	size?: MantineSize | string; // This should be either a MantineSize or a string
	variant?: "light" | "dark";
}

export const Logo: React.FC<Props> = ({ size = "xl", variant }) => {
	return (
		<Flex direction="row" align="center" gap={4}>
			<Link
				href="/"
				style={{ textDecoration: "none" }}
				className={classes.heading}
			>
				<Text
					fw="normal"
					size={size}
					c={variant === "light" ? "white" : "black"}
				>
					Recruit
					<Text
						component="span"
						size={size}
						fw="bold"
						className={classes.subheading}
					>
						Next
					</Text>
				</Text>
			</Link>
		</Flex>
	);
};
