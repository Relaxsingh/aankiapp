"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Library, BarChart3, Search, Settings, Plus, Folder, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateDeckDialog } from "./create-deck-dialog"

// Mock data for decks and folders
const recentDecks = [
  { id: "1", name: "Spanish Vocabulary", cardCount: 120 },
  { id: "2", name: "Medical Terminology", cardCount: 85 },
  { id: "3", name: "JavaScript Concepts", cardCount: 64 },
]

const folders = [
  { id: "1", name: "Languages", deckCount: 5 },
  { id: "2", name: "Medicine", deckCount: 3 },
  { id: "3", name: "Programming", deckCount: 7 },
]

const tags = [
  { id: "1", name: "Important", count: 12 },
  { id: "2", name: "Exam Prep", count: 8 },
  { id: "3", name: "Daily Review", count: 15 },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const [openCreateDeck, setOpenCreateDeck] = React.useState(false)

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Decks",
      href: "/decks",
      icon: Library,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Search",
      href: "/search",
      icon: Search,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar variant="floating" className="border-none">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 12L12 7M12 7L17 12M12 7V20M5 5H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {state === "expanded" && <span className="text-lg font-semibold text-foreground">AnkiPro</span>}
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu>
            {mainNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="mr-2" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-3 py-2">
            <SidebarGroupLabel>Recent Decks</SidebarGroupLabel>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full hover:bg-muted"
              onClick={() => setOpenCreateDeck(true)}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Create Deck</span>
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentDecks.map((deck) => (
                <SidebarMenuItem key={deck.id}>
                  <SidebarMenuButton asChild tooltip={deck.name} size="sm">
                    <Link href={`/decks/${deck.id}`} className="flex items-center">
                      <div className="mr-2 flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs">
                        {deck.name.charAt(0)}
                      </div>
                      <span>{deck.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{deck.cardCount}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-3 py-2">
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Create Folder</span>
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <SidebarMenuButton asChild tooltip={folder.name} size="sm">
                    <Link href={`/folders/${folder.id}`} className="flex items-center">
                      <Folder className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{folder.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{folder.deckCount}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <div className="flex items-center justify-between px-3 py-2">
            <SidebarGroupLabel>Tags</SidebarGroupLabel>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-muted">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Create Tag</span>
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {tags.map((tag) => (
                <SidebarMenuItem key={tag.id}>
                  <SidebarMenuButton asChild tooltip={tag.name} size="sm">
                    <Link href={`/tags/${tag.id}`} className="flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{tag.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{tag.count}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start px-2">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              {state === "expanded" && (
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Pro Plan</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>

      <CreateDeckDialog open={openCreateDeck} onOpenChange={setOpenCreateDeck} />
    </Sidebar>
  )
}
