import {
	Avatar,
	Box,
	Button,
	Chip,
	Flex,
	Group,
	Modal,
	Table,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	Textarea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useState, useEffect } from "react";

interface Candidate {
	id: number;
	name: string;
	avatar: string;
	role?: string;
	experience: number;
	status: string;
	// Add other properties as needed
}

const dummyCandidates = [
	{
		id: 1,
		name: "John Doe",
		avatar: "https://example.com/avatar1.jpg",
		experience: 2,
		status: "Active",
	},
	{
		id: 2,
		name: "Jane Smith",
		avatar: "https://example.com/avatar2.jpg",
		experience: 5,
		status: "Applied",
	},
	{
		id: 3,
		name: "Michael Johnson",
		avatar: "https://example.com/avatar3.jpg",
		experience: 1,
		status: "Interviewing",
	},
	// Add more candidates as needed
];

export const CandidatesList = ({ jobId }: { jobId: number }) => {
	const [candidates, setCandidates] = useState<Candidate[]>(dummyCandidates);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	// Uncomment and modify the useEffect hook for actual API data fetching
	// useEffect(() => {
	//   const fetchCandidates = async () => {
	//     setIsLoading(true);
	//     setError(null);

	//     try {
	//       const response = await fetch(`/api/candidates/${jobId}`); // Replace with your actual API endpoint

	//       if (!response.ok) {
	//         throw new Error("Failed to fetch candidates");
	//       }

	//       const data = await response.json();
	//       setCandidates(data);
	//     } catch (error) {
	//       setError(error.message);
	//     } finally {
	//       setIsLoading(false);
	//     }
	//   };

	//   fetchCandidates();
	// }, [jobId]); // Re-run useEffect when jobId changes

	if (isLoading) {
		return <Text>Loading candidates...</Text>;
	}

	if (error) {
		return <Text>Error: {error}</Text>;
	}

	if (!candidates.length) {
		return <Text>No candidates found for this job.</Text>;
	}

	return (
		<Table highlightOnHover verticalSpacing={"md"}>
			<TableThead>
				<TableTr>
					{!isSmallScreen && <TableTh></TableTh>}
					<TableTh ta="center">Name</TableTh>
					{!isSmallScreen && <TableTh ta="center">Experience</TableTh>}
					<TableTh ta="center">Status</TableTh>
					<TableTh ta="center">Actions</TableTh>
				</TableTr>
			</TableThead>
			<TableTbody>
				{candidates.map((candidate) => (
					<CandidateRow key={candidate.id} user={candidate} />
				))}
			</TableTbody>
		</Table>
	);
};

export const CandidateRow = ({ user }: { user: Candidate }) => {
	const [opened, setOpened] = useState(false);
	const [message, setMessage] = useState("");
	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const handleMessageClick = () => {
		setOpened(true); // Open the modal when the button is clicked
	};
	console.log(user);

	const handleSendMessage = () => {
		// Logic to initiate the chat with the first message
		console.log("Send message:", message);
		setOpened(false); // Close the modal after sending the message
	};
	return (
		<>
			<TableTr>
				{!isSmallScreen && (
					<TableTd style={{ textAlign: "center" }}>
						<Avatar radius="sm" src={user.avatar} />
					</TableTd>
				)}
				<TableTd style={{ textAlign: "center" }}>{user.name}</TableTd>
				{!isSmallScreen && (
					<TableTd style={{ textAlign: "center" }}>
						{user.experience} years
					</TableTd>
				)}
				<TableTd style={{ textAlign: "center" }}>
					<Chip defaultChecked variant="light">
						{user.status}
					</Chip>
				</TableTd>
				<TableTd style={{ textAlign: "center" }}>
					<Button variant="outline" size="xs" onClick={handleMessageClick}>
						Message
					</Button>
				</TableTd>
			</TableTr>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				transitionProps={{
					transition: "fade",
					duration: 600,
					timingFunction: "linear",
				}}
				title={`Send your first message to ${user.name}`}
			>
				<Textarea
					placeholder="Type your message here..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Group justify="right" mt="md">
					<Button onClick={handleSendMessage}>Send Message</Button>
				</Group>
			</Modal>
		</>
	);
};
