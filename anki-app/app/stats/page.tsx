"use client"

import { MainLayout } from "@/components/main-layout"
import { Award } from "lucide-react"

export default function StatsPage() {
  // Mock data for the calendar heatmap
  const generateCalendarData = () => {
    const days = []
    for (let i = 0; i < 35; i++) {
      // Random value between 0 and 3
      const value = Math.floor(Math.random() * 4)
      days.push(value)
    }
    return days
  }

  const marchData = generateCalendarData()
  const aprilData = generateCalendarData()

  // Highlight a couple of days in April
  aprilData[17] = 4 // Highlighted
  aprilData[18] = 4 // Highlighted

  return (
    <MainLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Stats</h1>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span>Reviews Today</span>
              <span>0</span>
            </div>
            <div className="flex justify-between">
              <span>Reviews per Day (Average)</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span>Total Number of Reviews</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span>Streak (Days)</span>
              <span>0</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl mb-2">Reviews</h2>
            <div className="flex justify-between mb-2">
              {["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Today"].map((day, i) => (
                <div key={i} className="text-center text-xs text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="h-2 w-full bg-secondary rounded-full">
              <div className="h-full w-0 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg mb-2">
                March <span className="text-muted-foreground">2025</span>
              </h3>
              <div className="calendar-grid">
                {marchData.map((value, i) => (
                  <div
                    key={i}
                    className={`calendar-day ${
                      value === 0
                        ? "bg-secondary/30"
                        : value === 1
                          ? "bg-primary/30"
                          : value === 2
                            ? "bg-primary/60"
                            : "bg-primary"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-2">
                April <span className="text-muted-foreground">2025</span>
              </h3>
              <div className="calendar-grid">
                {aprilData.map((value, i) => (
                  <div
                    key={i}
                    className={`calendar-day ${
                      value === 0
                        ? "bg-secondary/30"
                        : value === 1
                          ? "bg-primary/30"
                          : value === 2
                            ? "bg-primary/60"
                            : value === 3
                              ? "bg-primary"
                              : "bg-yellow-400"
                    } ${i === 18 ? "border border-dashed border-primary" : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl mb-3">Milestones</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-green-500" />
                  <span>First Responder</span>
                </div>
                <span className="text-muted-foreground">April 22, 2025</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-blue-500" />
                  <span>Card Creator</span>
                </div>
                <span className="text-muted-foreground">April 21, 2025</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award size={20} className="text-purple-500" />
                  <span>Deck Creator</span>
                </div>
                <span className="text-muted-foreground">April 21, 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
