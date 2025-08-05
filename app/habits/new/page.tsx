"use client"

import { useState } from "react"
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
    color: "bg-red-50 border-red-200 text-red-800",
  },
  {
    id: "mindfulness" as const,
    label: "Mindfulness",
    description: "Mental wellness and meditation",
    emoji: "🧘",
    color: "bg-purple-50 border-purple-200 text-purple-800",
  },
  {
    id: "nutrition" as const,
    label: "Nutrition",
    description: "Healthy eating and hydration",
    emoji: "🥗",
    color: "bg-green-50 border-green-200 text-green-800",
  },
  {
    id: "sleep" as const,
    label: "Sleep",
    description: "Rest and recovery",
    emoji: "😴",
    color: "bg-blue-50 border-blue-200 text-blue-800",
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

export default function NewHabitPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { createHabit } = useHabitsStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<HabitForm>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      emoji: "⭐",
    },
  })

  const selectedCategory = watch("category")
  const selectedEmoji = watch("emoji")

  const onSubmit = async (data: HabitForm) => {
    setIsLoading(true)

    try {
      const { error } = await createHabit({
        title: data.title,
        description: data.description || "",
        category: data.category,
        emoji: data.emoji,
      })

      if (error) {
        setError("root", {
          message: error.message || "Failed to create habit. Please try again.",
        })
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create New Habit</CardTitle>
            <CardDescription>Build a new healthy habit that aligns with your wellness goals</CardDescription>
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
                      <div className="text-sm font-medium">0 day streak</div>
                      <div className="text-xs text-muted-foreground capitalize">{selectedCategory}</div>
                    </div>
                  </div>
                </div>
              )}

              {errors.root && <p className="text-sm text-error text-center">{errors.root.message}</p>}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard">Cancel</Link>
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  Create Habit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
