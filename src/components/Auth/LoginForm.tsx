"use client";

import { loginUser } from "@/api/auth";
import {
	setCurrentUser,
	setError,
	setLoading,
} from "@/redux/features/authSlice";
import { setCandidate, setRecruiter } from "@/redux/features/toggle/toogle";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { user } from "@/types/type";
import {
	Anchor,
	Button,
	Card,
	Checkbox,
	Group,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookie } from "react-use";

export function LoginForm() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [cookie, setCookie] = useCookie("userUid");
	const [email, setEmail] = useState("Test1234@gmail.com");
	const [password, setPassword] = useState("Test@1234");
	const [rememberMe, setRememberMe] = useState(false);
	const error = useAppSelector((state) => state.auth.error);
	const loading = useAppSelector((state) => state.auth.isLoading);

	const handleSignIn = async () => {
		dispatch(setLoading(true));
		try {
			const userData = await loginUser(email, password);
			dispatch(setCurrentUser(userData as user));
			userData.role === "recruiter"
				? dispatch(setRecruiter())
				: dispatch(setCandidate());

			// const options = rememberMe
			// 	? { path: "/", maxAge: 30 * 24 * 60 * 60 }
			// 	: { path: "/", maxAge: 3600 };

			// Store user data
			if (rememberMe) {
				localStorage.setItem("userEmail", email);
				localStorage.setItem("userUid", userData.uid);
				localStorage.setItem("userRole", userData.role);
			} else {
				sessionStorage.setItem("userEmail", email);
				sessionStorage.setItem("userUid", userData.uid);
				sessionStorage.setItem("userRole", userData.role);
			}
			router.push("/dashboard");
		} catch (error) {
			if (error instanceof FirebaseError) {
				dispatch(setError(error.message)); // Convert FirebaseError to string message
			} else {
				dispatch(setError("An unexpected error occurred."));
			}
		} finally {
			dispatch(setLoading(false));
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
				{error && <Text size="sm">{error}</Text>}
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
