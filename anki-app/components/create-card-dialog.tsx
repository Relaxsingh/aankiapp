"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Plus, ImageIcon } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CreateCardDialogProps {
  deckId: string
  onCardCreated?: () => void
}

export function CreateCardDialog({ deckId, onCardCreated }: CreateCardDialogProps) {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would save the card to the database
    console.log("Creating card:", { deckId, question, answer, notes, tags })

    // Reset form and close dialog
    setQuestion("")
    setAnswer("")
    setNotes("")
    setTags("")
    setOpen(false)

    // Notify parent component
    if (onCardCreated) {
      onCardCreated()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <GradientButton className="fixed bottom-20 right-4 rounded-full w-12 h-12 p-0 shadow-lg">
          <Plus size={24} />
        </GradientButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Card</DialogTitle>
            <DialogDescription>Add a new flashcard to your deck.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Front Side (Question)</Label>
                  <Textarea
                    id="question"
                    placeholder="Enter the question or front side of the card"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Back Side (Answer)</Label>
                  <Textarea
                    id="answer"
                    placeholder="Enter the answer or back side of the card"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    className="min-h-[150px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes or context (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Add tags separated by commas (optional)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Media</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag and drop an image or click to upload</p>
                    <Button variant="outline" size="sm" type="button">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <GradientButton type="submit">Create Card</GradientButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
