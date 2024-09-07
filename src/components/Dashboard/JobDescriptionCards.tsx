"use client";
import {
	Divider,
	Flex,
	Grid,
	GridCol,
	Text,
	Box,
	Button,
	TextInput,
	Select,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import React from "react";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { useState } from "react";
import {
	IconCheck,
	IconDeviceFloppy,
	IconEdit,
	IconPencilCancel,
	IconX,
} from "@tabler/icons-react";
import { MdDelete } from "react-icons/md";
import { maxSkillsForAJob } from "@/config";
import { theme } from "@/styles/theme";
import { notifications } from "@mantine/notifications";
import axios from "axios";

type attachement = {
	name: string;
	url: string;
};
interface skillsSectionProps {
	skills: string[];
	editMode: boolean;
	onSkillsChange: (skills: string[]) => void;
}
const SkillsSection = ({
	skills,
	editMode,
	onSkillsChange,
}: skillsSectionProps) => {
	const { colorScheme } = useMantineColorScheme();
	const handleSkillChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		idx: number,
	) => {
		const updatedSkills = [...skills];
		updatedSkills[idx] = e.target.value;
		onSkillsChange(updatedSkills);
	};
	const handleAddSkill = () => {
		if (skills.length < maxSkillsForAJob) {
			onSkillsChange([...skills, ""]);
		}
	};

	const handleRemoveSkill = (idx: number) => {
		const updatedSkills = skills.filter((_, index) => index !== idx);
		onSkillsChange(updatedSkills);
	};
	return (
		<Box>
			<Text>Skills</Text>
			<Flex gap={5}>
				<Flex gap={10} style={{ flexDirection: editMode ? "column" : "row" }}>
					{skills.map((skill, idx) => {
						return editMode ? (
							<TextInput
								value={skill}
								onChange={(e) => handleSkillChange(e, idx)}
								key={idx}
								rightSection={
									<MdDelete onClick={() => handleRemoveSkill(idx)} size={16} />
								}
							/>
						) : (
							<Text
								style={{
									padding: "0.5rem",
									borderRadius: "12px",
									margin: "0px auto",
								}}
								size="sm"
								bg={colorScheme === "dark" ? theme.primaryColor : "lightgrey"}
								key={idx}
							>
								{skill}
							</Text>
						);
					})}
				</Flex>
				<Flex align={"center"}>
					{editMode && skills.length < maxSkillsForAJob && (
						<Button size="xs" onClick={handleAddSkill}>
							Add Skill
						</Button>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};

export const DescriptionEditor = ({
	jobDescription,
	onChange,
}: {
	jobDescription: string;
	onChange: (value: string) => void;
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			Subscript,
			Highlight,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: jobDescription,
		onUpdate({ editor }) {
			console.log(editor);
			onChange(editor.getHTML());
		},
	});

	return (
		<Box
			style={{
				border: "1.5px solid grey",
				padding: "20px",
				height: "100%",
				overflowY: "scroll",
				flex: 1,
			}}
		>
			<RichTextEditor editor={editor}>
				<RichTextEditor.Toolbar sticky stickyOffset={60}>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Bold />
						<RichTextEditor.Italic />
						<RichTextEditor.Underline />
						<RichTextEditor.Strikethrough />
						<RichTextEditor.ClearFormatting />
						<RichTextEditor.Highlight />
						<RichTextEditor.Code />
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.H1 />
						<RichTextEditor.H2 />
						<RichTextEditor.H3 />
						<RichTextEditor.H4 />
					</RichTextEditor.ControlsGroup>
					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Blockquote />
						<RichTextEditor.Hr />
						<RichTextEditor.BulletList />
						<RichTextEditor.OrderedList />
						<RichTextEditor.Subscript />
						<RichTextEditor.Superscript />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Link />
						<RichTextEditor.Unlink />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.AlignLeft />
						<RichTextEditor.AlignCenter />
						<RichTextEditor.AlignJustify />
						<RichTextEditor.AlignRight />
					</RichTextEditor.ControlsGroup>

					<RichTextEditor.ControlsGroup>
						<RichTextEditor.Undo />
						<RichTextEditor.Redo />
					</RichTextEditor.ControlsGroup>
				</RichTextEditor.Toolbar>

				<RichTextEditor.Content />
			</RichTextEditor>
		</Box>
	);
};
const AttachmentSection = ({
	attachements,
	editMode,
	onAttachmentChange,
}: {
	attachements: attachement[];
	editMode: boolean;
	onAttachmentChange: (updatedAttachments: attachement[]) => void;
}) => {
	const { colorScheme } = useMantineColorScheme();
	const handleAttachmentChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		idx: number,
		field: keyof attachement,
	) => {
		const updatedAttachments = [...attachements];
		updatedAttachments[idx][field] = e.target.value;
		onAttachmentChange(updatedAttachments);
	};

	const handleAddAttachment = () => {
		if (attachements.length < 2) {
			onAttachmentChange([...attachements, { name: "", url: "" }]);
		}
	};

	const handleRemoveAttachment = (idx: number) => {
		const updatedAttachments = attachements.filter((_, index) => index !== idx);
		onAttachmentChange(updatedAttachments);
	};
	return (
		<Box>
			<Text>Attachments</Text>
			<Flex gap={5}>
				<Flex gap={10} style={{ flexDirection: editMode ? "column" : "row" }}>
					{attachements.map((attachment, idx) => {
						return editMode ? (
							<Flex gap={2} key={idx}>
								<Box>
									<TextInput
										value={attachment.name}
										onChange={(e) => handleAttachmentChange(e, idx, "name")}
										placeholder="name..."
										style={{ flex: 1, marginBottom: "5px" }}
									/>
									<TextInput
										value={attachment.url}
										onChange={(e) => handleAttachmentChange(e, idx, "url")}
										placeholder="url..."
										style={{ flex: 1, marginBottom: "5px" }}
									/>
								</Box>
								<Flex align={"center"}>
									<MdDelete
										onClick={() => handleRemoveAttachment(idx)}
										size={16}
									/>
								</Flex>
							</Flex>
						) : (
							<Button
								component="a"
								c={"darkblue"}
								href={attachment.url}
								onClick={(event) => event.preventDefault()}
								style={{
									padding: "0.5rem",
									borderRadius: "12px",
									margin: "0px auto",
								}}
								bg={colorScheme === "dark" ? theme.primaryColor : "lightgrey"}
								key={idx}
							>
								<Text fw={"bolder"} size="sm" key={idx}>
									{attachment.name}
								</Text>
							</Button>
						);
					})}
				</Flex>
				<Flex align={"center"}>
					{editMode && attachements.length < 2 && (
						<Button size="xs" onClick={handleAddAttachment}>
							Add Attachment
						</Button>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};
interface JobDescriptionCardsProps {
	isRecruiter: boolean;
	createdDate: Date;
	hiringManager: string;
	department: string;
	recruitmentQuota: string;
	jobType: string;
	experiences: string;
	location: string;
	salary: string;
	skills: string[];
	attachements: attachement[];
	jobDescription: string;
}

const JobDescriptionCards = ({
	isRecruiter,
	jobDescription,
	attachements,
	skills,
	createdDate,
	hiringManager,
	department,
	recruitmentQuota,
	jobType,
	experiences,
	location,
	salary,
}: JobDescriptionCardsProps) => {
	const [editMode, setEditMode] = useState(false);
	const [editableJobDescription, setEditableJobDescription] =
		useState(jobDescription);
	const [editableSkills, setEditableSkills] = useState(skills);
	const [editableAttachments, setEditableAttachments] = useState(attachements);
	const [editableHiringManager, setEditableHiringManager] =
		useState(hiringManager);
	const [editableDepartment, setEditableDepartment] = useState(department);
	const [editableRecruitmentQuota, setEditableRecruitmentQuota] =
		useState(recruitmentQuota);
	const [editableJobType, setEditableJobType] = useState(jobType);
	const [editableExperiences, setEditableExperiences] = useState(experiences);
	const [editableLocation, setEditableLocation] = useState(location);
	const [editableSalary, setEditableSalary] = useState(salary);
	const { colorScheme } = useMantineColorScheme();
	const theme = useMantineTheme();

	const bg = colorScheme === "dark" ? theme.colors.dark[7] : "white";
	const handleSave = async () => {
		try {
			// const response = await axios.put("/api/jobs/update", {
			// 	jobDescription: editableJobDescription,
			// 	skills: editableSkills,
			// 	attachements: editableAttachments,
			// 	hiringManager: editableHiringManager,
			// 	department: editableDepartment,
			// 	recruitmentQuota: editableRecruitmentQuota,
			// 	jobType: editableJobType,
			// 	experiences: editableExperiences,
			// 	location: editableLocation,
			// 	salary: editableSalary,
			// });
			notifications.show({
				title: "Success",
				message: "Job details saved successfully!",
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
			setEditMode(false);

			// if (response.status === 200) {
			// 	notifications.show({
			// 		title: 'Success',
			// 		message: 'Job details saved successfully!',
			// 		color: 'green',
			// 	  });
			// 	setEditMode(false); // Exit edit mode on successful save
			// }
		} catch (error) {
			notifications.show({
				title: "Error",
				message: "Failed to save job details. Please try again.",
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
			console.error("Failed to save job details:", error);
		}
	};
	return (
		<Grid>
			<GridCol span={{ sm: 12, md: 12, lg: 8 }} bg={bg} mt={5} p={20}>
				<>
					<Flex
						justify={"space-between"}
						direction={{ base: "column", sm: "row" }} // Adjust direction based on screen size
						align={{ base: "start", sm: "center" }}
					>
						<Text size="lg">Senior Product Designer</Text>
						<div>
							{isRecruiter && (
								<Button
									variant="subtle"
									ml={10}
									leftSection={
										editMode ? (
											<IconPencilCancel size={16} />
										) : (
											<IconEdit size={16} />
										)
									}
									onClick={() => setEditMode(!editMode)}
								>
									{editMode ? "Cancel" : "Edit"}
								</Button>
							)}
							{editMode && (
								<Button
									variant="filled"
									ml={10}
									leftSection={<IconDeviceFloppy size={16} />}
									onClick={handleSave}
								>
									Save
								</Button>
							)}
						</div>
					</Flex>
					<Divider p={10} mt={10} />
					<Box mt={20}>
						<Text>Job Description</Text>
						<Box
							mt={10}
							h={{ sm: 200, lg: 600 }}
							w={{ base: 350, sm: 350, lg: "100%" }}
							style={{
								// Fixed height for the scrollable area
								overflowY: "auto", // Enable vertical scrolling
							}}
						>
							{editMode ? (
								<DescriptionEditor
									jobDescription={editableJobDescription}
									onChange={setEditableJobDescription}
								/>
							) : (
								<Box
									dangerouslySetInnerHTML={{ __html: editableJobDescription }}
								/>
							)}
						</Box>
					</Box>
					<Divider p={10} mt={20} />
					<Grid gutter="md" align="start">
						<Grid.Col span={{ base: 12, sm: 6 }}>
							<SkillsSection
								skills={editableSkills}
								editMode={editMode}
								onSkillsChange={setEditableSkills}
							/>
						</Grid.Col>

						<Grid.Col span={{ base: 12, sm: 6 }}>
							<AttachmentSection
								attachements={editableAttachments}
								editMode={editMode}
								onAttachmentChange={setEditableAttachments}
							/>
						</Grid.Col>
					</Grid>
				</>
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 4 }} bg={bg} mt={5} p={20}>
				<>
					<Text size="lg" w={700}>
						Job Details
					</Text>
					<Divider p={10} mt={10} />
					<Grid>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Job Creation Date
							</Text>
							<Text size="xs" w={500}>
								{createdDate?.toUTCString()}
							</Text>
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Hiring Manager
							</Text>
							{editMode ? (
								<TextInput
									value={editableHiringManager}
									onChange={(e) => setEditableHiringManager(e.target.value)}
								/>
							) : (
								<Text size="xs" w={500}>
									{editableHiringManager}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Department
							</Text>
							{editMode ? (
								<TextInput
									value={editableDepartment}
									onChange={(e) => setEditableDepartment(e.target.value)}
								/>
							) : (
								<Text size="xs" w={500}>
									{editableDepartment}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Recruitment Quota
							</Text>
							{editMode ? (
								<TextInput
									value={editableRecruitmentQuota}
									onChange={(e) => setEditableRecruitmentQuota(e.target.value)}
								/>
							) : (
								<Text size="xs" w={500}>
									{editableRecruitmentQuota}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Job Type
							</Text>
							{editMode ? (
								<Select
									value={editableJobType}
									onChange={setEditableJobType}
									data={[
										{ value: "Full-Time", label: "Full-Time" },
										{ value: "Part-Time", label: "Part-Time" },
										{ value: "Contract", label: "Contract" },
									]}
								/>
							) : (
								<Text size="xs" w={500}>
									{editableJobType}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Experience
							</Text>
							{editMode ? (
								<TextInput
									value={editableExperiences}
									onChange={(e) => setEditableExperiences(e.target.value)}
								/>
							) : (
								<Text size="xs" w={500}>
									{editableExperiences}+ years
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Location
							</Text>
							{editMode ? (
								<TextInput
									value={editableLocation}
									onChange={(e) => setEditableLocation(e.target.value)}
								/>
							) : (
								<Text size="xs" w={500}>
									{editableLocation}
								</Text>
							)}
						</Grid.Col>
						<Grid.Col span={{ lg: 12, md: 12, sm: 4 }}>
							<Text size="xs" c="dimmed">
								Salary
							</Text>
							{editMode ? (
								<TextInput
									value={editableSalary}
									onChange={(e) => setEditableSalary(e.target.value)}
								/>
							) : (
								<Text size="xs" w={500}>
									${editableSalary}
								</Text>
							)}
						</Grid.Col>
					</Grid>
				</>
			</GridCol>
		</Grid>
	);
};

export default JobDescriptionCards;
