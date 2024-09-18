import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";

import {
	ColorSchemeScript,
	DirectionProvider,
	MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Analytics } from "@vercel/analytics/react";
import { spaceGrotesk } from "@/styles/fonts";
import { theme } from "@/styles/theme";
import { AppProvider } from "./provider";
// import { Provider } from "react-redux";
import { store } from "@/redux/store";

export const metadata = {
	metadataBase: new URL("https://recruitnext.vercel.app/"),
	title: { default: "RecruitNext", template: "%s | RecruitNext" },
	description: "All in one Recruitment Solution",
	keywords: ["Recruitment", "Free hiring", "Talent", "Innovations"],
	authors: [
		{
			name: "Mihir Gadhe",
			url: "https://recruitnext.vercel.app/",
		},
	],
	creator: "mihir",
	manifest: "https://mantine-admin.vercel.app/site.webmanifest",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en-US">
			<head>
				<ColorSchemeScript />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body className={spaceGrotesk.className}>
				{/* <Provider store={store}> */}
				<DirectionProvider>
					<MantineProvider theme={theme}>
						<ModalsProvider>
							<AppProvider>{children}</AppProvider>
							<Analytics />
						</ModalsProvider>
					</MantineProvider>
				</DirectionProvider>
				{/* </Provider> */}
			</body>
		</html>
	);
}
