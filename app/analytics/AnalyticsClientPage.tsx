"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { useHabitsStore } from "@/lib/habits-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Target, Calendar, Download, Trophy } from "lucide-react"

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"]

export default function AnalyticsClientPage() {
  const { user, initialized, initialize } = useAuthStore()
  const { habits, fetchHabits, getWeeklyProgress } = useHabitsStore()
  const [weeklyData, setWeeklyData] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")
  const router = useRouter()

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

    if (user) {
      fetchHabits()
      loadWeeklyProgress()
    }
  }, [initialized, user, router, fetchHabits])

  const loadWeeklyProgress = async () => {
    const data = await getWeeklyProgress()
    setWeeklyData(data)
  }

  // Calculate analytics data
  const totalHabits = habits.length
  const activeStreaks = habits.filter((h) => (h.streak || 0) > 0).length
  const longestStreak = Math.max(...habits.map((h) => h.streak || 0), 0)
  const completionRate =
    habits.length > 0 ? Math.round((habits.filter((h) => h.completed_today).length / habits.length) * 100) : 0

  // Category breakdown
  const categoryData = habits.reduce(
    (acc, habit) => {
      acc[habit.category] = (acc[habit.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(categoryData).map(([category, count]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: count,
  }))

  // Best performing habits
  const bestHabits = habits.sort((a, b) => (b.streak || 0) - (a.streak || 0)).slice(0, 3)

  const exportData = () => {
    const data = {
      summary: {
        totalHabits,
        activeStreaks,
        longestStreak,
        completionRate,
      },
      habits: habits.map((h) => ({
        title: h.title,
        category: h.category,
        streak: h.streak,
        completed_today: h.completed_today,
      })),
      weeklyProgress: weeklyData,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `thrive-analytics-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!initialized || !user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your wellness progress with detailed insights</p>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHabits}</div>
            <p className="text-xs text-muted-foreground">Active habits tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Streaks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeStreaks}</div>
            <p className="text-xs text-muted-foreground">Habits with streaks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{longestStreak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your habit completion over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Habit Categories</CardTitle>
            <CardDescription>Distribution of your habits by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Best Performing Habits */}
      <Card>
        <CardHeader>
          <CardTitle>Best Performing Habits</CardTitle>
          <CardDescription>Your habits with the longest streaks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bestHabits.map((habit, index) => (
              <div key={habit.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{habit.emoji}</span>
                    <div>
                      <h3 className="font-medium">{habit.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{habit.category}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{habit.streak || 0}</div>
                  <div className="text-xs text-muted-foreground">day streak</div>
                </div>
              </div>
            ))}
            {bestHabits.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Target className="mx-auto h-12 w-12 mb-4" />
                <p>Start completing habits to see your best performers here!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
