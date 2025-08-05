"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "./supabase"
import type { User, Session } from "@supabase/supabase-js"
import type { Database } from "./database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface AuthState {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  initialized: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
  completeOnboarding: (data: {
    wellness_goals: string[]
    time_commitment: string
    experience_level: string
  }) => Promise<{ error: any }>
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      session: null,
      loading: false,
      initialized: false,

      initialize: async () => {
        try {
          set({ loading: true })

          // Get initial session
          const {
            data: { session },
            error,
          } = await supabase.auth.getSession()

          if (error) {
            console.error("Error getting session:", error)
            set({ loading: false, initialized: true })
            return
          }

          if (session?.user) {
            // Get user profile
            const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

            set({
              user: session.user,
              session,
              profile,
              loading: false,
              initialized: true,
            })
          } else {
            set({ loading: false, initialized: true })
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth state changed:", event, session?.user?.id)

            if (session?.user) {
              // Get updated profile
              const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

              set({
                user: session.user,
                session,
                profile,
                loading: false,
              })
            } else {
              set({
                user: null,
                session: null,
                profile: null,
                loading: false,
              })
            }
          })
        } catch (error) {
          console.error("Error initializing auth:", error)
          set({ loading: false, initialized: true })
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        set({ loading: true })

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        })

        if (error) {
          set({ loading: false })
          return { error }
        }

        // Profile will be created automatically via trigger
        set({ loading: false })
        return { error: null }
      },

      signIn: async (email: string, password: string) => {
        set({ loading: true })

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          set({ loading: false })
          return { error }
        }

        // Get user profile
        if (data.user) {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

          set({
            user: data.user,
            session: data.session,
            profile,
            loading: false,
          })
        }

        return { error: null }
      },

      signOut: async () => {
        set({ loading: true })
        await supabase.auth.signOut()
        set({
          user: null,
          session: null,
          profile: null,
          loading: false,
        })
      },

      updateProfile: async (updates: Partial<Profile>) => {
        const { user } = get()
        if (!user) return { error: new Error("Not authenticated") }

        set({ loading: true })

        const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()

        if (error) {
          set({ loading: false })
          return { error }
        }

        set({ profile: data, loading: false })
        return { error: null }
      },

      completeOnboarding: async (data: {
        wellness_goals: string[]
        time_commitment: string
        experience_level: string
      }) => {
        const { user } = get()
        if (!user) return { error: new Error("Not authenticated") }

        const { error } = await supabase
          .from("profiles")
          .update({
            wellness_goals: data.wellness_goals,
            time_commitment: data.time_commitment,
            experience_level: data.experience_level,
            onboarding_completed: true,
          })
          .eq("id", user.id)

        if (error) {
          return { error }
        }

        // Refresh profile
        const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        set({ profile })
        return { error: null }
      },
    }),
    {
      name: "thrive-auth-storage",
      partialize: (state) => ({
        // Only persist non-sensitive data
        initialized: state.initialized,
      }),
    },
  ),
)
