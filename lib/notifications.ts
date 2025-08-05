export class NotificationManager {
  private static instance: NotificationManager
  private permission: NotificationPermission = "default"

  private constructor() {
    if (typeof window !== "undefined") {
      this.permission = Notification.permission
    }
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager()
    }
    return NotificationManager.instance
  }

  get permissionStatus(): NotificationPermission {
    return this.permission
  }

  async requestPermission(): Promise<boolean> {
    if (typeof window === "undefined") return false

    if (this.permission === "granted") {
      return true
    }

    if (this.permission === "denied") {
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      this.permission = permission
      return permission === "granted"
    } catch (error) {
      console.error("Error requesting notification permission:", error)
      return false
    }
  }

  async showNotification(title: string, options: NotificationOptions = {}): Promise<void> {
    if (typeof window === "undefined") return

    if (this.permission !== "granted") {
      console.warn("Notification permission not granted")
      return
    }

    try {
      const registration = await navigator.serviceWorker.ready
      await registration.showNotification(title, {
        icon: "/icons/icon-192x192.png",
        badge: "/icons/icon-72x72.png",
        ...options,
      })
    } catch (error) {
      console.error("Error showing notification:", error)
      // Fallback to regular notification
      new Notification(title, options)
    }
  }

  async scheduleHabitReminder(habitTitle: string, time: string): Promise<void> {
    // This would typically integrate with a backend service
    // For now, we'll show an immediate notification as a demo
    await this.showNotification(`Time for ${habitTitle}!`, {
      body: "Don't forget to complete your habit today.",
      tag: `habit-${habitTitle}`,
      requireInteraction: true,
      actions: [
        { action: "complete", title: "Mark Complete" },
        { action: "snooze", title: "Remind Later" },
      ],
    })
  }

  async showStreakMilestone(habitTitle: string, streak: number): Promise<void> {
    await this.showNotification("🔥 Streak Milestone!", {
      body: `Congratulations! You've maintained "${habitTitle}" for ${streak} days in a row!`,
      tag: `streak-${habitTitle}`,
      requireInteraction: true,
    })
  }

  async showWeeklyProgress(completedHabits: number, totalHabits: number): Promise<void> {
    const percentage = Math.round((completedHabits / totalHabits) * 100)
    await this.showNotification("📊 Weekly Progress Report", {
      body: `This week you completed ${completedHabits}/${totalHabits} habits (${percentage}%). Keep up the great work!`,
      tag: "weekly-progress",
    })
  }

  async showAchievementUnlocked(achievementTitle: string, achievementIcon: string): Promise<void> {
    await this.showNotification(`${achievementIcon} Achievement Unlocked!`, {
      body: `You've earned the "${achievementTitle}" achievement!`,
      tag: `achievement-${achievementTitle}`,
      requireInteraction: true,
    })
  }
}

export const notificationManager = NotificationManager.getInstance()

// Convenience functions
export const requestNotificationPermission = () => notificationManager.requestPermission()
export const showHabitReminder = (habitTitle: string, time: string) =>
  notificationManager.scheduleHabitReminder(habitTitle, time)
export const showStreakMilestone = (habit: any) => notificationManager.showStreakMilestone(habit.title, habit.streak)
export const showWeeklyProgress = (completed: number, total: number) =>
  notificationManager.showWeeklyProgress(completed, total)
export const showAchievementUnlocked = (title: string, icon: string) =>
  notificationManager.showAchievementUnlocked(title, icon)
