"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Folder, SearchIcon, Tag } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  // Mock data for search results
  const mockResults = {
    decks: [
      {
        id: "1",
        title: "JavaScript Fundamentals",
        description: "Core concepts of JavaScript programming",
        cardCount: 42,
        category: "Programming",
      },
      {
        id: "2",
        title: "React Hooks",
        description: "Modern React state management",
        cardCount: 23,
        category: "Programming",
      },
    ],
    cards: [
      {
        id: "1-1",
        question: "What is a closure in JavaScript?",
        answer:
          "A closure is the combination of a function bundled together with references to its surrounding state...",
        deckId: "1",
        deckTitle: "JavaScript Fundamentals",
      },
      {
        id: "1-2",
        question: "Explain the difference between let, const, and var.",
        answer: "var: Function-scoped, can be redeclared and updated...",
        deckId: "1",
        deckTitle: "JavaScript Fundamentals",
      },
      {
        id: "2-1",
        question: "What is useState hook?",
        answer: "useState is a Hook that lets you add React state to function components...",
        deckId: "2",
        deckTitle: "React Hooks",
      },
    ],
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      // Filter results based on search query
      const filteredDecks = mockResults.decks.filter(
        (deck) =>
          deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deck.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      const filteredCards = mockResults.cards.filter(
        (card) =>
          card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setSearchResults({
        decks: filteredDecks,
        cards: filteredCards,
      })
      setHasSearched(true)
    } else {
      setSearchResults({ decks: [], cards: [] })
      setHasSearched(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl animate-slide-up">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
          <p className="text-muted-foreground">Find decks and cards across your collection</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <SearchIcon
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Search for decks, cards, or content..."
                className="pl-12 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>

          {hasSearched && (
            <div>
              {searchResults.decks.length === 0 && searchResults.cards.length === 0 ? (
                <div className="text-center py-12">
                  <div className="rounded-full bg-muted p-3 inline-flex mb-4">
                    <SearchIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-medium mb-2">No results found</h2>
                  <p className="text-muted-foreground">We couldn't find anything matching "{searchQuery}"</p>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">
                      {searchResults.decks.length + searchResults.cards.length} results for "{searchQuery}"
                    </h2>
                  </div>

                  <Tabs defaultValue="all">
                    <TabsList className="mb-6">
                      <TabsTrigger value="all">All Results</TabsTrigger>
                      <TabsTrigger value="decks">Decks ({searchResults.decks.length})</TabsTrigger>
                      <TabsTrigger value="cards">Cards ({searchResults.cards.length})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-6">
                      {searchResults.decks.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-3">Decks</h3>
                          <div className="space-y-3">
                            {searchResults.decks.map((deck) => (
                              <Card
                                key={deck.id}
                                className="shadow-card hover:shadow-card-hover transition-all duration-300"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="rounded-md bg-primary/10 p-2 mt-1">
                                      <Folder className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex justify-between items-start">
                                        <div>
                                          <h4 className="font-medium">{deck.title}</h4>
                                          <p className="text-sm text-muted-foreground">{deck.description}</p>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                          {deck.category}
                                        </span>
                                      </div>
                                      <div className="text-xs text-muted-foreground mt-2">{deck.cardCount} cards</div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {searchResults.cards.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-3">Cards</h3>
                          <div className="space-y-3">
                            {searchResults.cards.map((card) => (
                              <Card
                                key={card.id}
                                className="shadow-card hover:shadow-card-hover transition-all duration-300"
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="rounded-md bg-primary/10 p-2 mt-1">
                                      <BookOpen className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{card.question}</h4>
                                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{card.answer}</p>
                                      <div className="flex items-center gap-2 mt-2">
                                        <Tag className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">{card.deckTitle}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="decks">
                      {searchResults.decks.length > 0 ? (
                        <div className="space-y-3">
                          {searchResults.decks.map((deck) => (
                            <Card
                              key={deck.id}
                              className="shadow-card hover:shadow-card-hover transition-all duration-300"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="rounded-md bg-primary/10 p-2 mt-1">
                                    <Folder className="h-5 w-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="font-medium">{deck.title}</h4>
                                        <p className="text-sm text-muted-foreground">{deck.description}</p>
                                      </div>
                                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                                        {deck.category}
                                      </span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-2">{deck.cardCount} cards</div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No decks found matching your search</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="cards">
                      {searchResults.cards.length > 0 ? (
                        <div className="space-y-3">
                          {searchResults.cards.map((card) => (
                            <Card
                              key={card.id}
                              className="shadow-card hover:shadow-card-hover transition-all duration-300"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="rounded-md bg-primary/10 p-2 mt-1">
                                    <BookOpen className="h-5 w-5 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{card.question}</h4>
                                    <p className="text-sm text-muted-foreground mt-1">{card.answer}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <Tag className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-xs text-muted-foreground">{card.deckTitle}</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No cards found matching your search</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="text-center py-12">
              <div className="rounded-full bg-muted p-3 inline-flex mb-4">
                <SearchIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Search for anything</h2>
              <p className="text-muted-foreground">Find decks, cards, or specific content across your collection</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
