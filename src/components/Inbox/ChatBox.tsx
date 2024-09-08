"use client";

import {
	Box,
	Button,
	Divider,
	Grid,
	GridCol,
	Group,
	Image,
	Paper,
	Stack,
	Text,
	Textarea,
	useMantineTheme,
	FileInput,
	Flex,
	Tabs,
	useMantineColorScheme,
	TextInput,
	Select,
} from "@mantine/core";
import {
	IconMail,
	IconPhone,
	IconRecordMail,
	IconX,
} from "@tabler/icons-react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import CollaborativeEditor from "./CollaborativeEditor";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useAppSelector } from "@/redux/store";
import withAuth from "../Hoc/withAuth";

// Type Definitions
type User = {
	userId: number;
	name: string;
};

type Attachment = {
	name: string;
	url: string;
};

type ChatStatus = "active" | "interviewed" | "hired" | "rejected";

interface Chat {
	chatId: number;
	receiver: Profile;
	messages: {
		msgNum: number;
		text: string;
		attachments: Attachment[];
		links: string[];
		sender: User;
	}[];
	status: ChatStatus;
}

interface Profile {
	userId: number;
	name: string;
	avatar: string;
	job: string;
	email: string;
	phone: string;
	calendlyUserName: string;
}

// Mock Data
const mockChats: Chat[] = [
	{
		chatId: 1,
		receiver: {
			userId: 6,
			name: "Mihir Gadhe",
			job: "Senior UIX Designer",
			avatar: "https://example.com/avatar-mihir.jpg",
			email: "gadhemihir96@gmail.com",
			phone: "9637059439",
			calendlyUserName: "gadhemihir96",
		},
		status: "active",
		messages: [
			{
				msgNum: 1,
				text: "Heyy Vardhan",
				attachments: [],
				links: [],
				sender: { userId: 6, name: "Mihir" },
			},
			{
				msgNum: 2,
				text: "Hi Mihir, let's catch up",
				attachments: [],
				links: [],
				sender: { userId: 1, name: "Vardhan" },
			},
		],
	},
	{
		chatId: 2,
		receiver: {
			userId: 7,
			name: "Priya Shah",
			job: "Backend Developer",
			avatar: "https://example.com/avatar-priya.jpg",
			email: "priya.shah@example.com",
			phone: "9876543210",
			calendlyUserName: "priyashah",
		},
		status: "interviewed",
		messages: [
			{
				msgNum: 1,
				text: "Hello Priya, are you available for a meeting tomorrow?",
				attachments: [],
				links: [],
				sender: { userId: 1, name: "Vardhan" },
			},
			{
				msgNum: 2,
				text: "Hi Vardhan, yes, I am available at 10 AM.",
				attachments: [],
				links: [],
				sender: { userId: 7, name: "Priya" },
			},
		],
	},
	{
		chatId: 3,
		receiver: {
			userId: 8,
			name: "Rohan Mehta",
			job: "Data Scientist",
			avatar: "https://example.com/avatar-rohan.jpg",
			email: "rohan.mehta@example.com",
			phone: "9123456780",
			calendlyUserName: "rohanmehta",
		},
		status: "hired",
		messages: [
			{
				msgNum: 1,
				text: "Congratulations Rohan, you're hired!",
				attachments: [],
				links: [],
				sender: { userId: 1, name: "Vardhan" },
			},
			{
				msgNum: 2,
				text: "Thank you, Vardhan! I'm excited to join the team.",
				attachments: [],
				links: [],
				sender: { userId: 8, name: "Rohan" },
			},
		],
	},
	{
		chatId: 4,
		receiver: {
			userId: 9,
			name: "Anjali Verma",
			job: "Marketing Specialist",
			avatar: "https://example.com/avatar-anjali.jpg",
			email: "anjali.verma@example.com",
			phone: "8765432109",
			calendlyUserName: "anjaliverma",
		},
		status: "rejected",
		messages: [
			{
				msgNum: 1,
				text: "Hi Anjali, thank you for your time. Unfortunately, we have decided to move forward with other candidates.",
				attachments: [],
				links: [],
				sender: { userId: 1, name: "Vardhan" },
			},
			{
				msgNum: 2,
				text: "Thank you for the opportunity, Vardhan. I appreciate the consideration.",
				attachments: [],
				links: [],
				sender: { userId: 9, name: "Anjali" },
			},
		],
	},
	{
		chatId: 5,
		receiver: {
			userId: 10,
			name: "Vikram Singh",
			job: "Product Manager",
			avatar: "https://example.com/avatar-vikram.jpg",
			email: "vikram.singh@example.com",
			phone: "9988776655",
			calendlyUserName: "vikramsingh",
		},
		status: "active",
		messages: [
			{
				msgNum: 1,
				text: "Hey Vikram, could you provide more details on the project?",
				attachments: [],
				links: [],
				sender: { userId: 1, name: "Vardhan" },
			},
			{
				msgNum: 2,
				text: "Sure, Vardhan. I'll send over the documents shortly.",
				attachments: [],
				links: [],
				sender: { userId: 10, name: "Vikram" },
			},
		],
	},
];

