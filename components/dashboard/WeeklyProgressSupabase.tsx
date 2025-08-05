"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useHabitsStore } from "@/lib/habits-store"

export function WeeklyProgress() {
  const { getWeeklyProgress } = useHabitsStore()
  const [progressData, setProgressData] = useState<{ day_name: string; completed: number; total: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true)
      const data = await getWeeklyProgress()
      setProgressData(data)
      setLoading(false)
    }

    fetchProgress()
  }, [getWeeklyProgress])

  const maxHeight = 60 // Maximum bar height in pixels

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="flex items-end justify-between space-x-2 h-20">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="w-full bg-gray-200 rounded-t-sm" style={{ height: maxHeight }} />
                  <div className="w-8 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between space-x-2 h-20">
          {progressData.map((day) => {
            const percentage = day.total > 0 ? (day.completed / day.total) * 100 : 0
            const height = (percentage / 100) * maxHeight

            return (
              <div key={day.day_name} className="flex flex-col items-center space-y-2 flex-1">
                <div className="relative w-full bg-gray-200 rounded-t-sm" style={{ height: maxHeight }}>
                  <div
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-300 ${
                      percentage === 100
                        ? "bg-success"
                        : percentage >= 80
                          ? "bg-primary"
                          : percentage >= 60
                            ? "bg-secondary"
                            : "bg-gray-400"
                    }`}
                    style={{ height: `${height}px` }}
                  />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{day.day_name}</div>
                  <div className="text-xs text-prose-secondary">
                    {day.completed}/{day.total}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span>Perfect</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>Great</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-secondary rounded"></div>
            <span>Good</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span>Needs work</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
