"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { HabitTemplates } from "@/components/ui/HabitTemplates"
import { useHabitsStore } from "@/lib/habits-store"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface HabitTemplate {
  id: string
  title: string
  description: string
  category: "fitness" | "mindfulness" | "nutrition" | "sleep"
  emoji: string
  popular?: boolean
}

export default function HabitTemplatesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<HabitTemplate | null>(null)
  const router = useRouter()
  const { createHabit } = useHabitsStore()

  const handleSelectTemplate = (template: HabitTemplate) => {
    setSelectedTemplate(template)
  }

  const handleCreateFromTemplate = async () => {
    if (!selectedTemplate) return

    setIsLoading(true)

    try {
      const { error } = await createHabit({
        title: selectedTemplate.title,
        description: selectedTemplate.description,
        category: selectedTemplate.category,
        emoji: selectedTemplate.emoji,
      })

      if (error) {
        console.error("Error creating habit:", error)
        alert("Failed to create habit. Please try again.")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error creating habit:", error)
      alert("Failed to create habit. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/habits/new">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Create Habit
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Habit Templates</h1>
        <p className="text-muted-foreground">
          Choose from our curated collection of proven habits to get started quickly
        </p>
      </div>

      {selectedTemplate ? (
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <span className="text-2xl">{selectedTemplate.emoji}</span>
                <span>Selected: {selectedTemplate.title}</span>
              </CardTitle>
              <CardDescription>{selectedTemplate.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Choose Different
                </Button>
                <Button onClick={handleCreateFromTemplate} isLoading={isLoading}>
                  Create This Habit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <HabitTemplates onSelectTemplate={handleSelectTemplate} />

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Don't see what you're looking for?</p>
        <Button variant="outline" asChild>
          <Link href="/habits/new">Create Custom Habit</Link>
        </Button>
      </div>
    </div>
  )
}
