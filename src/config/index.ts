import {
  IconComponents,
  IconDashboard,
  IconLock,
  IconMoodSmile,
  IconBriefcase,
  IconUser,
  IconListCheck,
  IconNote,
  IconFolder,
  IconInbox,
} from "@tabler/icons-react";
import type { NavItem } from "@/types/nav-item";
import { IconBriefcase2 } from "@tabler/icons-react";

export const maxSkillsForAJob = 6;

export const asideOptionData = [
  {
    name: "Task",
    icon: IconListCheck,
  },
  {
    name: "Notes",
    icon: IconNote,
  },
  {
    name: "Folder",
    icon: IconFolder,
  },
];

export const navLinks: NavItem[] = [
  { label: "Dashboard", icon: IconDashboard, link: "/dashboard" },
  {
    label: "Inbox",
    icon: IconInbox, // Updated to a more appropriate icon for inbox
    link: "/inbox",
  },
  {
    label: "RECRUITMENT",
    icon: IconMoodSmile, // You could replace this if you find a better match
    initiallyOpened: true,
    links: [
      {
        label: "Jobs",
        link: "/",
      },
      {
        label: "Candidates",
        link: "/",
      },
    ],
  },
];
