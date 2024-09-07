"use client";

import { loginUser } from "@/api/auth";
import { login } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/store";
import {
	Anchor,
	Button,
	Card,
	Checkbox,
	Group,
	PasswordInput,
	TextInput,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookie } from "react-use";

export function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [cookie, setCookie] = useCookie("userToken");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSignIn = async () => {
		setLoading(true);
		try {
			const data = await loginUser(email, password);
			const { token } = data;
			dispatch(login(token));
			const options = rememberMe
				? { path: "/", maxAge: 30 * 24 * 60 * 60 }
				: { path: "/", maxAge: 3600 };

			setCookie(token, options);
			router.push("/dashboard");
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message || "Login failed. Please check your credentials.");
			} else {
				alert("An unexpected error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};
	return (
		<Card withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Email"
				placeholder="test@example.com"
				required
				value={email}
				onChange={(event) => setEmail(event.currentTarget.value)}
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				required
				mt="md"
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
			/>
			<Group mt="md" justify="space-between">
				<Checkbox
					label="Remember me"
					checked={rememberMe}
					onChange={(event) => setRememberMe(event.currentTarget.checked)}
				/>
				<Anchor size="sm" href="#">
					Forgot Password?
				</Anchor>
			</Group>
			<Button fullWidth mt="xl" onClick={handleSignIn} loading={loading}>
				Sign In
			</Button>
		</Card>
	);
}
