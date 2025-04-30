"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { StatCard } from "@/components/ui/stat-card"
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  Brain,
  Calendar,
  Edit,
  Folder,
  MoreHorizontal,
  Plus,
  Settings,
  Share2,
  Shuffle,
  Timer,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for decks
const MOCK_DECKS = {
  "1": {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Core concepts of JavaScript programming",
    cardCount: 42,
    dueCount: 8,
    lastStudied: "2 days ago",
    progress: 68,
    category: "Programming",
    folder: "Tech",
    createdAt: "2023-09-15",
    cards: [
      {
        id: "1-1",
        question: "What is a closure in JavaScript?",
        answer:
          "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In JavaScript, closures are created every time a function is created, at function creation time.",
      },
      {
        id: "1-2",
        question: "Explain the difference between let, const, and var.",
        answer:
          "var: Function-scoped, can be redeclared and updated, hoisted to the top of its scope. let: Block-scoped, can be updated but not redeclared, not hoisted. const: Block-scoped, cannot be updated or redeclared, not hoisted, must be initialized during declaration.",
      },
      {
        id: "1-3",
        question: "What is the event loop in JavaScript?",
        answer:
          "The event loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It monitors the call stack and the callback queue, and when the call stack is empty, it takes the first event from the queue and pushes it to the call stack, which effectively runs it.",
      },
    ],
    stats: {
      accuracy: 78,
      retention: 82,
      averageTime: "1.5 min",
      totalStudyTime: "3.2 hours",
      lastWeekCards: [12, 8, 15, 0, 5, 10, 7],
    },
    settings: {
      cardsPerSession: 20,
      reviewMode: "Spaced Repetition",
      cardOrder: "Smart",
      autoFlip: false,
      flipTimer: 0,
    },
  },
  "2": {
    id: "2",
    title: "React Hooks",
    description: "Modern React state management",
    cardCount: 23,
    dueCount: 5,
    lastStudied: "1 day ago",
    progress: 75,
    category: "Programming",
    folder: "Tech",
    createdAt: "2023-10-20",
    cards: [
      {
        id: "2-1",
        question: "What is useState hook?",
        answer:
          "useState is a Hook that lets you add React state to function components. It returns a stateful value and a function to update it.",
      },
      {
        id: "2-2",
        question: "Explain useEffect hook.",
        answer:
          "useEffect lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.",
      },
    ],
    stats: {
      accuracy: 85,
      retention: 88,
      averageTime: "1.2 min",
      totalStudyTime: "2.5 hours",
      lastWeekCards: [5, 7, 3, 0, 8, 4, 6],
    },
    settings: {
      cardsPerSession: 15,
      reviewMode: "Spaced Repetition",
      cardOrder: "Random",
      autoFlip: true,
      flipTimer: 10,
    },
  },
  "3": {
    id: "3",
    title: "Interview Prep",
    description: "Common interview questions and answers",
    cardCount: 67,
    dueCount: 12,
    lastStudied: "6 days ago",
    progress: 45,
    category: "Career",
    folder: "Personal",
    createdAt: "2023-08-05",
    cards: [
      {
        id: "3-1",
        question: "How do you prioritize tasks when dealing with urgent requests from multiple clients?",
        answer:
          "I prioritize tasks based on urgency and impact. I assess deadlines, dependencies, and business impact, then communicate realistic timelines to all stakeholders. I reserve buffer time for unexpected requests and delegate when possible.",
      },
      {
        id: "3-2",
        question: "Describe a situation where you had to adapt to a significant change at work.",
        answer:
          "When our company transitioned to remote work, I quickly adapted by implementing daily video stand-ups, creating digital collaboration spaces, and establishing clear communication protocols. This maintained team productivity and even improved some workflows.",
      },
    ],
    stats: {
      accuracy: 65,
      retention: 70,
      averageTime: "2.0 min",
      totalStudyTime: "5.8 hours",
      lastWeekCards: [0, 0, 0, 15, 20, 0, 0],
    },
    settings: {
      cardsPerSession: 25,
      reviewMode: "Standard",
      cardOrder: "Sequential",
      autoFlip: false,
      flipTimer: 0,
    },
  },
}

