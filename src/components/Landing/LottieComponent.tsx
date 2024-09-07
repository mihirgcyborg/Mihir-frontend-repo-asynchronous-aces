import React from "react";
import Lottie from "lottie-react";
import { Box, Flex } from "@mantine/core";
import classes from "./LottieComponent.module.css";
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
