"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { ProgressRing } from "@/components/ui/progress-ring"
import { BarChart2, BookOpen, Brain, CheckCircle2, Clock, Flame, PieChart, TrendingUp } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")

  // Mock data for analytics
  const analyticsData = {
    totalCards: 248,
    cardsStudied: 1432,
    studyStreak: 5,
    retentionRate: 87,
    studyTime: "12.5 hours",
    averageAccuracy: 82,
    lastWeekCards: [12, 8, 15, 0, 5, 10, 7],
    decks: [
      {
        id: "1",
        title: "JavaScript Fundamentals",
        progress: 68,
        cardsStudied: 420,
        accuracy: 78,
      },
      {
        id: "2",
        title: "React Hooks",
        progress: 75,
        cardsStudied: 320,
        accuracy: 85,
      },
      {
        id: "3",
        title: "Interview Prep",
        progress: 45,
        cardsStudied: 380,
        accuracy: 65,
      },
      {
        id: "4",
        title: "Spanish Vocabulary",
        progress: 32,
        cardsStudied: 312,
        accuracy: 72,
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="container py-8 max-w-7xl animate-slide-up">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 3 months</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-muted-foreground">Track your learning progress and performance</p>
        </div>

        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Cards"
            value={analyticsData.totalCards}
            icon={<BookOpen className="h-5 w-5" />}
            description="Across all decks"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Cards Studied"
            value={analyticsData.cardsStudied}
            icon={<CheckCircle2 className="h-5 w-5" />}
            description="Lifetime reviews"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Study Streak"
            value={`${analyticsData.studyStreak} days`}
            icon={<Flame className="h-5 w-5" />}
            description="Best streak: 14 days"
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard
            title="Retention Rate"
            value={`${analyticsData.retentionRate}%`}
            icon={<Brain className="h-5 w-5" />}
            description="Last 7 days"
            trend={{ value: 3, isPositive: true }}
            valueClassName="gradient-text"
          />
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="decks">Decks</TabsTrigger>
            <TabsTrigger value="time">Study Time</TabsTrigger>
            <TabsTrigger value="retention">Retention</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-primary" />
                    Study Activity
                  </CardTitle>
                  <CardDescription>Cards studied over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-medium">Cards Studied This Week</h4>
                      <span className="text-sm text-muted-foreground">
                        {analyticsData.lastWeekCards.reduce((a, b) => a + b, 0)} cards
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
                                height: `${Math.min(100, (analyticsData.lastWeekCards[i] / 20) * 100)}%`,
                                opacity: analyticsData.lastWeekCards[i] > 0 ? 1 : 0.3,
                              }}
                            />
                            <div className="text-sm font-medium mt-2">{analyticsData.lastWeekCards[i]}</div>
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
                    <PieChart className="h-5 w-5 text-primary" />
                    Performance Breakdown
                  </CardTitle>
                  <CardDescription>Your learning efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <ProgressRing progress={analyticsData.averageAccuracy} size={180} strokeWidth={12} className="mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{analyticsData.averageAccuracy}%</div>
                        <div className="text-xs text-muted-foreground">Accuracy</div>
                      </div>
                    </ProgressRing>

                    <div className="w-full space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Correct on first try</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Needed review</span>
                          <span>15%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: "15%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Difficult cards</span>
                          <span>7%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: "7%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>Your improvement over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Learning progress chart will appear here</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Study Habits
                  </CardTitle>
                  <CardDescription>When you study the most</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Study habits chart will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="decks" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Deck Performance</CardTitle>
                <CardDescription>How you're performing across different decks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analyticsData.decks.map((deck) => (
                    <div key={deck.id} className="flex items-center">
                      <div className="mr-4">
                        <ProgressRing progress={deck.progress} size={60} strokeWidth={4}>
                          <span className="text-sm font-medium">{deck.progress}%</span>
                        </ProgressRing>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{deck.title}</h3>
                          <span className="text-sm font-medium">{deck.cardsStudied} cards</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-gradient-primary rounded-full"
                            style={{ width: `${deck.progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Mastery: {deck.progress}%</span>
                          <span>Accuracy: {deck.accuracy}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Most Studied Decks</CardTitle>
                  <CardDescription>Where you spend most of your time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Most studied decks chart will appear here</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Deck Difficulty</CardTitle>
                  <CardDescription>Which decks you find most challenging</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Deck difficulty chart will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="time" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Study Time Analysis</CardTitle>
                <CardDescription>How much time you spend studying</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">{analyticsData.studyTime}</div>
                    <div className="text-sm text-muted-foreground">Total Study Time</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">1.8 min</div>
                    <div className="text-sm text-muted-foreground">Avg. Time per Card</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold mb-1">22 min</div>
                    <div className="text-sm text-muted-foreground">Avg. Session Length</div>
                  </div>
                </div>

                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Study time chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Daily Study Pattern</CardTitle>
                  <CardDescription>When you study during the day</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Daily study pattern chart will appear here</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Study Pattern</CardTitle>
                  <CardDescription>Which days you study the most</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Weekly study pattern chart will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="retention" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Memory Retention</CardTitle>
                <CardDescription>How well you remember cards over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <ProgressRing progress={analyticsData.retentionRate} size={180} strokeWidth={12} className="mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{analyticsData.retentionRate}%</div>
                      <div className="text-xs text-muted-foreground">Retention</div>
                    </div>
                  </ProgressRing>

                  <p className="text-sm text-muted-foreground max-w-md text-center">
                    Your retention rate measures how well you remember cards after they've been reviewed. A higher
                    percentage means better long-term memory.
                  </p>
                </div>

                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Retention over time chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Forgetting Curve</CardTitle>
                  <CardDescription>How your memory decays over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Forgetting curve chart will appear here</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Spaced Repetition Effectiveness</CardTitle>
                  <CardDescription>Impact of review intervals on retention</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Spaced repetition chart will appear here</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
