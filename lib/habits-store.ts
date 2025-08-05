"use client"

import { create } from "zustand"
import { supabase } from "./supabase"
import { useAuthStore } from "./auth-store"
import type { Database } from "./database.types"

type Habit = Database["public"]["Tables"]["habits"]["Row"] & {
  streak?: number
  completed_today?: boolean
}

type HabitCompletion = Database["public"]["Tables"]["habit_completions"]["Row"]

interface HabitsState {
  habits: Habit[]
  loading: boolean
  error: string | null

  // Actions
  fetchHabits: () => Promise<void>
  createHabit: (habit: {
    title: string
    description?: string
    category: "fitness" | "mindfulness" | "nutrition" | "sleep"
    emoji?: string
  }) => Promise<{ error: any }>
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<{ error: any }>
  deleteHabit: (id: string) => Promise<{ error: any }>
  toggleHabit: (habitId: string) => Promise<{ error: any }>
  getWeeklyProgress: () => Promise<{ day_name: string; completed: number; total: number }[]>

  // Real-time subscription
  subscribeToHabits: () => () => void
}

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: [],
  loading: false,
  error: null,

  fetchHabits: async () => {
    const user = useAuthStore.getState().user
    if (!user) return

    set({ loading: true, error: null })

    try {
      // Fetch habits with today's completion status
      const { data: habits, error: habitsError } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("created_at", { ascending: true })

      if (habitsError) throw habitsError

      // Get today's completions
      const today = new Date().toISOString().split("T")[0]
      const { data: completions } = await supabase
        .from("habit_completions")
        .select("habit_id")
        .eq("user_id", user.id)
        .gte("completed_at", `${today}T00:00:00`)
        .lt("completed_at", `${today}T23:59:59`)

      const completedHabitIds = new Set(completions?.map((c) => c.habit_id) || [])

      // Get streaks for each habit
      const habitsWithStreaks = await Promise.all(
        (habits || []).map(async (habit) => {
          const { data: streak } = await supabase.rpc("get_habit_streak", { habit_uuid: habit.id })

          return {
            ...habit,
            streak: streak || 0,
            completed_today: completedHabitIds.has(habit.id),
          }
        }),
      )

      set({ habits: habitsWithStreaks, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },

  createHabit: async (habitData) => {
    const user = useAuthStore.getState().user
    if (!user) return { error: new Error("Not authenticated") }

    set({ loading: true })

    const { data, error } = await supabase
      .from("habits")
      .insert({
        ...habitData,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      set({ loading: false })
      return { error }
    }

    // Add to local state
    const newHabit = { ...data, streak: 0, completed_today: false }
    set((state) => ({
      habits: [...state.habits, newHabit],
      loading: false,
    }))

    return { error: null }
  },

  updateHabit: async (id, updates) => {
    set({ loading: true })

    const { data, error } = await supabase.from("habits").update(updates).eq("id", id).select().single()

    if (error) {
      set({ loading: false })
      return { error }
    }

    // Update local state
    set((state) => ({
      habits: state.habits.map((habit) => (habit.id === id ? { ...habit, ...data } : habit)),
      loading: false,
    }))

    return { error: null }
  },

  deleteHabit: async (id) => {
    set({ loading: true })

    const { error } = await supabase.from("habits").update({ is_active: false }).eq("id", id)

    if (error) {
      set({ loading: false })
      return { error }
    }

    // Remove from local state
    set((state) => ({
      habits: state.habits.filter((habit) => habit.id !== id),
      loading: false,
    }))

    return { error: null }
  },

  toggleHabit: async (habitId) => {
    const user = useAuthStore.getState().user
    if (!user) return { error: new Error("Not authenticated") }

    const habit = get().habits.find((h) => h.id === habitId)
    if (!habit) return { error: new Error("Habit not found") }

    const today = new Date().toISOString().split("T")[0]

    if (habit.completed_today) {
      // Remove completion
      const { error } = await supabase
        .from("habit_completions")
        .delete()
        .eq("habit_id", habitId)
        .eq("user_id", user.id)
        .gte("completed_at", `${today}T00:00:00`)
        .lt("completed_at", `${today}T23:59:59`)

      if (error) return { error }

      // Update local state
      set((state) => ({
        habits: state.habits.map((h) =>
          h.id === habitId ? { ...h, completed_today: false, streak: Math.max(0, (h.streak || 0) - 1) } : h,
        ),
      }))
    } else {
      // Add completion
      const { error } = await supabase.from("habit_completions").insert({
        habit_id: habitId,
        user_id: user.id,
        completed_at: new Date().toISOString(),
      })

      if (error) return { error }

      // Update local state
      set((state) => ({
        habits: state.habits.map((h) =>
          h.id === habitId ? { ...h, completed_today: true, streak: (h.streak || 0) + 1 } : h,
        ),
      }))
    }

    return { error: null }
  },

  getWeeklyProgress: async () => {
    const user = useAuthStore.getState().user
    if (!user) return []

    const { data, error } = await supabase.rpc("get_weekly_progress", { user_uuid: user.id })

    if (error) {
      console.error("Error fetching weekly progress:", error)
      return []
    }

    return data || []
  },

  subscribeToHabits: () => {
    const user = useAuthStore.getState().user
    if (!user) return () => {}

    const subscription = supabase
      .channel("habits-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "habits",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Habit change received:", payload)
          get().fetchHabits() // Refresh habits
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "habit_completions",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Habit completion change received:", payload)
          get().fetchHabits() // Refresh habits
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  },
}))
