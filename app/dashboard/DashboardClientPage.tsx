"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ProgressBar } from "@/components/ui/ProgressBar"
import Link from "next/link"
import { Plus, Target, TrendingUp, Calendar, CheckCircle2, Circle, Flame, Trophy, Clock } from "lucide-react"

export default function DashboardClientPage() {
  const { user, habits, initialized, initialize, fetchHabits, toggleHabitCompletion, getStreakData } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  useEffect(() => {
    if (initialized && !user) {
      router.push("/login")
      return
    }

    if (user && habits.length === 0) {
      fetchHabits()
    }
  }, [initialized, user, router, habits.length, fetchHabits])

  const handleToggleHabit = async (habitId: string) => {
    setLoading(true)
    await toggleHabitCompletion(habitId)
    setLoading(false)
  }

  if (!initialized || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const completedToday = habits.filter((h) => h.completed_today).length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0
  const streakData = getStreakData()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-muted-foreground">
          {completedToday === totalHabits && totalHabits > 0
            ? "Amazing! You've completed all your habits today! 🎉"
            : `You have ${totalHabits - completedToday} habits left to complete today.`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {completedToday}/{totalHabits}
            </div>
            <div className="mt-2">
              <ProgressBar value={completionRate} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{Math.round(completionRate)}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{streakData.current}</div>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Habits</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{streakData.active}</div>
            <p className="text-xs text-muted-foreground">with streaks</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Habits */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Today's Habits</h2>
          <Button asChild>
            <Link href="/habits/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Habit
            </Link>
          </Button>
        </div>

        {habits.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No habits yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first habit to start building a healthier routine
              </p>
              <Button asChild>
                <Link href="/habits/new">Create Your First Habit</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => (
              <Card
                key={habit.id}
                className={`transition-all duration-200 ${
                  habit.completed_today ? "bg-green-50 border-green-200" : "hover:shadow-md"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleToggleHabit(habit.id)}
                        disabled={loading}
                        className="flex-shrink-0 transition-colors"
                      >
                        {habit.completed_today ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : (
                          <Circle className="h-6 w-6 text-gray-400 hover:text-primary" />
                        )}
                      </button>

                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{habit.emoji}</span>
                        <div>
                          <h3 className={`font-medium ${habit.completed_today ? "text-green-800" : ""}`}>
                            {habit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{habit.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      {habit.streak > 0 && (
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Flame className="h-4 w-4" />
                          <span className="font-medium">{habit.streak}</span>
                        </div>
                      )}

                      {habit.reminder_time && (
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{habit.reminder_time}</span>
                        </div>
                      )}

                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                        {habit.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
          <Link href="/habits" className="flex flex-col items-center space-y-2">
            <Target className="h-6 w-6" />
            <span>Manage Habits</span>
          </Link>
        </Button>

        <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
          <Link href="/analytics" className="flex flex-col items-center space-y-2">
            <TrendingUp className="h-6 w-6" />
            <span>View Analytics</span>
          </Link>
        </Button>

        <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
          <Link href="/achievements" className="flex flex-col items-center space-y-2">
            <Trophy className="h-6 w-6" />
            <span>Achievements</span>
          </Link>
        </Button>

        <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
          <Link href="/library" className="flex flex-col items-center space-y-2">
            <Calendar className="h-6 w-6" />
            <span>Content Library</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
