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
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      {/* Left: Sidebar trigger + Breadcrumbs */}
      <div className="flex items-center gap-2 flex-1">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
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
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search... (⌘K)"
            className="w-[200px] lg:w-[300px] pl-8 h-9 bg-muted/50"
            readOnly
            onClick={() => {
              // TODO: Open command palette
              console.log("Open command palette")
            }}
          />
        </div>

        {/* Mobile search button */}
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 relative">
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
              >
                3
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 p-2 hover:bg-muted rounded-md cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">Assignment Due Soon</p>
                  <span className="text-xs text-muted-foreground">2h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Linear Algebra homework is due in 2 days
                </p>
              </div>
              <div className="flex flex-col gap-1 p-2 hover:bg-muted rounded-md cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">New Study Material</p>
                  <span className="text-xs text-muted-foreground">5h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Quantum Physics lecture notes uploaded
                </p>
              </div>
              <div className="flex flex-col gap-1 p-2 hover:bg-muted rounded-md cursor-pointer">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">Study Session Complete</p>
                  <span className="text-xs text-muted-foreground">1d ago</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  You completed a 45-minute study session
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full justify-center text-center cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatar-placeholder.png" alt="Student" />
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  ST
                </AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">Student</p>
                <p className="text-xs leading-none text-muted-foreground">
                  student@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
