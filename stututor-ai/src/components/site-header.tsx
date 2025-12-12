import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/ModeToggle"
import { MessageSquareText, Plus } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium hidden sm:block">Student Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
            <MessageSquareText className="size-4" />
            Ask AI Tutor
          </Button>
          <Button variant="default" size="sm" className="gap-2 shadow-lg shadow-primary/20">
             <Plus className="size-4" />
             <span className="hidden sm:inline">New Assignment</span>
             <span className="sm:hidden">New</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}