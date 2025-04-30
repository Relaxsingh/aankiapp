"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, MoreVertical } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Card {
  id: string
  question: string
  answer: string
  notes?: string
}

// Mock data
const MOCK_CARDS: Card[] = [
  {
    id: "1",
    question: "How do you prioritize tasks when dealing with urgent requests from multiple clients?",
    answer: `• Impact vs. urgency scoring
• Check dependencies/resources
• Communicate realistic timelines immediately
• Use buffer slots & delegate where possible
• Post-mortem to prevent repeat fire-drills

"Handling multiple urgent client requests requires a strategic approach. I like to begin by assessing the urgency and impact of each request. If a client's issue could potentially affect their business operations or revenue significantly, that request takes precedence. I then look at deadlines and consider any dependencies, like whether one task needs to be completed before another can start.

Communication is key, so I make sure to keep all clients informed about timelines and any adjustments I might need to make. I also reserve a little buffer time in my schedule for unexpected requests. It's a bit like a triage system in an emergency room – addressing the most critical issues first while ensuring everyone gets the attention they need."`,
  },
  {
    id: "2",
    question: "Describe a situation where you had to adapt to a significant change at work.",
    answer:
      "When our company transitioned to a remote-first model during the pandemic, I had to quickly adapt my team management style. I implemented daily stand-ups via video calls, created digital collaboration spaces, and established clear communication protocols. This resulted in maintaining team productivity and even improving some workflows through new digital tools we adopted.",
  },
  {
    id: "3",
    question: "How do you handle constructive criticism?",
    answer:
      "I view constructive criticism as an opportunity for growth. When receiving feedback, I listen actively without becoming defensive, ask clarifying questions to fully understand the perspective, and then develop an action plan to address the areas for improvement. I follow up with the person who provided the feedback to show my progress and commitment to development.",
  },
]

export default function ReviewPage() {
  const params = useParams()
  const router = useRouter()
  const deckId = params.id as string

  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [cards, setCards] = useState<Card[]>(MOCK_CARDS)

  const currentCard = cards[currentCardIndex]

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleRating = (rating: "fail" | "hard" | "good" | "easy") => {
    // In a real app, this would update the SRS algorithm
    // For now, just move to the next card
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    } else {
      // Review completed
      router.push(`/decks/${deckId}`)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <header className="border-b border-border p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ChevronLeft size={20} />
          </Button>
          <h1 className="text-lg font-medium flex-1">Review</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Card</DropdownMenuItem>
              <DropdownMenuItem>Flag Card</DropdownMenuItem>
              <DropdownMenuItem>Skip Card</DropdownMenuItem>
              <DropdownMenuItem>End Review</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="p-2 text-center text-sm text-muted-foreground border-b border-border">
          {currentCard ? `GAM MM Interview Prep` : ""}
        </div>

        <div className="flex-1 overflow-auto">
          <div className={`flip-card h-full ${isFlipped ? "flipped" : ""}`}>
            <div className="flip-card-inner h-full">
              <div className="flip-card-front h-full p-6 flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-xl">{currentCard?.question}</div>
                </div>
              </div>

              <div className="flip-card-back h-full p-6 overflow-auto">
                <div className="text-xl mb-4 text-center">{currentCard?.question}</div>
                <div className="border-t border-border pt-4 whitespace-pre-line">{currentCard?.answer}</div>
              </div>
            </div>
          </div>
        </div>

        {!isFlipped ? (
          <div className="p-4 border-t border-border">
            <Button className="w-full" onClick={handleFlip}>
              Flip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-4 border-t border-border">
            <Button
              variant="ghost"
              className="py-4 rounded-none text-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => handleRating("fail")}
            >
              Fail
            </Button>
            <Button
              variant="ghost"
              className="py-4 rounded-none text-orange-500 hover:bg-orange-500 hover:text-white"
              onClick={() => handleRating("hard")}
            >
              Hard
            </Button>
            <Button
              variant="ghost"
              className="py-4 rounded-none text-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => handleRating("good")}
            >
              Good
            </Button>
            <Button
              variant="ghost"
              className="py-4 rounded-none text-green-500 hover:bg-green-500 hover:text-white"
              onClick={() => handleRating("easy")}
            >
              Easy
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
