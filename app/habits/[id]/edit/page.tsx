"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useHabitsStore } from "@/lib/habits-store"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const habitSchema = z.object({
  title: z.string().min(1, "Habit title is required").max(50, "Title must be 50 characters or less"),
  description: z.string().max(200, "Description must be 200 characters or less").optional(),
  category: z.enum(["fitness", "mindfulness", "nutrition", "sleep"], {
    required_error: "Please select a category",
  }),
  emoji: z.string().min(1, "Please select an emoji"),
})

type HabitForm = z.infer<typeof habitSchema>

const categories = [
  {
    id: "fitness" as const,
    label: "Fitness",
    description: "Physical exercise and movement",
    emoji: "💪",
  },
  {
    id: "mindfulness" as const,
    label: "Mindfulness",
    description: "Mental wellness and meditation",
    emoji: "🧘",
  },
  {
    id: "nutrition" as const,
    label: "Nutrition",
    description: "Healthy eating and hydration",
    emoji: "🥗",
  },
  {
    id: "sleep" as const,
    label: "Sleep",
    description: "Rest and recovery",
    emoji: "😴",
  },
]

const emojiOptions = [
  "⭐",
  "🎯",
  "💪",
  "🧘",
  "🥗",
  "😴",
  "📚",
  "💧",
  "🚶",
  "🏃",
  "🧠",
  "❤️",
  "🌱",
  "🔥",
  "✨",
  "🎨",
  "🎵",
  "📝",
  "🌅",
  "🌙",
  "🍎",
  "🥕",
  "🥤",
  "🏋️",
  "🤸",
  "🧘‍♀️",
  "🛌",
  "📖",
  "✍️",
  "🎪",
]

interface EditHabitPageProps {
  params: {
    id: string
  }
}

export default function EditHabitPage({ params }: EditHabitPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [habitLoading, setHabitLoading] = useState(true)
  const router = useRouter()
  const { habits, fetchHabits, updateHabit } = useHabitsStore()

  const habit = habits.find((h) => h.id === params.id)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm<HabitForm>({
    resolver: zodResolver(habitSchema),
  })

  const selectedCategory = watch("category")
  const selectedEmoji = watch("emoji")

  useEffect(() => {
    const loadHabit = async () => {
      if (habits.length === 0) {
        await fetchHabits()
      }
      setHabitLoading(false)
    }
    loadHabit()
  }, [habits.length, fetchHabits])

  useEffect(() => {
    if (habit) {
      reset({
        title: habit.title,
        description: habit.description || "",
        category: habit.category,
        emoji: habit.emoji,
      })
    }
  }, [habit, reset])

  const onSubmit = async (data: HabitForm) => {
    if (!habit) return

    setIsLoading(true)

    try {
      const { error } = await updateHabit(habit.id, {
        title: data.title,
        description: data.description || "",
        category: data.category,
        emoji: data.emoji,
      })

      if (error) {
        setError("root", {
          message: error.message || "Failed to update habit. Please try again.",
        })
      } else {
        router.push("/habits")
      }
    } catch (error: any) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (habitLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="max-w-2xl mx-auto">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!habit) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Habit Not Found</h1>
          <p className="text-muted-foreground mb-6">The habit you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/habits">Back to Habits</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/habits">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Habits
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Edit Habit</CardTitle>
            <CardDescription>Update your habit details and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Habit Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Habit Title *
                </label>
                <Input
                  id="title"
                  placeholder="e.g., Morning meditation, Evening walk"
                  error={!!errors.title}
                  {...register("title")}
                />
                {errors.title && <p className="text-sm text-error">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Add more details about your habit..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  {...register("description")}
                />
                {errors.description && <p className="text-sm text-error">{errors.description.message}</p>}
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Category *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                        selectedCategory === category.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setValue("category", category.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{category.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-medium">{category.label}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedCategory === category.id ? "bg-primary border-primary" : "border-gray-300"
                          }`}
                        />
                      </div>
                      <input type="radio" value={category.id} className="sr-only" {...register("category")} />
                    </div>
                  ))}
                </div>
                {errors.category && <p className="text-sm text-error">{errors.category.message}</p>}
              </div>

              {/* Emoji Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Choose an Emoji *</label>
                <div className="grid grid-cols-10 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`aspect-square rounded-lg border-2 text-xl transition-all hover:shadow-md ${
                        selectedEmoji === emoji
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setValue("emoji", emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                {errors.emoji && <p className="text-sm text-error">{errors.emoji.message}</p>}
              </div>

              {/* Preview */}
              {watch("title") && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preview</label>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border bg-gray-50">
                    <span className="text-lg">{selectedEmoji}</span>
                    <div className="flex-1">
                      <h3 className="font-medium">{watch("title")}</h3>
                      {watch("description") && <p className="text-sm text-muted-foreground">{watch("description")}</p>}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{habit.streak || 0} day streak</div>
                      <div className="text-xs text-muted-foreground capitalize">{selectedCategory}</div>
                    </div>
                  </div>
                </div>
              )}

              {errors.root && <p className="text-sm text-error text-center">{errors.root.message}</p>}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/habits">Cancel</Link>
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  Update Habit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
