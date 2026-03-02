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
  IconCalendar,
  IconNote,
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
import { useUser } from "@/contexts/UserContext"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Use the user context to get the user
  const { user, avatarUrl } = useUser()

  // Data for the sidebar
  const data = {
    user: {
      name: user?.user_metadata.full_name || "Student",
      email: user?.email || "student@university.edu",
      avatar: avatarUrl || "/avatars/student.jpg",
    },
    // Main navigation items
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      {
        title: "My Courses",
        url: "/courses",
        icon: IconFolder,
      },
      {
        title: "Assignments",
        url: "/assignments",
        icon: IconListDetails,
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: IconCalendar,
      },
      {
        title: "AI Tutor",
        url: "/aitutor",
        icon: IconFileAi,
      },
    ],
    // Cloud navigation items
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
    // Secondary navigation items
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
    ],
    // Documents navigation items
    documents: [
      {
        name: "My Notes",
        url: "/mynotes",
        icon: IconNote,
      },
      {
        name: "Grade Tracker",
        url: "#",
        icon: IconReport,
      },
    ],
  }

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
                <span className="text-base font-semibold">StuTutor</span>
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
