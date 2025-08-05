"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { weeklyProgressData } from "@/lib/mock-data"

export function WeeklyProgress() {
  const maxHeight = 60 // Maximum bar height in pixels

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between space-x-2 h-20">
          {weeklyProgressData.map((day) => {
            const percentage = (day.completed / day.total) * 100
            const height = (percentage / 100) * maxHeight

            return (
              <div key={day.day} className="flex flex-col items-center space-y-2 flex-1">
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
                  <div className="text-xs font-medium">{day.day}</div>
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
