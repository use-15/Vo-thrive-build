"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

interface HabitTemplate {
  id: string
  title: string
  description: string
  category: "fitness" | "mindfulness" | "nutrition" | "sleep"
  emoji: string
  popular?: boolean
}

const habitTemplates: HabitTemplate[] = [
  {
    id: "morning-meditation",
    title: "Morning Meditation",
    description: "Start your day with 10 minutes of mindfulness",
    category: "mindfulness",
    emoji: "🧘",
    popular: true,
  },
  {
    id: "daily-walk",
    title: "Daily Walk",
    description: "Take a 30-minute walk for physical activity",
    category: "fitness",
    emoji: "🚶",
    popular: true,
  },
  {
    id: "drink-water",
    title: "Drink Water",
    description: "Stay hydrated with 8 glasses of water daily",
    category: "nutrition",
    emoji: "💧",
    popular: true,
  },
  {
    id: "bedtime-routine",
    title: "Bedtime Routine",
    description: "Wind down with a consistent evening routine",
    category: "sleep",
    emoji: "🌙",
  },
  {
    id: "gratitude-journal",
    title: "Gratitude Journal",
    description: "Write down 3 things you're grateful for",
    category: "mindfulness",
    emoji: "📝",
  },
  {
    id: "morning-exercise",
    title: "Morning Exercise",
    description: "Start your day with 20 minutes of exercise",
    category: "fitness",
    emoji: "💪",
  },
  {
    id: "healthy-breakfast",
    title: "Healthy Breakfast",
    description: "Eat a nutritious breakfast every morning",
    category: "nutrition",
    emoji: "🥗",
  },
  {
    id: "reading-before-bed",
    title: "Reading Before Bed",
    description: "Read for 15 minutes before sleeping",
    category: "sleep",
    emoji: "📚",
  },
  {
    id: "deep-breathing",
    title: "Deep Breathing",
    description: "Practice 5 minutes of deep breathing exercises",
    category: "mindfulness",
    emoji: "🫁",
  },
  {
    id: "stretching",
    title: "Daily Stretching",
    description: "Stretch for 10 minutes to improve flexibility",
    category: "fitness",
    emoji: "🤸",
  },
]

interface HabitTemplatesProps {
  onSelectTemplate: (template: HabitTemplate) => void
}

export function HabitTemplates({ onSelectTemplate }: HabitTemplatesProps) {
  const popularTemplates = habitTemplates.filter((t) => t.popular)
  const otherTemplates = habitTemplates.filter((t) => !t.popular)

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

  return (
    <div className="space-y-6">
      {/* Popular Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Popular Habits</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => onSelectTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-1">{template.title}</CardTitle>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getCategoryColor(template.category)}`}
                    >
                      {template.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                <Button size="sm" className="w-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Templates */}
      <div>
        <h3 className="text-lg font-semibold mb-3">More Templates</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => onSelectTemplate(template)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base line-clamp-1">{template.title}</CardTitle>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getCategoryColor(template.category)}`}
                    >
                      {template.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
