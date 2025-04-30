"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { ProgressRing } from "@/components/ui/progress-ring"
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flag,
  MoreHorizontal,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Volume2,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
    settings: {
      cardsPerSession: 20,
      reviewMode: "Spaced Repetition",
      cardOrder: "Smart",
      autoFlip: false,
      flipTimer: 0,
    },
  },
}

export default function StudyPage() {
  const params = useParams()
  const router = useRouter()
  const deckId = params.id as string

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [studyProgress, setStudyProgress] = useState(0)
  const [studyTime, setStudyTime] = useState(0)
  const [startTime, setStartTime] = useState(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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

  const cards = deck.cards
  const currentCard = cards[currentCardIndex]
  const totalCards = cards.length

  // Update study progress
  useEffect(() => {
    setStudyProgress((currentCardIndex / totalCards) * 100)
  }, [currentCardIndex, totalCards])

  // Timer for study session
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    const startTimer = () => {
      setStartTime(Date.now() - studyTime * 1000)
      intervalId = setInterval(() => {
        setStudyTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }

    const stopTimer = () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }

    if (!isPaused) {
      startTimer()
    } else {
      stopTimer()
    }

    return () => {
      stopTimer()
    }
  }, [isPaused, startTime, studyTime])

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleNextCard = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    } else {
      setIsCompleteDialogOpen(true)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleRating = (rating: "again" | "hard" | "good" | "easy") => {
    // In a real app, this would update the SRS algorithm
    handleNextCard()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl h-[calc(100vh-4rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{deck.title}</h1>
              <p className="text-sm text-muted-foreground">Studying {totalCards} cards</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={togglePause}>
              {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
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
                  <span>Study Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Flag Card</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.back()}>
                  <X className="mr-2 h-4 w-4" />
                  <span>End Session</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>
              {currentCardIndex + 1} of {totalCards} cards
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all duration-300"
              style={{ width: `${studyProgress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex-1 flex flex-col">
          <div className={`flip-card flex-1 ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-card-inner h-full">
              {/* Front of card */}
              <div className="flip-card-front h-full">
                <Card className="h-full flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="max-w-2xl text-center">
                      <h2 className="text-2xl font-medium">{currentCard.question}</h2>
                    </div>
                  </div>
                  <div className="p-4 border-t flex justify-between items-center">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Volume2 className="h-4 w-4 mr-1" />
                      Speak
                    </Button>
                    <GradientButton onClick={handleFlip}>Show Answer</GradientButton>
                  </div>
                </Card>
              </div>

              {/* Back of card */}
              <div className="flip-card-back h-full">
                <Card className="h-full flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-medium mb-2">{currentCard.question}</h2>
                  </div>
                  <div className="flex-1 p-6 overflow-auto">
                    <div className="max-w-2xl mx-auto">
                      <p className="whitespace-pre-line">{currentCard.answer}</p>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-4 gap-2">
                      <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => handleRating("again")}>
                        Again
                      </Button>
                      <Button
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={() => handleRating("hard")}
                      >
                        Hard
                      </Button>
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => handleRating("good")}
                      >
                        Good
                      </Button>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => handleRating("easy")}>
                        Easy
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handlePrevCard} disabled={currentCardIndex === 0} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Study time: {formatTime(studyTime)}</span>
            </div>
            <Button variant="outline" onClick={handleNextCard} className="gap-2">
              Skip
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Session complete dialog */}
        <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Study Session Complete!</DialogTitle>
              <DialogDescription>You've completed your study session for {deck.title}.</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center py-6">
              <div className="mb-4">
                <ProgressRing progress={100} size={120} strokeWidth={8} color="stroke-green-500">
                  <CheckCircle2 className="h-10 w-10 text-green-500" />
                </ProgressRing>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-1">Great job!</h3>
                <p className="text-muted-foreground">
                  You studied {totalCards} cards in {formatTime(studyTime)}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{totalCards}</div>
                  <div className="text-sm text-muted-foreground">Cards Reviewed</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{formatTime(studyTime)}</div>
                  <div className="text-sm text-muted-foreground">Study Time</div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="sm:flex-1 gap-2"
                onClick={() => {
                  setCurrentCardIndex(0)
                  setIsFlipped(false)
                  setIsCompleteDialogOpen(false)
                  setStartTime(Date.now())
                  setStudyTime(0)
                }}
              >
                <RotateCcw className="h-4 w-4" />
                Study Again
              </Button>
              <GradientButton className="sm:flex-1" onClick={() => router.push(`/decks/${deckId}`)}>
                Back to Deck
              </GradientButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