export default function DeckDetailPage() {
  const params = useParams()
  const router = useRouter()
  const deckId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  const deck = MOCK_DECKS[deckId]

  if (!deck) {
    return (
      <DashboardLayout>
        <div className="container py-8 max-w-7xl">
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Deck not found</h1>
          </div>
          <p className="text-muted-foreground">The deck you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => router.push("/decks")}>
            Back to Decks
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  // Calculate days since creation
  const creationDate = new Date(deck.createdAt)
  const today = new Date()
  const daysSinceCreation = Math.floor((today.getTime() - creationDate.getTime()) / (1000 * 3600 * 24))

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{deck.title}</h1>
              <p className="text-muted-foreground">{deck.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>Move to Folder</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Export Deck</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete Deck</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Cards"
            value={deck.cardCount}
            icon={<BookOpen className="h-5 w-5" />}
            description={`${deck.dueCount} cards due for review`}
          />
          <StatCard
            title="Mastery Level"
            value={`${deck.progress}%`}
            icon={<Brain className="h-5 w-5" />}
            description="Based on your performance"
            valueClassName="gradient-text"
          />
          <StatCard
            title="Study Streak"
            value={`${daysSinceCreation} days`}
            icon={<Calendar className="h-5 w-5" />}
            description={`Created on ${new Date(deck.createdAt).toLocaleDateString()}`}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
          <GradientButton className="ml-4 gap-2" onClick={() => router.push(`/decks/${deckId}/study`)}>
            <BookOpen className="h-4 w-4" />
            Study Now
          </GradientButton>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Performance Overview
                  </CardTitle>
                  <CardDescription>Your learning progress for this deck</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{deck.stats.accuracy}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{deck.stats.retention}%</div>
                      <div className="text-sm text-muted-foreground">Retention</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{deck.stats.averageTime}</div>
                      <div className="text-sm text-muted-foreground">Avg. Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{deck.stats.totalStudyTime}</div>
                      <div className="text-sm text-muted-foreground">Total Time</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium">Cards Studied This Week</h4>
                      <span className="text-sm text-muted-foreground">
                        {deck.stats.lastWeekCards.reduce((a, b) => a + b, 0)} cards
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{day}</div>
                          <div className="h-16 bg-muted rounded-md flex flex-col items-center justify-end p-1">
                            <div
                              className="w-full bg-primary rounded-sm"
                              style={{
                                height: `${Math.min(100, (deck.stats.lastWeekCards[i] / 20) * 100)}%`,
                                opacity: deck.stats.lastWeekCards[i] > 0 ? 1 : 0.3,
                              }}
                            />
                            <div className="text-xs mt-1">{deck.stats.lastWeekCards[i]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Sample Cards
                  </CardTitle>
                  <CardDescription>Preview some cards from this deck</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deck.cards.slice(0, 2).map((card) => (
                      <Card key={card.id} className="overflow-hidden">
                        <div className="bg-muted p-4">
                          <h4 className="font-medium">{card.question}</h4>
                        </div>
                        <div className="p-4 border-t">
                          <p className="text-sm">{card.answer}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("cards")}>
                    View All Cards
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Mastery Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <ProgressRing progress={deck.progress} size={180} strokeWidth={12} className="mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{deck.progress}%</div>
                      <div className="text-xs text-muted-foreground">Mastered</div>
                    </div>
                  </ProgressRing>

                  <div className="w-full space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mastered</span>
                        <span>
                          {Math.round(deck.cardCount * (deck.progress / 100))}/{deck.cardCount}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full"
                          style={{ width: `${deck.progress}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Learning</span>
                        <span>
                          {Math.round(deck.cardCount * 0.2)}/{deck.cardCount}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-warning rounded-full" style={{ width: "20%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Not Started</span>
                        <span>
                          {Math.round(deck.cardCount * (1 - deck.progress / 100 - 0.2))}/{deck.cardCount}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-muted-foreground/30 rounded-full"
                          style={{ width: `${100 - deck.progress - 20}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Study Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <span>Cards per session</span>
                    </div>
                    <span className="font-medium">{deck.settings.cardsPerSession}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <span>Review mode</span>
                    </div>
                    <span className="font-medium">{deck.settings.reviewMode}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <Shuffle className="h-4 w-4 text-primary" />
                      </div>
                      <span>Card order</span>
                    </div>
                    <span className="font-medium">{deck.settings.cardOrder}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-primary/10 p-1.5">
                        <Timer className="h-4 w-4 text-primary" />
                      </div>
                      <span>Auto-flip timer</span>
                    </div>
                    <span className="font-medium">
                      {deck.settings.autoFlip ? `${deck.settings.flipTimer}s` : "Off"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("settings")}>
                    Customize Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "cards" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">All Cards ({deck.cardCount})</h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Card
              </Button>
            </div>

            <div className="space-y-4">
              {deck.cards.map((card, index) => (
                <Card key={card.id} className="shadow-card">
                  <div className="flex items-center p-4 border-b">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{card.question}</h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Card</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Card</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="p-4 bg-muted/30">
                    <p className="text-sm">{card.answer}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="border-dashed shadow-none hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium">Add New Card</p>
                <p className="text-sm text-muted-foreground text-center mt-1">Create a new flashcard for this deck</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance Statistics</CardTitle>
                <CardDescription>Detailed analytics of your study sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="flex flex-col items-center">
                    <ProgressRing progress={deck.stats.accuracy} size={100} strokeWidth={8} color="stroke-primary">
                      <span className="text-xl font-bold">{deck.stats.accuracy}%</span>
                    </ProgressRing>
                    <span className="mt-2 text-sm text-muted-foreground">Accuracy</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <ProgressRing progress={deck.stats.retention} size={100} strokeWidth={8} color="stroke-purple-500">
                      <span className="text-xl font-bold">{deck.stats.retention}%</span>
                    </ProgressRing>
                    <span className="mt-2 text-sm text-muted-foreground">Retention</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-[100px] w-[100px] rounded-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold">{deck.stats.averageTime}</div>
                        <div className="text-xs text-muted-foreground">per card</div>
                      </div>
                    </div>
                    <span className="mt-2 text-sm text-muted-foreground">Avg. Time</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-[100px] w-[100px] rounded-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold">{deck.stats.totalStudyTime}</div>
                      </div>
                    </div>
                    <span className="mt-2 text-sm text-muted-foreground">Total Time</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Study Activity</h3>
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium">Cards Studied This Week</h4>
                      <span className="text-sm text-muted-foreground">
                        {deck.stats.lastWeekCards.reduce((a, b) => a + b, 0)} cards
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                        <div key={i} className="text-center">
                          <div className="text-xs text-muted-foreground mb-1">{day}</div>
                          <div className="h-32 bg-muted rounded-md flex flex-col items-center justify-end p-2">
                            <div
                              className="w-full bg-gradient-primary rounded-sm"
                              style={{
                                height: `${Math.min(100, (deck.stats.lastWeekCards[i] / 20) * 100)}%`,
                                opacity: deck.stats.lastWeekCards[i] > 0 ? 1 : 0.3,
                              }}
                            />
                            <div className="text-sm font-medium mt-2">{deck.stats.lastWeekCards[i]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Learning Curve</CardTitle>
                  <CardDescription>Your progress over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed learning analytics will appear here</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Difficulty Distribution</CardTitle>
                  <CardDescription>Card difficulty based on your performance</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Difficulty distribution chart will appear here</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Deck Settings</CardTitle>
                <CardDescription>Customize your study experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Study Options</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cards-per-session">Cards per session</Label>
                      <Select defaultValue={deck.settings.cardsPerSession.toString()}>
                        <SelectTrigger id="cards-per-session">
                          <SelectValue placeholder="Select number of cards" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 cards</SelectItem>
                          <SelectItem value="15">15 cards</SelectItem>
                          <SelectItem value="20">20 cards</SelectItem>
                          <SelectItem value="25">25 cards</SelectItem>
                          <SelectItem value="30">30 cards</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="review-mode">Review mode</Label>
                      <Select defaultValue={deck.settings.reviewMode}>
                        <SelectTrigger id="review-mode">
                          <SelectValue placeholder="Select review mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spaced Repetition">Spaced Repetition</SelectItem>
                          <SelectItem value="Standard">Standard</SelectItem>
                          <SelectItem value="Cramming">Cramming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="card-order">Card order</Label>
                      <Select defaultValue={deck.settings.cardOrder}>
                        <SelectTrigger id="card-order">
                          <SelectValue placeholder="Select card order" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Smart">Smart (Difficulty-based)</SelectItem>
                          <SelectItem value="Random">Random</SelectItem>
                          <SelectItem value="Sequential">Sequential</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="flip-timer">Auto-flip timer</Label>
                      <Select defaultValue={deck.settings.autoFlip ? deck.settings.flipTimer.toString() : "0"}>
                        <SelectTrigger id="flip-timer">
                          <SelectValue placeholder="Select timer duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Off</SelectItem>
                          <SelectItem value="5">5 seconds</SelectItem>
                          <SelectItem value="10">10 seconds</SelectItem>
                          <SelectItem value="15">15 seconds</SelectItem>
                          <SelectItem value="30">30 seconds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Deck Organization</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="folder">Folder</Label>
                      <Select defaultValue={deck.folder}>
                        <SelectTrigger id="folder">
                          <SelectValue placeholder="Select folder" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tech">Tech</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Languages">Languages</SelectItem>
                          <SelectItem value="General Knowledge">General Knowledge</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select defaultValue={deck.category}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Programming">Programming</SelectItem>
                          <SelectItem value="Language">Language</SelectItem>
                          <SelectItem value="Career">Career</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Medicine">Medicine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  Cancel
                </Button>
                <GradientButton>Save Changes</GradientButton>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
