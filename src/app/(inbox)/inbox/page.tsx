import React from "react";
import DashboardLayout from "../../(dashboard)/dashboard/layout";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import IndoxContent from "@/components/Inbox/IndoxContent";

const page = () => {
	return (
		<PageContainer title="indox">
			<DashboardLayout>
				<IndoxContent />
			</DashboardLayout>
		</PageContainer>
	);
};

export default page;
