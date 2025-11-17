"use client"

import { Bell, Search, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Generate breadcrumbs from pathname
function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/")
    const title = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    return { href, title }
  })
  return breadcrumbs
}

export function AppBar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b border-white/10 glass-gradient backdrop-blur-xl px-4 shadow-xl">
      {/* Left: Sidebar trigger + Breadcrumbs */}
      <div className="flex items-center gap-3 flex-1">
        <SidebarTrigger className="-ml-1 text-white/80 hover:text-white" />
        <Separator orientation="vertical" className="h-6 bg-white/10" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <BreadcrumbSeparator className="text-white/30" />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage className="text-white font-medium">{crumb.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href} className="text-white/60 hover:text-white transition-colors">
                      {crumb.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right: Search, Notifications, Theme Toggle, User Menu */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
          <Input
            type="search"
            placeholder="Search... (⌘K)"
            className="w-[200px] lg:w-[300px] pl-9 h-9 glass-strong border-white/10 text-white placeholder:text-white/40 focus-visible:ring-purple-500/50"
            readOnly
            onClick={() => {
              // TODO: Open command palette
              console.log("Open command palette")
            }}
          />
        </div>

        {/* Mobile search button */}
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 text-white/80 hover:text-white hover:bg-white/10">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Theme Toggle - Hidden for now since we're focusing on dark mode */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-strong border-white/10 text-white">
            <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-white/10">
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-white/10">
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-white/10">
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative text-white/80 hover:text-white hover:bg-white/10">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] gradient-pink border-0 shadow-lg pulse-glow">
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-strong border-white/10 text-white">
            <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 p-2 hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-white">Assignment Due Soon</p>
                  <span className="text-xs text-white/40">2h ago</span>
                </div>
                <p className="text-xs text-white/60">
                  Linear Algebra homework is due in 2 days
                </p>
              </div>
              <div className="flex flex-col gap-1 p-2 hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-white">New Study Material</p>
                  <span className="text-xs text-white/40">5h ago</span>
                </div>
                <p className="text-xs text-white/60">
                  Quantum Physics lecture notes uploaded
                </p>
              </div>
              <div className="flex flex-col gap-1 p-2 hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-white">Study Session Complete</p>
                  <span className="text-xs text-white/40">1d ago</span>
                </div>
                <p className="text-xs text-white/60">
                  You completed a 45-minute study session
                </p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="w-full justify-center text-center cursor-pointer hover:bg-white/10 text-white">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 rounded-full p-0 hover:bg-white/10">
              <Avatar className="h-9 w-9 ring-2 ring-white/20 hover:ring-purple-500/50 transition-all">
                <AvatarImage src="/avatar-placeholder.png" alt="Student" />
                <AvatarFallback className="gradient-purple-pink text-white font-bold">
                  ST
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-strong border-white/10 text-white">
            <DropdownMenuLabel className="text-white">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">Student</p>
                <p className="text-xs leading-none text-white/60">
                  student@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="hover:bg-white/10 text-white">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 text-white">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 hover:text-red-300">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
