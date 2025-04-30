"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, BookOpen, Calendar, Clock, LineChart, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's an overview of your learning progress.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-none bg-gradient-to-br from-violet-500/10 to-indigo-500/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cards Due Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">42</div>
                <div className="flex items-center text-sm text-emerald-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+12%</span>
                </div>
              </div>
              <Progress value={42} max={100} className="mt-2 h-1.5" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none bg-gradient-to-br from-emerald-500/10 to-teal-500/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Retention Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">87%</div>
                <div className="flex items-center text-sm text-emerald-500">
                  <TrendingUp className="mr-1 h-4 w-4" />
                  <span>+3%</span>
                </div>
              </div>
              <Progress value={87} max={100} className="mt-2 h-1.5" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">14 days</div>
                <div className="flex items-center text-sm text-emerald-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>Best: 21</span>
                </div>
              </div>
              <Progress value={14} max={21} className="mt-2 h-1.5" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-500/10 to-cyan-500/10 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold">12.5 hrs</div>
                <div className="flex items-center text-sm text-emerald-500">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>This week</span>
                </div>
              </div>
              <Progress value={12.5} max={20} className="mt-2 h-1.5" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>Your learning activity over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="h-[240px] w-full rounded-md bg-gradient-to-r from-violet-500/5 to-indigo-500/5 p-4">
                <div className="flex h-full w-full items-end justify-between gap-2">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 80) + 20
                    return (
                      <div key={i} className="group relative flex w-full cursor-pointer flex-col items-center">
                        <div
                          className="w-full rounded-t-sm bg-gradient-to-b from-violet-500 to-indigo-600 transition-all group-hover:from-violet-400 group-hover:to-indigo-500"
                          style={{ height: `${height}%` }}
                        />
                        <div className="absolute -top-8 hidden rounded bg-popover px-2 py-1 text-xs font-medium group-hover:block">
                          {Math.floor(height / 10)} cards
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <LineChart className="mr-2 h-4 w-4" />
                Detailed Analytics
              </Button>
              <Button variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Recent Decks</CardTitle>
              <CardDescription>Your recently studied decks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Spanish Vocabulary", progress: 68, cards: 120, due: 18 },
                  { name: "Medical Terminology", progress: 42, cards: 85, due: 24 },
                  { name: "JavaScript Concepts", progress: 91, cards: 64, due: 5 },
                ].map((deck, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{deck.name}</h4>
                        <span className="text-xs text-muted-foreground">{deck.due} due</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Progress value={deck.progress} max={100} className="h-1.5" />
                        <span className="text-xs text-muted-foreground">{deck.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/decks">View All Decks</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Learning Schedule</CardTitle>
              <CardDescription>Upcoming review sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "Today", title: "Spanish Vocabulary", cards: 18 },
                  { time: "Tomorrow", title: "Medical Terminology", cards: 24 },
                  { time: "In 2 days", title: "JavaScript Concepts", cards: 5 },
                ].map((session, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 to-orange-600 text-white">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{session.title}</h4>
                        <span className="text-xs text-muted-foreground">{session.cards} cards</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
              <CardDescription>Your learning milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "7-Day Streak", progress: 100, description: "Study every day for a week" },
                  { name: "Card Master", progress: 65, description: "Review 1,000 cards" },
                  { name: "Perfect Recall", progress: 30, description: "90% retention for 30 days" },
                ].map((achievement, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{achievement.name}</h4>
                      <span className="text-xs font-medium">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} max={100} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Achievements
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Learning Community</CardTitle>
              <CardDescription>Connect with other learners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Language Learning", members: 1240, active: 42 },
                  { name: "Medical Students", members: 856, active: 28 },
                  { name: "Programming", members: 1120, active: 36 },
                ].map((group, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{group.name}</h4>
                        <span className="text-xs text-emerald-500">{group.active} online</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{group.members} members</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Browse Communities
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