// Main ChatBox Component
const ChatBox = () => {
	const theme = useMantineTheme();
	const [chats, setChats] = useState<Chat[]>(mockChats);
	const [newMessage, setNewMessage] = useState("");
	const [newAttachments, setNewAttachments] = useState<Attachment[]>([]);
	const [newLinks, setNewLinks] = useState<string[]>([]);
	const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [showCalendly, setShowCalendly] = useState(false);
	const { colorScheme } = useMantineColorScheme();
	const isRecruiter = useAppSelector((state) => state.toggle.isRecruiter);
	const isSmallScreen = useMediaQuery("(max-width: 768px)");
	const bg =
		colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<Chat[]>("/api/chat");
				setChats(response.data);
			} catch (error) {
				console.error("Error fetching chat data:", error);
			}
		};
		fetchData();
	}, []);

	const handleSendMessage = () => {
		if (selectedChat) {
			if (newMessage.trim() !== "") {
				const newMsg = {
					msgNum: selectedChat?.messages.length + 1 || 1,
					text: newMessage,
					attachments: newAttachments,
					links: newLinks,
					sender: { userId: 1, name: "Vardhan" }, // Replace with actual sender info
				};

				axios
					.post("/api/chat", { message: newMsg })
					.then((response) => {
						setChats((prevChats) => {
							return prevChats.map((chat) =>
								chat.chatId === selectedChat?.chatId
									? { ...chat, messages: [...chat.messages, response.data] }
									: chat,
							);
						});
						setNewMessage("");
						setNewAttachments([]);
						setNewLinks([]);
					})
					.catch((error) => {
						console.error("Error sending message:", error);
					});
			}
		} else {
			console.log("No chat selected.");
		}
	};

	const handleChatClick = (chat: Chat) => {
		setSelectedChat(chat);
		notifications.show({
			title: "Chat selected",
			message: "Chat",
			color: "green",
			w: "200px",

			styles: (theme) => ({
				root: {
					position: "fixed",
					zIndex: 9999,
					bottom: 35,
					right: 0,
				},
			}),
		});
	};

	const handleFileUpload = (file: File) => {
		const url = URL.createObjectURL(file);
		const attachment = { name: file.name, url };
		setNewAttachments((prevAttachments) => [...prevAttachments, attachment]);
	};

	const handleAddLink = (link: string) => {
		setNewLinks((prevLinks) => [...prevLinks, link]);
	};

	const filteredChats = chats.filter((chat) =>
		chat.receiver.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);
	const handleStatusChange = async (chatId: number, newStatus: ChatStatus) => {
		try {
			const response = await axios.put(`/api/chats/${chatId}/status`, {
				status: newStatus,
			});

			if (response.status === 200) {
				// Optionally update the local state or UI based on the response
				// A function to update the local state

				notifications.show({
					title: "Success",
					message: "Status updated successfully!",
					color: "green",
					w: "200px",

					styles: (theme) => ({
						root: {
							position: "fixed",
							zIndex: 9999,
							bottom: 0,
							right: 0,
						},
					}),
				});
			} else {
				// Handle unexpected response status
				notifications.show({
					title: "Success",
					message: "Failed to update status.",
					color: "red",
					w: "200px",

					styles: (theme) => ({
						root: {
							position: "fixed",
							zIndex: 9999,
							bottom: 0,
							right: 0,
						},
					}),
				});
			}
		} catch (error) {
			// Handle error (network issue, server error, etc.)
			notifications.show({
				title: "Success",
				message: "An error occurred.",
				color: "red",
				w: "200px",

				styles: (theme) => ({
					root: {
						position: "fixed",
						zIndex: 9999,
						bottom: 0,
						right: 0,
					},
				}),
			});

			console.error("Error updating status:", error);
		}
	};

	return (
		<Box p={20}>
			{isSmallScreen ? (
				<Tabs defaultValue={"Chats"}>
					<Tabs.List justify="space-between">
						<Tabs.Tab value="Chats">Chats</Tabs.Tab>
						<Tabs.Tab value="Message">Messages</Tabs.Tab>
						<Tabs.Tab value="Profile">Profile</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="Chats">
						<Divider mt={10} />
						<TextInput
							placeholder="Search by name..."
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.currentTarget.value)}
							mb={10}
						/>
						<Stack>
							{filteredChats.length > 0 ? (
								filteredChats.map((chat) => (
									<Grid key={chat.chatId}>
										<Grid.Col span={9}>
											<Button
												h={60} // Set the height of the Button
												w="100%"
												bg={bg}
												onClick={() => handleChatClick(chat)}
												p={0} // Ensure no extra padding
											>
												<ChatItem colorScheme={colorScheme} chat={chat} />
											</Button>
										</Grid.Col>
										{isRecruiter && (
											<Grid.Col span={2}>
												<Select
													value={chat.status}
													onChange={(status) =>
														handleStatusChange(
															chat.chatId,
															status as ChatStatus,
														)
													}
													data={[
														{ value: "active", label: "Active" },
														{ value: "interviewed", label: "Interviewed" },
														{ value: "hired", label: "Hired" },
														{ value: "rejected", label: "Rejected" },
													]}
													placeholder="Change status"
													w={100}
													h={60} // Set the height of the Select to match the Button
													pt={0}
													pb={0} // Ensure the Select dropdown aligns vertically
												/>
											</Grid.Col>
										)}
									</Grid>
								))
							) : (
								<Text>No chats found.</Text>
							)}
						</Stack>
					</Tabs.Panel>
					<Tabs.Panel value="Message">
						{selectedChat ? (
							<Grid align="flex-start" mt={10}>
								<GridCol span={12}>
									<Paper
										p={10}
										mih={"58vh"}
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-end",
										}}
									>
										{selectedChat.messages.map((message) => (
											<Box
												style={{ display: "flex", flexDirection: "column" }}
												key={message.msgNum}
												mb={10}
											>
												<Box>
													<Text fw={500}>{message.sender.name}</Text>
													<Text>{message.text}</Text>
													{message.attachments.map((attachment, index) => (
														<a
															key={index}
															href={attachment.url}
															target="_blank"
															rel="noopener noreferrer"
														>
															<Text c="blue">{attachment.name}</Text>
														</a>
													))}
													{message.links.map((link, index) => (
														<a
															key={index}
															href={link}
															target="_blank"
															rel="noopener noreferrer"
														>
															<Text color="blue">{link}</Text>
														</a>
													))}
												</Box>
											</Box>
										))}
									</Paper>

									<Grid
										bg={bg}
										style={{ borderTop: "2px solid lightgrey" }}
										mt={10}
										h={"21.25vh"}
									>
										<GridCol span={12}>
											<Textarea
												placeholder="Type your message..."
												variant="filled"
												autosize
												minRows={3}
												maxRows={3}
												m={"sm"}
												onChange={(event) => setNewMessage(event.target.value)}
												style={{ resize: "none" }}
											/>
										</GridCol>
										<GridCol span={12}>
											<Flex justify={"space-around"}>
												<Flex gap={20}>
													<Button
														variant="outline"
														mt="sm"
														onClick={() => {
															if (typeof window !== "undefined") {
																const input = document.createElement("input");
																input.type = "file";
																input.onchange = (event: any) => {
																	handleFileUpload(event.target.files[0]);
																};
																input.click();
															}
														}}
													>
														Attach
													</Button>
												</Flex>

												<Button onClick={handleSendMessage} mt="sm">
													Send
												</Button>
											</Flex>
										</GridCol>
									</Grid>
								</GridCol>
							</Grid>
						) : (
							<Text mt={20}>Select a chat to view messages.</Text>
						)}
					</Tabs.Panel>
					<Tabs.Panel value="Profile">
						{selectedChat ? (
							<Grid bg={bg} p={10} mt={10}>
								<GridCol span={12}>
									<Box
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<Image
											src={"/profile.png"}
											alt={selectedChat.receiver.name}
											radius="full"
										/>
										<Text mt="xs" fw={500}>
											{selectedChat.receiver.name}
										</Text>
										{!showCalendly && (
											<>
												<Text mt="xs" c="dimmed">
													{selectedChat.receiver.job || "Not specified"}
												</Text>
												{/* <Button mt="sm" variant="outline" size="sm">
													View Profile
												</Button> */}
												<Divider my="sm" c={"black"} />
												<Text mt="xs" fw={500}>
													Applied For:
												</Text>
												<Text mt="xs" c="dimmed">
													{selectedChat.receiver.job || "Not specified"}
												</Text>
												<Text mt="xs" c="dimmed">
													Design
												</Text>
												<Divider my="sm" />
												<Stack gap={10}>
													<Flex justify="flex-start" align="center">
														<IconMail
															size={16}
															style={{ marginRight: "8px" }}
														/>
														<Text c="dimmed" style={{ lineHeight: 1 }}>
															{selectedChat.receiver.email || "Not specified"}
														</Text>
													</Flex>
													<Flex justify="flex-start" align="center">
														<IconPhone
															size={16}
															style={{ marginRight: "8px" }}
														/>
														<Text c="dimmed" style={{ lineHeight: 1 }}>
															{selectedChat.receiver.phone || "Not specified"}
														</Text>
													</Flex>
												</Stack>
											</>
										)}
										<Divider my="sm" />
										{isRecruiter && (
											<Button
												mt="sm"
												variant="outline"
												size="sm"
												onClick={() => setShowCalendly(!showCalendly)}
											>
												{!showCalendly ? "Schedule" : <IconX size={16} />}
											</Button>
										)}
										{showCalendly && (
											<InlineWidget
												styles={{ height: "50vh", marginTop: "10px" }}
												url={`https://calendly.com/${selectedChat.receiver.calendlyUserName}/30min`}
											/>
										)}
									</Box>
								</GridCol>
							</Grid>
						) : (
							<Text mt={20}>Select a chat to view profile.</Text>
						)}
					</Tabs.Panel>
				</Tabs>
			) : (
				<Grid align="flex-start" mt={10}>
					{/* Chat list */}
					<GridCol span={3}>
						<TextInput
							placeholder="Search by name..."
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.currentTarget.value)}
							mb={10}
						/>
						<Stack>
							{filteredChats.length > 0 ? (
								filteredChats.map((chat) => (
									<Grid key={chat.chatId}>
										<Grid.Col span={9}>
											<Button
												h={60} // Set the height of the Button
												w="100%"
												bg={bg}
												onClick={() => handleChatClick(chat)}
												p={0} // Ensure no extra padding
											>
												<ChatItem colorScheme={colorScheme} chat={chat} />
											</Button>
										</Grid.Col>
										{isRecruiter && (
											<Grid.Col span={2}>
												<Select
													value={chat.status}
													onChange={(status) =>
														handleStatusChange(
															chat.chatId,
															status as ChatStatus,
														)
													}
													data={[
														{ value: "active", label: "Active" },
														{ value: "interviewed", label: "Interviewed" },
														{ value: "hired", label: "Hired" },
														{ value: "rejected", label: "Rejected" },
													]}
													placeholder="Change status"
													w={80}
													h={60} // Set the height of the Select to match the Button
													pt={0}
													pb={0} // Ensure the Select dropdown aligns vertically
												/>
											</Grid.Col>
										)}
									</Grid>
								))
							) : (
								<Text>No chats found.</Text>
							)}
						</Stack>
					</GridCol>

					{/* Selected chat and receiver profile */}
					{selectedChat && (
						<>
							<GridCol span={6}>
								<Paper
									p={10}
									mih={"65vh"}
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "flex-end",
									}}
								>
									{selectedChat.messages.map((message) => (
										<Box
											style={{ display: "flex", flexDirection: "column" }}
											key={message.msgNum}
											mb={10}
										>
											<Box>
												<Text fw={500}>{message.sender.name}</Text>
												<Text>{message.text}</Text>
												{message.attachments.map((attachment, index) => (
													<a
														key={index}
														href={attachment.url}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Text c="blue">{attachment.name}</Text>
													</a>
												))}
												{message.links.map((link, index) => (
													<a
														key={index}
														href={link}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Text color="blue">{link}</Text>
													</a>
												))}
											</Box>
										</Box>
									))}
								</Paper>

								<Grid
									bg={bg}
									style={{ borderTop: "2px solid lightgrey" }}
									mt={10}
									h={"21.25vh"}
								>
									<GridCol span={12}>
										<Textarea
											placeholder="Type your message..."
											variant="filled"
											autosize
											minRows={7}
											maxRows={7}
											m={"sm"}
											onChange={(event) => setNewMessage(event.target.value)}
											style={{ resize: "none" }}
										/>
									</GridCol>
									<GridCol span={12}>
										<Flex justify={"space-around"}>
											<Flex gap={20}>
												<Button
													variant="outline"
													mt="sm"
													onClick={() => {
														if (typeof window !== "undefined") {
															const input = document.createElement("input");
															input.type = "file";
															input.onchange = (event: any) => {
																handleFileUpload(event.target.files[0]);
															};
															input.click();
														}
													}}
												>
													Attach
												</Button>
											</Flex>

											<Button onClick={handleSendMessage} mt="sm">
												Send
											</Button>
										</Flex>
									</GridCol>
								</Grid>
							</GridCol>
							<Divider my="sm" />
							<GridCol bg={bg} p={10} mt={10} span={3} h={"87vh"}>
								<Box
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<Image
										src={"/profile.png"}
										alt={selectedChat.receiver.name}
										radius="full"
									/>
									<Text mt="xs" fw={500}>
										{selectedChat.receiver.name}
									</Text>
									{!showCalendly && (
										<>
											<Text mt="xs" c="dimmed">
												{selectedChat.receiver.job || "Not specified"}
											</Text>
											{/* <Button mt="sm" variant="outline" size="sm">
												View Profile
											</Button> */}
											<Divider my="sm" c={"black"} />
											<Text mt="xs" fw={500}>
												Applied For:
											</Text>
											<Text mt="xs" c="dimmed">
												{selectedChat.receiver.job || "Not specified"}
											</Text>
											<Text mt="xs" c="dimmed">
												Design
											</Text>
											<Divider my="sm" />
											<Stack gap={10}>
												<Flex justify="flex-start" align="center">
													<IconMail size={16} style={{ marginRight: "8px" }} />
													<Text c="dimmed" style={{ lineHeight: 1 }}>
														{selectedChat.receiver.email || "Not specified"}
													</Text>
												</Flex>
												<Flex justify="flex-start" align="center">
													<IconPhone size={16} style={{ marginRight: "8px" }} />
													<Text c="dimmed" style={{ lineHeight: 1 }}>
														{selectedChat.receiver.phone || "Not specified"}
													</Text>
												</Flex>
											</Stack>
										</>
									)}
									<Divider my="sm" />
									{isRecruiter && (
										<Button
											mt="sm"
											variant="outline"
											size="sm"
											onClick={() => setShowCalendly(!showCalendly)}
										>
											{!showCalendly ? "Schedule" : <IconX size={16} />}
										</Button>
									)}
									{showCalendly && (
										<InlineWidget
											styles={{ height: "50vh", marginTop: "10px" }}
											url={`https://calendly.com/${selectedChat.receiver.calendlyUserName}/30min`}
										/>
									)}
								</Box>
							</GridCol>
						</>
					)}
				</Grid>
			)}
		</Box>
	);
};

export default withAuth(ChatBox);

// ChatItem Component for rendering individual chat list items
const ChatItem = ({
	chat,
	colorScheme,
}: {
	chat: Chat;
	colorScheme: string;
}) => {
	return (
		<Grid align="center" justify="flex-start">
			<Grid.Col span={3}>
				<Image
					src="https://example.com/avatar-placeholder.jpg"
					alt={chat.receiver.name}
					radius="sm"
					width={50}
					height={50}
				/>
			</Grid.Col>
			<Grid.Col span={9}>
				<Stack gap={0}>
					<Text
						size="md"
						c={colorScheme === "dark" ? "white" : "black"}
						fw={500}
					>
						{chat.receiver.name}
					</Text>
					<Text size="sm" c="dimmed">
						{chat.receiver.job}
					</Text>
					<Text size="xs" c="dimmed">
						Design
					</Text>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};
