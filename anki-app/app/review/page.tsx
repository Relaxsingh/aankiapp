"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function OmniReviewPage() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(true)

  const handleStartReview = () => {
    setIsDialogOpen(false)
    // In a real app, this would start the review with the selected settings
  }

  return (
    <MainLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">OmniReview</h1>

        <p className="text-muted-foreground mb-6">
          OmniReview allows you to review cards from multiple decks in a single session. Configure your settings and
          start reviewing.
        </p>

        <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
          Configure OmniReview
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>OmniReview</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Decks</h3>

              <div className="space-y-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="recency">Recency Cutoff</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="recency">
                      <SelectValue placeholder="Select recency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Select decks reviewed since</p>
                </div>

                <div className="flex justify-between items-center">
                  <Label htmlFor="decks">Decks</Label>
                  <span className="text-sm">1/1</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Settings</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <Label htmlFor="cardsPerSession">Cards per Session</Label>
                  </div>
                  <Select defaultValue="10">
                    <SelectTrigger id="cardsPerSession" className="w-20">
                      <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <Label htmlFor="fontSize">Font Size</Label>
                  </div>
                  <Select defaultValue="24px">
                    <SelectTrigger id="fontSize" className="w-20">
                      <SelectValue placeholder="24px" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16px">16px</SelectItem>
                      <SelectItem value="20px">20px</SelectItem>
                      <SelectItem value="24px">24px</SelectItem>
                      <SelectItem value="28px">28px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <Label htmlFor="autoFlip">Auto-flip Timer</Label>
                  </div>
                  <Select defaultValue="off">
                    <SelectTrigger id="autoFlip" className="w-20">
                      <SelectValue placeholder="Off" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="off">Off</SelectItem>
                      <SelectItem value="5s">5s</SelectItem>
                      <SelectItem value="10s">10s</SelectItem>
                      <SelectItem value="30s">30s</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <Label htmlFor="reviewMode">Review Mode</Label>
                  </div>
                  <Select defaultValue="srs">
                    <SelectTrigger id="reviewMode" className="w-40">
                      <SelectValue placeholder="AnkiApp Advanced SRS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="srs">AnkiApp Advanced SRS</SelectItem>
                      <SelectItem value="random">Random</SelectItem>
                      <SelectItem value="sequential">Sequential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <Label htmlFor="cardOrientation">Card Orientation</Label>
                  </div>
                  <Select defaultValue="normal">
                    <SelectTrigger id="cardOrientation" className="w-28">
                      <SelectValue placeholder="Normal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="reversed">Reversed</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <Label htmlFor="flipStabilization">Flip Stabilization</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="flipStabilization" className="text-sm">
                      On
                    </Label>
                    <Switch id="flipStabilization" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button className="w-full" onClick={handleStartReview}>
              Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  )
}
