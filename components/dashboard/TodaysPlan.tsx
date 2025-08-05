"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { mockHabits, type Habit } from "@/lib/mock-data"
import { Check, Circle } from "lucide-react"

export function TodaysPlan() {
  const [habits, setHabits] = useState<Habit[]>(mockHabits)

  const toggleHabit = async (habitId: string) => {
    // Optimistic UI update
    setHabits((prev) => prev.map((habit) => (habit.id === habitId ? { ...habit, completed: !habit.completed } : habit)))

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      // In a real app, you'd make an API call here
      console.log(`Habit ${habitId} toggled`)
    } catch (error) {
      // Revert on error
      setHabits((prev) =>
        prev.map((habit) => (habit.id === habitId ? { ...habit, completed: !habit.completed } : habit)),
      )
    }
  }

  const completedCount = habits.filter((h) => h.completed).length
  const totalCount = habits.length

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
        <div className="space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                habit.completed ? "bg-success/10 border-success/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                className={`h-6 w-6 rounded-full ${
                  habit.completed ? "text-success hover:text-success" : "text-gray-400 hover:text-primary"
                }`}
                onClick={() => toggleHabit(habit.id)}
              >
                {habit.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </Button>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{habit.emoji}</span>
                  <h3 className={`font-medium ${habit.completed ? "line-through text-prose-secondary" : ""}`}>
                    {habit.title}
                  </h3>
                </div>
                <p className="text-sm text-prose-secondary">{habit.description}</p>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium">{habit.streak} day streak</div>
                <div className="text-xs text-prose-secondary capitalize">{habit.category}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
