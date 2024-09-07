import React from "react";
import { Modal, Button, Group, TextInput } from "@mantine/core";
import {
	IconBrandTwitter,
	IconBrandFacebook,
	IconBrandLinkedin,
	IconClipboardCopy,
} from "@tabler/icons-react";

interface SharePromoteModalProps {
	opened: boolean;
	onClose: () => void;
	jobUrl: string;
}

export const SharePromoteModal: React.FC<SharePromoteModalProps> = ({
	opened,
	onClose,
	jobUrl,
}) => {
	const handleShareClick = (platform: string) => {
		let shareUrl = "";
		switch (platform) {
			case "twitter":
				shareUrl = `https://twitter.com/share?url=${encodeURIComponent(
					jobUrl,
				)}`;
				break;
			case "facebook":
				shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
					jobUrl,
				)}`;
				break;
			case "linkedin":
				shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
					jobUrl,
				)}`;
				break;
			default:
				break;
		}
		window.open(shareUrl, "_blank");
	};

	return (
		<Modal opened={opened} onClose={onClose} title="Share & Promote">
			<TextInput
				label="Job URL"
				value={jobUrl}
				readOnly
				rightSection={
					<Button
						variant="outline"
						onClick={() => navigator.clipboard.writeText(jobUrl)}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<IconClipboardCopy size={16} />
					</Button>
				}
			/>
			<Group mt={15} justify="center" gap="lg">
				<Button
					variant="default"
					leftSection={<IconBrandTwitter />}
					onClick={() => handleShareClick("twitter")}
				>
					Twitter
				</Button>
				<Button
					variant="default"
					leftSection={<IconBrandFacebook />}
					onClick={() => handleShareClick("facebook")}
				>
					Facebook
				</Button>
				<Button
					variant="default"
					leftSection={<IconBrandLinkedin />}
					onClick={() => handleShareClick("linkedin")}
				>
					LinkedIn
				</Button>
			</Group>
		</Modal>
	);
};
