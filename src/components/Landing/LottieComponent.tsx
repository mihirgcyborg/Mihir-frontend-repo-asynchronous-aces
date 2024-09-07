import React from "react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import { Box, Flex } from "@mantine/core";
import classes from "./LottieComponent.module.css";
import dynamic from "next/dynamic";
const LottieComponent: React.FC<{
	animationData: unknown;
}> = ({ animationData }) => {
	return (
		<Box className={classes.lottie}>
			<Lottie
				animationData={animationData}
				loop={true}
				// style={{ width: width, height: height }}
			/>
		</Box>
	);
};

export default LottieComponent;
