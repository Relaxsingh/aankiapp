"use client"

import React from "react"
import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreateDeckDialog } from "./create-deck-dialog"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [openCreateDeck, setOpenCreateDeck] = React.useState(false)

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-gradient-to-br from-background to-background/95">
        <AppSidebar />
        <SidebarInset>
          <div className="flex h-full flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur">
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-full bg-background pl-8 md:w-[240px] lg:w-[280px]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setOpenCreateDeck(true)}
                  className="hidden gap-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:from-violet-700 hover:to-indigo-700 sm:flex"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Deck</span>
                </Button>
                <Button
                  onClick={() => setOpenCreateDeck(true)}
                  size="icon"
                  className="flex rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:from-violet-700 hover:to-indigo-700 sm:hidden"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Create Deck</span>
                </Button>
                <Button variant="outline" size="icon" className="relative rounded-full">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
                <ModeToggle />
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            </header>
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto py-6">{children}</div>
            </main>
          </div>
        </SidebarInset>
      </div>
      <CreateDeckDialog open={openCreateDeck} onOpenChange={setOpenCreateDeck} />
    </SidebarProvider>
  )
}
