"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Student",
    email: "student@university.edu",
    avatar: "/avatars/student.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "My Courses",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Assignments",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Study Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "AI Tutor",
      url: "#",
      icon: IconFileAi,
    },
  ],
  navClouds: [
    {
      title: "Study Resources",
      icon: IconDatabase,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Notes",
          url: "#",
        },
        {
          title: "Flashcards",
          url: "#",
        },
        {
          title: "Study Guides",
          url: "#",
        },
      ],
    },
    {
      title: "Schedule",
      icon: IconCamera,
      url: "#",
      items: [
        {
          title: "Class Schedule",
          url: "#",
        },
        {
          title: "Study Sessions",
          url: "#",
        },
        {
          title: "Exam Calendar",
          url: "#",
        },
      ],
    },
    {
      title: "Documents",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Uploaded Files",
          url: "#",
        },
        {
          title: "Shared Documents",
          url: "#",
        },
        {
          title: "Templates",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Study Groups",
      url: "#",
      icon: IconUsers,
    },
    {
      name: "Grade Tracker",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Resource Library",
      url: "#",
      icon: IconDatabase,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">StuTutor AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
