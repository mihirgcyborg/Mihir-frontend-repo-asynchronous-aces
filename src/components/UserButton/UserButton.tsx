import {
	Avatar,
	Flex,
	Text,
	UnstyledButton,
	type UnstyledButtonProps,
} from "@mantine/core";
import classes from "./UserButton.module.css";
import { useRouter } from "next/navigation";

interface UserButtonProps extends UnstyledButtonProps {
	image: string;
	name: string;
	email: string;
}

export function UserButton({ image, name, email }: UserButtonProps) {
	const router = useRouter();
	return (
		<UnstyledButton
			className={classes.user}
			onClick={() => router.replace("/profile")}
		>
			<Flex direction="row" gap={8}>
				<Avatar src={image} radius="xl" />

				<div style={{ flex: 1 }}>
					<Text size="sm" w={500} c={"white"}>
						{name}
					</Text>

					<Text c="dimmed" size="xs">
						{email}
					</Text>
				</div>
			</Flex>
		</UnstyledButton>
	);
}
