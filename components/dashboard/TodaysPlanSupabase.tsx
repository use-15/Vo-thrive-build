"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useHabitsStore } from "@/lib/habits-store"
import { Check, Circle, Plus } from "lucide-react"
import Link from "next/link"

export function TodaysPlan() {
  const { habits, loading, fetchHabits, toggleHabit, subscribeToHabits } = useHabitsStore()
  const [isToggling, setIsToggling] = useState<string | null>(null)

  useEffect(() => {
    fetchHabits()

    // Subscribe to real-time updates
    const unsubscribe = subscribeToHabits()

    return unsubscribe
  }, [fetchHabits, subscribeToHabits])

  const handleToggleHabit = async (habitId: string) => {
    setIsToggling(habitId)

    try {
      const { error } = await toggleHabit(habitId)
      if (error) {
        console.error("Error toggling habit:", error)
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error toggling habit:", error)
    } finally {
      setIsToggling(null)
    }
  }

  const completedCount = habits.filter((h) => h.completed_today).length
  const totalCount = habits.length

  if (loading && habits.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Today's Plan
          <span className="text-sm font-normal text-prose-secondary">
            {completedCount}/{totalCount} completed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {habits.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Circle className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-2">No habits yet</h3>
            <p className="text-prose-secondary mb-4">Create your first habit to start building a better routine.</p>
            <Button asChild>
              <Link href="/habits/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Habit
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  habit.completed_today
                    ? "bg-success/10 border-success/20"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 rounded-full ${
                    habit.completed_today ? "text-success hover:text-success" : "text-gray-400 hover:text-primary"
                  }`}
                  onClick={() => handleToggleHabit(habit.id)}
                  disabled={isToggling === habit.id}
                >
                  {isToggling === habit.id ? (
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  ) : habit.completed_today ? (
                    <Check className="h-4 w-4" />
                  ) : habit.completed_today ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </Button>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{habit.emoji}</span>
                    <h3 className={`font-medium ${habit.completed_today ? "line-through text-prose-secondary" : ""}`}>
                      {habit.title}
                    </h3>
                  </div>
                  <p className="text-sm text-prose-secondary">{habit.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium">{habit.streak || 0} day streak</div>
                  <div className="text-xs text-prose-secondary capitalize">{habit.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
