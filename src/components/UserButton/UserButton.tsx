import {
	Avatar,
	Flex,
	Grid,
	GridCol,
	Text,
	UnstyledButton,
	type UnstyledButtonProps,
} from "@mantine/core";
import classes from "./UserButton.module.css";
import { useRouter } from "next/navigation";
import { IconLogout } from "@tabler/icons-react";
import { logoutUser } from "@/api/auth";

interface UserButtonProps extends UnstyledButtonProps {
	image: string;
	name: string;
	email: string;
}

export function UserButton({ image, name, email }: UserButtonProps) {
	const router = useRouter();
	const handleLogout = async () => {
		const logoutSuccessful = await logoutUser();
		if (logoutSuccessful) {
			router.replace("/login"); // Redirect to login page after successful logout
		} else {
			// Handle logout failure (e.g., show an error message)
			console.error("Logout failed");
		}
	};
	return (
		<Grid>
			<GridCol span={8}>
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
			</GridCol>
			<GridCol span={4}>
				<Flex justify={"center"} mt={"10%"}>
					<UnstyledButton onClick={handleLogout}>
						<IconLogout size={43} color="white" />
					</UnstyledButton>
				</Flex>
			</GridCol>
		</Grid>
	);
}
