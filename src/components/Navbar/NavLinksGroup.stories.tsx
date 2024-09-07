// import type { Meta, StoryObj } from "@storybook/react";
// import { IconCalendarStats } from "@tabler/icons-react";
// import { NavLinksGroup } from "./NavLinksGroup";

// const meta: Meta<typeof NavLinksGroup> = {
//   title: "Components/NavLinksGroup",
//   component: NavLinksGroup,
//   tags: ["autodocs"],
//   parameters: {
//     layout: "fullscreen",
//   },
// };

// export default meta;
// type Story = StoryObj<typeof NavLinksGroup>;

// const handleLinkClick = (link: string) => {
//   console.log(`Link clicked: ${link}`);
// };

// const hasLinks = {
//   label: "Releases",
//   icon: IconCalendarStats,
//   links: [
//     { label: "Upcoming releases", link: "/" },
//     { label: "Previous releases", link: "/" },
//     { label: "Releases schedule", link: "/" },
//   ],
//   isSelected: false, // Add default selection state
//   linkClicked: handleLinkClick, // Add link click handler
// };

// export const HasLinks: Story = {
//   render: () => <NavLinksGroup {...hasLinks} />,
// };

// const noLinks = {
//   label: "Releases",
//   icon: IconCalendarStats,
//   link: "/",
//   isSelected: false, // Add default selection state
//   linkClicked: handleLinkClick, // Add link click handler
// };

// export const NoLinks: Story = {
//   render: () => <NavLinksGroup {...noLinks} />,
// };
