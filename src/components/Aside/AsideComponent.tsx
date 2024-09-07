import { Group, Text, SimpleGrid, AppShellAside, Divider } from "@mantine/core";
import { asideOptionData } from "./../../config/index";

const AsideComponent = () => {
	return (
		<>
			{asideOptionData.map((option, idx) => (
				<IconOption key={idx} {...option} />
			))}
		</>
	);
};

interface iconOptionProps {
	icon: React.FC<any>;
	name: string;
}

const IconOption = ({ icon: Icon, name }: iconOptionProps) => {
	return (
		<Group style={{ display: "flex", justifyContent: "center" }}>
			<Icon />
			<Text size="sm" ta={"center"} w={400}>
				{name}
			</Text>
			<Divider color="black" size="1px" my="sm" />
		</Group>
	);
};

export default AsideComponent;
