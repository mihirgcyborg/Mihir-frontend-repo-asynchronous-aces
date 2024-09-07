import { Modal, Button, TextInput, FileInput, Box } from "@mantine/core";
import { useState } from "react";

interface ApplyJobModalProps {
	opened: boolean;
	onClose: () => void;
	onSubmit: (applicationData: { email: string; resume: File }) => void;
	jobTitle: string;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
	opened,
	onClose,
	onSubmit,
	jobTitle,
}) => {
	const [resume, setResume] = useState<File | null>(null);
	const [email, setEmail] = useState<string>("");

	const handleSubmit = () => {
		if (resume && email) {
			onSubmit({ email, resume });
			onClose();
		} else {
			// Handle validation errors
			alert("Please provide your email and resume.");
		}
	};

	return (
		<Modal
			opened={opened}
			transitionProps={{
				transition: "fade",
				duration: 600,
				timingFunction: "linear",
			}}
			onClose={onClose}
			title={`Apply for the ${jobTitle}`}
		>
			<Box>
				{/* <TextInput
					label="Email"
					placeholder="Your email"
					value={email}
					onChange={(event) => setEmail(event.currentTarget.value)}
					required
				/> */}
				<FileInput
					label="Upload Resume"
					placeholder="Select file"
					value={resume}
					onChange={setResume}
					required
				/>
				<Button fullWidth mt="md" onClick={handleSubmit}>
					Submit Application
				</Button>
			</Box>
		</Modal>
	);
};
