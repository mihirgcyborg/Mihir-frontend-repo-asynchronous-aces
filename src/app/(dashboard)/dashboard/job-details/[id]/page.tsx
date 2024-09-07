"use client";
import { useEffect, useState } from "react";
import { Grid, Button, Flex, Box, Text, Tabs, GridCol } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowLeft } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

import JobDescriptionCards from "@/components/Dashboard/JobDescriptionCards";
import CandidatesList from "@/components/Dashboard/CandidatesList";
import ApplyJobModal from "@/components/Dashboard/ApplyJobModal";
import SharePromoteModal from "@/components/Dashboard/SharePromoteModal";
import { useAppSelector } from "@/redux/store";

type Attachment = {
	name: string;
	url: string;
};

type JobDetails = {
	id: number;
	title: string;
	department: string;
	jobType: string;
	recruitmentQuota: string;
	experiences: string;
	location: string;
	salary: string;
	status: string;
	createdDate: Date;
	hiringManager: string;
	skills: string[];
	attachments: Attachment[];
	jobDescription: string;
};

const dummyJobDetails: JobDetails = {
	id: 1,
	title: "Software Engineer",
	department: "Engineering",
	jobType: "Full-time",
	recruitmentQuota: "20",
	experiences: "2",
	location: "Remote",
	salary: "$80,000 - $100,000",
	status: "active",
	createdDate: new Date(),
	hiringManager: "John Deo",
	skills: ["JavaScript", "React", "Node.js"],
	attachments: [
		{
			name: "Company Policy.pdf",
			url: "https://example.com/policy.pdf",
		},
	],
	jobDescription:
		'<h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Job Title:</h2><p>Enter Job Title</p><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Job Description:</h3><p>Enter Job Description</p><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Responsibilities:</h3><ul style="list-style-type: disc; padding-left: 20px;"><li>Responsibility 1</li><li>Responsibility 2</li><li>Responsibility 3</li></ul><h3 style="font-size: 18px; font-weight: bold; margin-bottom: 12px;">Requirements:</h3><ul style="list-style-type: disc; padding-left: 20px;"><li>Requirement 1</li><li>Requirement 2</li><li>Requirement 3</li></ul></p>',
};

const JobDetails: React.FC = () => {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;
	const isMobile = useMediaQuery("(max-width: 768px)");
	const [selectedOption, setSelectedOption] = useState<string>("JobDetails");
	const [editMode, setEditMode] = useState<boolean>(false);
	const [jobData, setJobData] = useState<JobDetails | null>(null);
	const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
	const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
	const isRecruiter = useAppSelector((state) => state.toggle.isRecruiter);

	useEffect(() => {
		const fetchJobDetails = async () => {
			try {
				// const response = await fetch(`/api/jobs/${id}`);
				// const data = await response.json();
				// setJobData(data);

				// Dummy value setting
				setJobData(dummyJobDetails);
			} catch (error) {
				console.error("Error fetching job details:", error);
			}
		};

		fetchJobDetails();
	}, [id]);

	const handleBack = () => {
		router.push("/dashboard");
	};

	const handleOptionChange = (value: string | null) => {
		value && setSelectedOption(value);
	};

	const handleApply = () => {
		setIsApplyModalOpen(true);
	};

	const handleModalClose = () => {
		setIsApplyModalOpen(false);
	};
	const handleShareClick = () => {
		setIsShareModalOpen(true);
	};

	const handleShareModalClose = () => {
		setIsShareModalOpen(false);
	};

	const handleApplicationSubmit = async (applicationData: {
		email: string;
		resume: File;
	}) => {
		try {
			const response = await fetch("/api/apply", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					jobId: jobData?.id,
					email: applicationData.email,
					resume: applicationData.resume.name, // Save the file name or path
				}),
			});

			const data = await response.json();
			if (data.success) {
				alert("Application submitted successfully!");
			} else {
				alert("Failed to submit application.");
			}
		} catch (error) {
			console.error("Error submitting application:", error);
		}
	};

	return (
		jobData && (
			<Grid gutter={"lg"}>
				<GridCol span={12}>
					<Flex
						wrap={isMobile ? "wrap" : "nowrap"}
						align={"center"}
						justify={"space-between"}
						p={"md"}
					>
						<Flex>
							<Button
								leftSection={<IconArrowLeft size={23} />}
								onClick={handleBack}
								variant="transparent"
								ml={2}
							></Button>

							<Box p={"md"} maw={200}>
								<Text c="dimmed" size={"sm"}>
									{jobData.department.toUpperCase()}
								</Text>
								<Text w={500} size={"lg"}>
									{jobData.title}
								</Text>

								<Text c="dimmed" size={"xs"}>
									{jobData.location} * {jobData.jobType}
								</Text>
							</Box>
						</Flex>

						<Flex
							gap={isMobile ? 10 : 3}
							wrap={isMobile ? "wrap" : "nowrap"}
							justify={isMobile ? "center" : "flex-end"}
						>
							<Button
								variant="outline"
								onClick={handleShareClick}
								w={200}
								fullWidth={isMobile}
							>
								Share & Promote
							</Button>
							{isRecruiter ? (
								<Button variant="filled" fullWidth={isMobile}>
									Published
								</Button>
							) : (
								<Button
									variant="filled"
									onClick={handleApply}
									w={200}
									fullWidth={isMobile}
								>
									Apply
								</Button>
							)}
						</Flex>
					</Flex>
				</GridCol>
				<GridCol span={{ sm: 12, md: 12, lg: 12 }}>
					<Tabs
						color="#071126"
						value={selectedOption}
						onChange={handleOptionChange}
					>
						<Tabs.List>
							{isRecruiter && (
								<Tabs.Tab value="Candidates">Candidates</Tabs.Tab>
							)}
							<Tabs.Tab value="JobDetails">Job Details</Tabs.Tab>
						</Tabs.List>
					</Tabs>
				</GridCol>

				{selectedOption === "JobDetails" ? (
					<JobDescriptionCards
						isRecruiter={isRecruiter}
						createdDate={jobData?.createdDate ?? new Date()}
						hiringManager={jobData?.hiringManager ?? "N/A"}
						department={jobData?.department ?? "N/A"}
						recruitmentQuota={jobData?.recruitmentQuota ?? "N/A"}
						jobType={jobData?.jobType ?? "N/A"}
						experiences={jobData?.experiences ?? "N/A"}
						location={jobData?.location ?? "N/A"}
						salary={jobData?.salary ?? "N/A"}
						jobDescription={jobData?.jobDescription ?? "<h3>loading</h3>"}
						skills={jobData?.skills ?? ["skills1", "skill2"]}
						attachements={jobData?.attachments ?? []}
					/>
				) : (
					<CandidatesList jobId={1} />
				)}

				{/* Apply Job Modal */}
				<ApplyJobModal
					opened={isApplyModalOpen}
					onClose={handleModalClose}
					onSubmit={handleApplicationSubmit}
					jobTitle={jobData.title}
				/>
				<SharePromoteModal
					opened={isShareModalOpen}
					onClose={handleShareModalClose}
					jobUrl={`${window.location.origin}${window.location.pathname}`}
				/>
			</Grid>
		)
	);
};

export default JobDetails;
