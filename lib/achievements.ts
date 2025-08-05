export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "streak" | "completion" | "variety" | "milestone"
  requirement: number
  unlockedAt?: Date
  progress?: number
}

export const achievements: Achievement[] = [
  // Streak Achievements
  {
    id: "first-week",
    title: "First Week",
    description: "Complete any habit for 7 days in a row",
    icon: "🔥",
    category: "streak",
    requirement: 7,
  },
  {
    id: "two-weeks-strong",
    title: "Two Weeks Strong",
    description: "Maintain a 14-day streak",
    icon: "💪",
    category: "streak",
    requirement: 14,
  },
  {
    id: "month-master",
    title: "Month Master",
    description: "Keep a habit going for 30 days",
    icon: "🏆",
    category: "streak",
    requirement: 30,
  },
  {
    id: "unstoppable",
    title: "Unstoppable",
    description: "Achieve a 100-day streak",
    icon: "⚡",
    category: "streak",
    requirement: 100,
  },

  // Completion Achievements
  {
    id: "perfect-day",
    title: "Perfect Day",
    description: "Complete all your habits in a single day",
    icon: "⭐",
    category: "completion",
    requirement: 1,
  },
  {
    id: "perfect-week",
    title: "Perfect Week",
    description: "Complete all habits every day for a week",
    icon: "🌟",
    category: "completion",
    requirement: 7,
  },
  {
    id: "century-club",
    title: "Century Club",
    description: "Complete 100 total habit instances",
    icon: "💯",
    category: "completion",
    requirement: 100,
  },

  // Variety Achievements
  {
    id: "well-rounded",
    title: "Well Rounded",
    description: "Have active habits in all 4 categories",
    icon: "🎯",
    category: "variety",
    requirement: 4,
  },
  {
    id: "habit-collector",
    title: "Habit Collector",
    description: "Create 10 different habits",
    icon: "📚",
    category: "variety",
    requirement: 10,
  },

  // Milestone Achievements
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Create your first habit",
    icon: "🌱",
    category: "milestone",
    requirement: 1,
  },
  {
    id: "committed",
    title: "Committed",
    description: "Use Thrive for 30 days",
    icon: "🎖️",
    category: "milestone",
    requirement: 30,
  },
  {
    id: "wellness-warrior",
    title: "Wellness Warrior",
    description: "Maintain 5 active habits simultaneously",
    icon: "⚔️",
    category: "milestone",
    requirement: 5,
  },
]

export function checkAchievements(habits: any[], completions: any[]): Achievement[] {
  const unlockedAchievements: Achievement[] = []

  achievements.forEach((achievement) => {
    let isUnlocked = false
    let progress = 0

    switch (achievement.category) {
      case "streak":
        const maxStreak = Math.max(...habits.map((h) => h.streak || 0), 0)
        progress = maxStreak
        isUnlocked = maxStreak >= achievement.requirement
        break

      case "completion":
        if (achievement.id === "perfect-day") {
          const todayCompleted = habits.filter((h) => h.completed_today).length
          const totalHabits = habits.length
          progress = totalHabits > 0 ? (todayCompleted / totalHabits) * 100 : 0
          isUnlocked = todayCompleted > 0 && todayCompleted === totalHabits
        } else if (achievement.id === "century-club") {
          progress = completions.length
          isUnlocked = completions.length >= achievement.requirement
        }
        break

      case "variety":
        if (achievement.id === "well-rounded") {
          const categories = new Set(habits.map((h) => h.category))
          progress = categories.size
          isUnlocked = categories.size >= achievement.requirement
        } else if (achievement.id === "habit-collector") {
          progress = habits.length
          isUnlocked = habits.length >= achievement.requirement
        }
        break

      case "milestone":
        if (achievement.id === "getting-started") {
          progress = habits.length > 0 ? 1 : 0
          isUnlocked = habits.length > 0
        } else if (achievement.id === "wellness-warrior") {
          const activeHabits = habits.filter((h) => (h.streak || 0) > 0).length
          progress = activeHabits
          isUnlocked = activeHabits >= achievement.requirement
        }
        break
    }

    const achievementWithProgress = {
      ...achievement,
      progress: Math.min(progress, achievement.requirement),
      unlockedAt: isUnlocked ? new Date() : undefined,
    }

    if (isUnlocked) {
      unlockedAchievements.push(achievementWithProgress)
    }
  })

  return unlockedAchievements
}

export function getAchievementProgress(achievement: Achievement, habits: any[], completions: any[]): number {
  switch (achievement.category) {
    case "streak":
      const maxStreak = Math.max(...habits.map((h) => h.streak || 0), 0)
      return Math.min(maxStreak, achievement.requirement)

    case "completion":
      if (achievement.id === "perfect-day") {
        const todayCompleted = habits.filter((h) => h.completed_today).length
        return todayCompleted
      } else if (achievement.id === "century-club") {
        return Math.min(completions.length, achievement.requirement)
      }
      break

    case "variety":
      if (achievement.id === "well-rounded") {
        const categories = new Set(habits.map((h) => h.category))
        return Math.min(categories.size, achievement.requirement)
      } else if (achievement.id === "habit-collector") {
        return Math.min(habits.length, achievement.requirement)
      }
      break

    case "milestone":
      if (achievement.id === "getting-started") {
        return habits.length > 0 ? 1 : 0
      } else if (achievement.id === "wellness-warrior") {
        const activeHabits = habits.filter((h) => (h.streak || 0) > 0).length
        return Math.min(activeHabits, achievement.requirement)
      }
      break
  }

  return 0
}
