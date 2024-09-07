import React from "react";
import DashboardLayout from "../../(dashboard)/dashboard/layout";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import IndoxContent from "@/components/Inbox/IndoxContent";
import ProfileContent from "@/components/profile/ProfileContent";

const page = () => {
	return (
		<PageContainer title="profile">
			<DashboardLayout>
				<ProfileContent />
			</DashboardLayout>
		</PageContainer>
	);
};

export default page;
