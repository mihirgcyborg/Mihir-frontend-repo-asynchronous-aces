"use client";

import { completeUserProfile } from "@/api/auth";
import {
	ActionIcon,
	Avatar,
	Button,
	FileInput,
	Grid,
	Group,
	Paper,
	Switch,
	Text,
	TextInput,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";

export function ProfileContent() {
	const [editMode, setEditMode] = useState(false);

	const [firstName, setFirstName] = useState<string>("John");
	const [lastName, setLastName] = useState<string>("Doe");
	const [phone, setPhone] = useState<string>("123-456-7890");

	const [calendlyUserName, setCalendlyUserName] = useState<string>("john-doe");
	const [avatar, setAvatar] = useState<File | null>(null);
	const [department, setDepartment] = useState<string>("Engineering");
	const [jobTitle, setJobTitle] = useState<string>("Senior Developer");
	const [experience, setExperience] = useState<number>(5);

	const handleCompleteProfile = async () => {
		try {
			const profileData = {
				firstName,
				lastName,
				phone,

				calendlyUserName,
				avatar,
				department,
				jobTitle,
				experience,
			};
			await completeUserProfile(profileData);
			alert("Profile updated successfully!");
		} catch (error) {
			alert("Error updating profile");
		}
	};
	const handleCancelEdit = () => {
		setEditMode(false);
		// Reset fields if needed
	};

	return (
		<Paper
			withBorder
			shadow="md"
			p={30}
			mt={30}
			radius="md"
			style={{
				maxWidth: "600px",
				width: "100%",
				margin: "0 auto",
			}}
		>
			<Group justify="center" mb="md">
				<div style={{ position: "relative", width: "fit-content" }}>
					<Avatar
						src={avatar ? URL.createObjectURL(avatar) : undefined}
						size={120}
						radius="50%"
						style={{ border: "2px solid #ccc", cursor: "pointer" }}
					/>
					{editMode && (
						<div
							style={{
								position: "absolute",
								bottom: 0,
								right: 0,
								transform: "translate(50%, 50%)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
								borderRadius: "50%",
								padding: "5px",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<ActionIcon
								size="lg"
								onClick={() => {
									if (typeof window !== "undefined") {
										document.getElementById("file-input")?.click();
									}
								}}
							>
								<IconPencil size={18} />
							</ActionIcon>
						</div>
					)}
					<FileInput
						id="file-input"
						style={{ display: "none" }}
						onChange={setAvatar}
					/>
				</div>
			</Group>

			{!editMode ? (
				<>
					<Grid>
						<Grid.Col span={6}>
							<Text fw={500}>First Name:</Text>
							<Text>{firstName}</Text>
						</Grid.Col>
						<Grid.Col span={6}>
							<Text fw={500}>Last Name:</Text>
							<Text>{lastName}</Text>
						</Grid.Col>
						<Grid.Col span={6}>
							<Text fw={500}>Phone:</Text>
							<Text>{phone}</Text>
						</Grid.Col>
						{/* <Grid.Col span={6}>
						<Text fw={500}>Role:</Text>
						<Text>{role === "recruiter" ? "Recruiter" : "Candidate"}</Text>
					</Grid.Col> */}
						<Grid.Col span={6}>
							<Text fw={500}>Calendly User:</Text>
							<Text>{calendlyUserName}</Text>
						</Grid.Col>
						<Grid.Col span={6}>
							<Text fw={500}>Department:</Text>
							<Text>{department}</Text>
						</Grid.Col>
						<Grid.Col span={6}>
							<Text fw={500}>Job Title:</Text>
							<Text>{jobTitle}</Text>
						</Grid.Col>
						<Grid.Col span={6}>
							<Text fw={500}>Experience:</Text>
							<Text>{experience} years +</Text>
						</Grid.Col>
						<Button fullWidth mt="xl" onClick={() => setEditMode(true)}>
							Edit Profile
						</Button>
					</Grid>
				</>
			) : (
				<>
					<TextInput
						label="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
					<TextInput
						label="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						mt="md"
					/>
					<TextInput
						label="Phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						mt="md"
					/>
					{/* <Switch
						label="I want to hire"
						checked={role === "recruiter"}
						onChange={(e) =>
							setRole(e.currentTarget.checked ? "recruiter" : "candidate")
						}
						mt="md"
					/> */}
					<TextInput
						label="Calendly User Name"
						value={calendlyUserName}
						onChange={(e) => setCalendlyUserName(e.target.value)}
						mt="md"
					/>
					<TextInput
						label="Current Department"
						value={department}
						onChange={(e) => setDepartment(e.target.value)}
						mt="md"
					/>
					<TextInput
						label="Current Job Title"
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
						mt="md"
					/>
					<TextInput
						label="Experience"
						value={experience}
						onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
						mt="md"
					/>
					<Group justify="space-around" mt="xl">
						<Button variant="outline" onClick={handleCancelEdit}>
							Cancel
						</Button>
						<Button onClick={handleCompleteProfile}>Save Changes</Button>
					</Group>
				</>
			)}
		</Paper>
	);
}
