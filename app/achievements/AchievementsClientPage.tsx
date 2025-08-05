"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { useHabitsStore } from "@/lib/habits-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { achievements, getAchievementProgress } from "@/lib/achievements"
import { Trophy, Star, Target, Zap, Award } from "lucide-react"

export default function AchievementsClientPage() {
  const { user, initialized, initialize } = useAuthStore()
  const { habits, fetchHabits } = useHabitsStore()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
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
    }
  }, [initialized, user, router, fetchHabits])

  const categories = ["all", "streak", "completion", "variety", "milestone"]

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "all" || achievement.category === selectedCategory,
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "streak":
        return <Zap className="h-4 w-4" />
      case "completion":
        return <Target className="h-4 w-4" />
      case "variety":
        return <Star className="h-4 w-4" />
      case "milestone":
        return <Award className="h-4 w-4" />
      default:
        return <Trophy className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "streak":
        return "bg-red-50 text-red-700 border-red-200"
      case "completion":
        return "bg-green-50 text-green-700 border-green-200"
      case "variety":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "milestone":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  if (!initialized || !user) {
    return null
  }

  const unlockedCount = achievements.filter((achievement) => {
    const progress = getAchievementProgress(achievement, habits, [])
    return progress >= achievement.requirement
  }).length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-muted-foreground">Track your wellness milestones and unlock achievements</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-medium">
              {unlockedCount} / {achievements.length} Unlocked
            </span>
          </div>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {getCategoryIcon(category)}
            <span className="ml-2">{category === "all" ? "All" : category}</span>
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const progress = getAchievementProgress(achievement, habits, [])
          const isUnlocked = progress >= achievement.requirement
          const progressPercentage = (progress / achievement.requirement) * 100

          return (
            <Card
              key={achievement.id}
              className={`relative overflow-hidden ${
                isUnlocked ? "border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50" : "border-gray-200"
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-2 right-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`text-3xl ${isUnlocked ? "" : "grayscale opacity-50"}`}>{achievement.icon}</div>
                  <div className="flex-1">
                    <CardTitle className={`text-lg ${isUnlocked ? "" : "text-muted-foreground"}`}>
                      {achievement.title}
                    </CardTitle>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getCategoryColor(achievement.category)}`}
                    >
                      {achievement.category}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className={`text-sm mb-4 ${isUnlocked ? "" : "text-muted-foreground"}`}>{achievement.description}</p>

                {!isUnlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {progress} / {achievement.requirement}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {isUnlocked && (
                  <div className="flex items-center justify-center py-2">
                    <div className="flex items-center space-x-2 text-yellow-600 font-medium">
                      <Trophy className="h-4 w-4" />
                      <span>Unlocked!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
