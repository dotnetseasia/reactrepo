import * as React from "react";
import * as Icons from "../assests/icons/icons";

export const navigationItems = {
  sidebar: [
    {
      id: 1,
      name: "Dashboard",
      to: "/dashboard",
      text: "dashboard",
      icon: Icons.Dashboard,
    },
    {
      id: 2,
      name: "Role Management",
      to: "/role-management",
      text: "Role Management",
      icon: Icons.Role,
    },
    {
      id: 3,
      name: "User Management",
      to: "/user-management",
      text: "User Management",
      icon: Icons.User,
    },
    {
      id: 4,
      name: "Board",
      to: "/board",
      text: "board",
      icon: Icons.Board,
    },
    {
      id: 5,
      name: "Project Management",
      to: "/project-management",
      text: "Project Management",
      icon: Icons.Project,
    },
    // {
    //   id: 5,
    //   name: "My Project",
    //   to: "/myproject",
    //   text: "My Project",
    //   icon: Icons.Project,
    // },
    // {
    //   id: 6,
    //   name: "My Projects",
    //   to: "/myprojects-manager",
    //   text: "My Projects",
    //   icon: Icons.Project,
    // },
    {
      id: 7,
      name: "Screen Management",
      to: "/screen-management",
      text: "Expenses",
      icon: Icons.Screen,
    },
    {
      id: 8,
      name: "Notification Management",
      to: "/notification-management",
      text: "Notification Management",
      icon: Icons.Notification,
    },
  ],

  masterList: [
    // {
    //   id: 8,
    //   name: 'Add department',
    //   to: '/add-department',
    //   text: 'Add department',
    //   icon: Icons.User,
    // },
    {
      id: 9,
      name: "Departments",
      to: "/manage-department",
      text: "Departments",
      icon: Icons.User,
    },
    {
      id: 10,
      name: "Designation",
      to: "/manage-designation",
      text: "Designation",
      icon: Icons.User,
    },
    {
      id: 11,
      name: "Skill Sets",
      to: "/manage-technicalskill",
      text: "SkillSets",
      icon: Icons.User,
    },
    // {
    //   id: 12,
    //   name: 'Badges',
    //   to: '/manage-badges',
    //   text: 'Badges',
    //   icon: Icons.User,
    // },

    // {
    //   id: 13,
    //   name: "Achievements",
    //   to: "/manageachievement",
    //   text: "Achievements",
    //   icon: Icons.User,
    // },
    {
      id: 14,
      name: "Channels",
      to: "/editmanage-channel",
      text: "Manage Channel",
      icon: Icons.User,
    },
    {
      id: 15,
      name: "Department Head",
      to: "/manage-HodData",
      text: "Manage HOD",
      icon: Icons.User,
    },
    {
      id: 16,
      name: "Labels",
      to: "/manage-label",
      text: "Manage labels",
      icon: Icons.User,
    },
  ],
  Reports: [
    {
      id: 17,
      name: "Project Report",
      to: "/report-management",
      text: "Project Report",
      icon: Icons.User,
    },
    {
      id: 18,
      name: "Milestone Report",
      to: "/milestone-report",
      text: "Milestone Report",
      icon: Icons.User,
    },
  ],
  Notification: [
    {
      id: 17,
      name: "Event",
      to: "/event-board",
      text: "event-board",
      icon: Icons.Event,
    },
    {
      id: 18,
      name: "Notice",
      to: "/notice",
      text: "Notice",
      icon: Icons.User,
    },
  ],
};
export default navigationItems;
