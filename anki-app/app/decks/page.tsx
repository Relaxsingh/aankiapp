"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronRight,
  Filter,
  Folder,
  FolderPlus,
  Grid3X3,
  LayoutGrid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function DecksPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Mock data for decks
  const [decks, setDecks] = useState([
    {
      id: "1",
      name: "Spanish Vocabulary",
      description: "Essential Spanish words and phrases for beginners",
      cards: 120,
      due: 18,
      progress: 68,
      lastStudied: "2 hours ago",
      tags: ["Languages", "Beginner"],
      color: "from-violet-500 to-indigo-600",
    },
    {
      id: "2",
      name: "Medical Terminology",
      description: "Common medical terms and definitions for medical students",
      cards: 85,
      due: 24,
      progress: 42,
      lastStudied: "Yesterday",
      tags: ["Medicine", "Academic"],
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: "3",
      name: "JavaScript Concepts",
      description: "Core JavaScript concepts and examples for web developers",
      cards: 64,
      due: 5,
      progress: 91,
      lastStudied: "3 days ago",
      tags: ["Programming", "Web Development"],
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "4",
      name: "World Capitals",
      description: "Capital cities of countries around the world",
      cards: 195,
      due: 0,
      progress: 100,
      lastStudied: "1 week ago",
      tags: ["Geography", "General Knowledge"],
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "5",
      name: "Literary Devices",
      description: "Common literary devices and techniques in literature",
      cards: 42,
      due: 12,
      progress: 72,
      lastStudied: "4 days ago",
      tags: ["Literature", "Academic"],
      color: "from-pink-500 to-rose-600",
    },
  ])

  // Mock data for folders
  const folders = [
    { id: "1", name: "Tech", deckCount: 2 },
    { id: "2", name: "Languages", deckCount: 1 },
    { id: "3", name: "Personal", deckCount: 1 },
    { id: "4", name: "General Knowledge", deckCount: 1 },
    { id: "5", name: "Professional", deckCount: 1 },
  ]

  // Mock data for categories
  const categories = ["Programming", "Language", "Career", "Education", "Medicine"]

  // Filter decks based on search query and selected category
  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? deck.tags.includes(selectedCategory) : true
    return matchesSearch && matchesCategory
  })

  const handleCreateFolder = () => {
    // In a real app, this would create a new folder
    console.log("Creating folder:", newFolderName)
    setNewFolderName("")
    setIsCreateFolderOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl animate-slide-up">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Decks</h1>
          <p className="text-muted-foreground">Manage and organize your flashcard collections</p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search decks..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setSelectedCategory(null)}>All Categories</DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                      <Tag className="mr-2 h-4 w-4" />
                      <span>{category}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal size={16} />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sort Decks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Alphabetical (A-Z)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Alphabetical (Z-A)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Recently Studied</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Most Cards</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Most Due Cards</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Folders and decks */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Folders sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex justify-between items-center">
                  <span>Folders</span>
                  <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FolderPlus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription>Organize your decks by creating a new folder.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="folder-name">Folder Name</Label>
                          <Input
                            id="folder-name"
                            placeholder="Enter folder name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateFolder}>Create Folder</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start font-normal">
                    <Grid3X3 className="mr-2 h-4 w-4" />
                    All Decks
                    <span className="ml-auto">{decks.length}</span>
                  </Button>
                  {folders.map((folder) => (
                    <Button key={folder.id} variant="ghost" className="w-full justify-start font-normal">
                      <Folder className="mr-2 h-4 w-4" />
                      {folder.name}
                      <span className="ml-auto">{folder.deckCount}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <FolderPlus className="h-4 w-4" />
                  New Folder
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Decks content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Decks</TabsTrigger>
                <TabsTrigger value="recent">Recently Studied</TabsTrigger>
                <TabsTrigger value="due">Due for Review</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {selectedCategory && (
                  <div className="mb-4 flex items-center">
                    <span className="text-sm mr-2">Filtered by:</span>
                    <div className="flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
                      <Tag size={14} />
                      <span>{selectedCategory}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 hover:bg-transparent"
                        onClick={() => setSelectedCategory(null)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                )}

                {filteredDecks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No decks found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery
                        ? `No decks match "${searchQuery}"`
                        : "Try creating a new deck or adjusting your filters"}
                    </p>
                    <GradientButton className="gap-2">
                      <Plus size={16} />
                      Create New Deck
                    </GradientButton>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredDecks.map((deck) => (
                      <Link href={`/decks/${deck.id}`} key={deck.id}>
                        <Card className="h-full shadow-card hover:shadow-card-hover transition-all duration-300 hover:translate-y-[-2px]">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{deck.name}</CardTitle>
                                <CardDescription className="mt-1">{deck.description}</CardDescription>
                              </div>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {deck.tags[0]}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">{deck.cards} cards</span>
                              <span className="font-medium text-primary">{deck.due} due</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${deck.color} rounded-full transition-all duration-300`}
                                style={{ width: `${deck.progress}%` }}
                              />
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">Last studied {deck.lastStudied}</div>
                          </CardContent>
                          <CardFooter className="pt-0 flex justify-between">
                            <span className="text-xs flex items-center gap-1">
                              <Folder className="h-3 w-3" />
                              {deck.tags[0]}
                            </span>
                            <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                              Study Now
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}

                    <Card className="h-full border-dashed shadow-none hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-6">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <Plus className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="font-medium">Create New Deck</p>
                      <p className="text-sm text-muted-foreground text-center mt-1">
                        Add a new collection of flashcards
                      </p>
                    </Card>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredDecks.map((deck) => (
                      <Link href={`/decks/${deck.id}`} key={deck.id}>
                        <Card className="shadow-card hover:shadow-card-hover transition-all duration-300">
                          <div className="flex items-center p-4">
                            <div className={`w-1 self-stretch rounded-full bg-gradient-to-b ${deck.color} mr-4`} />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium">{deck.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {deck.cards} cards • {deck.lastStudied}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <div className="text-sm font-medium text-primary">{deck.due} due</div>
                                    <div className="text-xs text-muted-foreground">{deck.progress}% complete</div>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent" className="mt-0">
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No recently studied decks</h3>
                  <p className="text-muted-foreground mb-4">Start studying to see your recent decks here</p>
                  <Button variant="outline" className="gap-2">
                    <Plus size={16} />
                    Browse All Decks
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="due" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredDecks
                    .filter((deck) => deck.due > 0)
                    .map((deck) => (
                      <Link href={`/decks/${deck.id}`} key={deck.id}>
                        <Card className="h-full shadow-card hover:shadow-card-hover transition-all duration-300 hover:translate-y-[-2px]">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{deck.name}</CardTitle>
                                <CardDescription className="mt-1">{deck.description}</CardDescription>
                              </div>
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                {deck.tags[0]}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-muted-foreground">{deck.cards} cards</span>
                              <span className="font-medium text-primary">{deck.due} due</span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${deck.color} rounded-full transition-all duration-300`}
                                style={{ width: `${deck.progress}%` }}
                              />
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">Last studied {deck.lastStudied}</div>
                          </CardContent>
                          <CardFooter className="pt-0 flex justify-between">
                            <span className="text-xs flex items-center gap-1">
                              <Folder className="h-3 w-3" />
                              {deck.tags[0]}
                            </span>
                            <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                              Study Now
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
