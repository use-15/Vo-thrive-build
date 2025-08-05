"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: {
    theme: "light" | "dark" | "system"
    notifications: boolean
    reminderTime: string
  }
}

interface Habit {
  id: string
  title: string
  description: string
  emoji: string
  category: "fitness" | "mindfulness" | "nutrition" | "sleep"
  frequency: "daily" | "weekly"
  streak: number
  completed_today: boolean
  created_at: string
  reminder_time?: string
  is_active: boolean
}

interface StoreState {
  // User state
  user: User | null
  initialized: boolean

  // Habits state
  habits: Habit[]
  loading: boolean
  error: string | null

  // Actions
  initialize: () => Promise<void>
  login: (email: string, password: string) => Promise<{ error: any }>
  register: (email: string, password: string, name: string) => Promise<{ error: any }>
  logout: () => void

  // Habit actions
  fetchHabits: () => Promise<void>
  createHabit: (habit: Omit<Habit, "id" | "created_at" | "streak" | "completed_today">) => Promise<{ error: any }>
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<{ error: any }>
  deleteHabit: (id: string) => Promise<{ error: any }>
  toggleHabitCompletion: (id: string) => Promise<{ error: any }>

  // Analytics
  getWeeklyProgress: () => Promise<any[]>
  getStreakData: () => { current: number; longest: number; active: number }
}

export const useAuthStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      initialized: false,
      habits: [],
      loading: false,
      error: null,

      // Initialize app
      initialize: async () => {
        try {
          // Check for existing session
          const savedUser = localStorage.getItem("thrive-user")
          if (savedUser) {
            const user = JSON.parse(savedUser)
            set({ user, initialized: true })
            await get().fetchHabits()
          } else {
            set({ initialized: true })
          }
        } catch (error) {
          console.error("Initialization error:", error)
          set({ initialized: true })
        }
      },

      // Authentication
      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null })

          // Mock authentication - replace with Supabase auth
          if (email && password) {
            const user: User = {
              id: "user-1",
              email,
              name: email.split("@")[0],
              preferences: {
                theme: "system",
                notifications: true,
                reminderTime: "09:00",
              },
            }

            localStorage.setItem("thrive-user", JSON.stringify(user))
            set({ user, loading: false })
            await get().fetchHabits()
            return { error: null }
          }

          throw new Error("Invalid credentials")
        } catch (error: any) {
          set({ error: error.message, loading: false })
          return { error }
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          set({ loading: true, error: null })

          // Mock registration - replace with Supabase auth
          const user: User = {
            id: `user-${Date.now()}`,
            email,
            name,
            preferences: {
              theme: "system",
              notifications: true,
              reminderTime: "09:00",
            },
          }

          localStorage.setItem("thrive-user", JSON.stringify(user))
          set({ user, loading: false })
          return { error: null }
        } catch (error: any) {
          set({ error: error.message, loading: false })
          return { error }
        }
      },

      logout: () => {
        localStorage.removeItem("thrive-user")
        localStorage.removeItem("thrive-habits")
        set({ user: null, habits: [] })
      },

      // Habit management
      fetchHabits: async () => {
        const user = get().user
        if (!user) return

        try {
          set({ loading: true, error: null })

          // Mock data - replace with Supabase query
          const savedHabits = localStorage.getItem("thrive-habits")
          const habits = savedHabits
            ? JSON.parse(savedHabits)
            : [
                {
                  id: "1",
                  title: "Morning Meditation",
                  description: "10 minutes of mindfulness meditation",
                  emoji: "🧘‍♀️",
                  category: "mindfulness",
                  frequency: "daily",
                  streak: 5,
                  completed_today: false,
                  created_at: new Date().toISOString(),
                  reminder_time: "07:00",
                  is_active: true,
                },
                {
                  id: "2",
                  title: "Drink Water",
                  description: "8 glasses of water throughout the day",
                  emoji: "💧",
                  category: "nutrition",
                  frequency: "daily",
                  streak: 12,
                  completed_today: true,
                  created_at: new Date().toISOString(),
                  reminder_time: "08:00",
                  is_active: true,
                },
                {
                  id: "3",
                  title: "Evening Walk",
                  description: "30-minute walk in the neighborhood",
                  emoji: "🚶‍♀️",
                  category: "fitness",
                  frequency: "daily",
                  streak: 3,
                  completed_today: false,
                  created_at: new Date().toISOString(),
                  reminder_time: "18:00",
                  is_active: true,
                },
              ]

          set({ habits, loading: false })
        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      },

      createHabit: async (habitData) => {
        try {
          const newHabit: Habit = {
            ...habitData,
            id: `habit-${Date.now()}`,
            created_at: new Date().toISOString(),
            streak: 0,
            completed_today: false,
          }

          const habits = [...get().habits, newHabit]
          set({ habits })
          localStorage.setItem("thrive-habits", JSON.stringify(habits))

          return { error: null }
        } catch (error: any) {
          return { error }
        }
      },

      updateHabit: async (id, updates) => {
        try {
          const habits = get().habits.map((habit) => (habit.id === id ? { ...habit, ...updates } : habit))

          set({ habits })
          localStorage.setItem("thrive-habits", JSON.stringify(habits))

          return { error: null }
        } catch (error: any) {
          return { error }
        }
      },

      deleteHabit: async (id) => {
        try {
          const habits = get().habits.filter((habit) => habit.id !== id)
          set({ habits })
          localStorage.setItem("thrive-habits", JSON.stringify(habits))

          return { error: null }
        } catch (error: any) {
          return { error }
        }
      },

      toggleHabitCompletion: async (id) => {
        try {
          const habits = get().habits.map((habit) => {
            if (habit.id === id) {
              const completed = !habit.completed_today
              return {
                ...habit,
                completed_today: completed,
                streak: completed ? habit.streak + 1 : Math.max(0, habit.streak - 1),
              }
            }
            return habit
          })

          set({ habits })
          localStorage.setItem("thrive-habits", JSON.stringify(habits))

          return { error: null }
        } catch (error: any) {
          return { error }
        }
      },

      // Analytics
      getWeeklyProgress: async () => {
        const habits = get().habits
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

        return days.map((day, index) => ({
          day_name: day,
          completed: Math.floor(Math.random() * habits.length),
          total: habits.length,
        }))
      },

      getStreakData: () => {
        const habits = get().habits
        const streaks = habits.map((h) => h.streak)

        return {
          current: Math.max(...streaks, 0),
          longest: Math.max(...streaks, 0), // In real app, track historical max
          active: habits.filter((h) => h.streak > 0).length,
        }
      },
    }),
    {
      name: "thrive-storage",
      partialize: (state) => ({
        user: state.user,
        initialized: state.initialized,
      }),
    },
  ),
)
