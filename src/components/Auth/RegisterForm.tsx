"use client";

import { signUpUser } from "@/api/auth";
import {
	Button,
	Paper,
	PasswordInput,
	Space,
	Switch,
	TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { updateEmail } from "@/redux/features/userProfile/userProfileSlice";
import { setCurrentUser, setLoading } from "@/redux/features/authSlice";
import { user } from "@/types/type";
import { setCandidate, setRecruiter } from "@/redux/features/toggle/toogle";

export function RegisterForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [role, setRole] = useState<"recruiter" | "candidate">("candidate");
	const router = useRouter();
	const dispatch = useAppDispatch();

	const handleSubmit = async () => {
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}
		dispatch(setLoading(true));
		try {
			// Sign up user
			const userData = await signUpUser(email, password, role);
			dispatch(setCurrentUser(userData as user));
			userData.role === "recruiter"
				? dispatch(setRecruiter())
				: dispatch(setCandidate());

			// const options = rememberMe
			// 	? { path: "/", maxAge: 30 * 24 * 60 * 60 }
			// 	: { path: "/", maxAge: 3600 };

			// Store user data

			sessionStorage.setItem("userEmail", email);
			sessionStorage.setItem("userUid", userData.uid);
			sessionStorage.setItem("userRole", userData.role);

			router.push("/profile");
		} catch (error) {
			alert("Error during signup.");
		}
	};

	return (
		<Paper withBorder shadow="md" p={30} mt={30} radius="md">
			<TextInput
				label="Email"
				placeholder="test@example.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<PasswordInput
				label="Password"
				placeholder="Your password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				mt="md"
			/>
			<PasswordInput
				label="Re-enter Password"
				placeholder="Re-enter your password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
				mt="md"
			/>
			<Switch
				label="I want to hire"
				checked={role === "recruiter"}
				onChange={(e) =>
					setRole(e.currentTarget.checked ? "recruiter" : "candidate")
				}
				mt="md"
			/>
			<Space h="md" />
			<Button fullWidth mt="xl" onClick={handleSubmit}>
				Sign Up
			</Button>
		</Paper>
	);
}
