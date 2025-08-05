"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { useHabitsStore } from "@/lib/habits-store"
import { useAuthStore } from "@/lib/auth-store"
import { Plus, Edit, Trash2, MoreHorizontal, TrendingUp } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function HabitsPage() {
  const { habits, loading, fetchHabits, deleteHabit } = useHabitsStore()
  const { user } = useAuthStore()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchHabits()
    }
  }, [user, fetchHabits])

  const handleDeleteHabit = async (habitId: string) => {
    if (!confirm("Are you sure you want to delete this habit?")) return

    setDeletingId(habitId)
    try {
      const { error } = await deleteHabit(habitId)
      if (error) {
        console.error("Error deleting habit:", error)
        alert("Failed to delete habit. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting habit:", error)
      alert("Failed to delete habit. Please try again.")
    } finally {
      setDeletingId(null)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "fitness":
        return "bg-red-50 text-red-700 border-red-200"
      case "mindfulness":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "nutrition":
        return "bg-green-50 text-green-700 border-green-200"
      case "sleep":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  if (loading && habits.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Habits</h1>
          <p className="text-muted-foreground">Manage your daily habits and track your progress</p>
        </div>
        <Button asChild>
          <Link href="/habits/new">
            <Plus className="mr-2 h-4 w-4" />
            New Habit
          </Link>
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <TrendingUp className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium mb-2">No habits yet</h3>
          <p className="text-muted-foreground mb-6">Create your first habit to start building a healthier routine.</p>
          <Button asChild>
            <Link href="/habits/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Habit
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <Card key={habit.id} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{habit.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg line-clamp-1">{habit.title}</CardTitle>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getCategoryColor(habit.category)}`}
                      >
                        {habit.category}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/habits/${habit.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="text-red-600 focus:text-red-600"
                        disabled={deletingId === habit.id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === habit.id ? "Deleting..." : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                {habit.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{habit.description}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{habit.streak || 0}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${habit.completed_today ? "text-success" : "text-gray-400"}`}>
                        {habit.completed_today ? "✓" : "○"}
                      </div>
                      <div className="text-xs text-muted-foreground">Today</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      Created {new Date(habit.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
