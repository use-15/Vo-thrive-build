"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "./supabase"
import { useAuthStore } from "./auth-store"
import type { Database } from "./database.types"

type Content = Database["public"]["Tables"]["content"]["Row"]
type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"] & {
  content: Content
}

interface ContentState {
  content: Content[]
  bookmarks: Bookmark[]
  loading: boolean
  error: string | null

  // Actions
  fetchContent: () => Promise<void>
  fetchBookmarks: () => Promise<void>
  addBookmark: (contentId: string) => Promise<{ error: any }>
  removeBookmark: (contentId: string) => Promise<{ error: any }>
  isBookmarked: (contentId: string) => boolean

  // Real-time subscription
  subscribeToBookmarks: () => () => void
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      content: [],
      bookmarks: [],
      loading: false,
      error: null,

      fetchContent: async () => {
        set({ loading: true, error: null })

        try {
          const { data, error } = await supabase
            .from("content")
            .select("*")
            .eq("published", true)
            .order("created_at", { ascending: false })

          if (error) throw error

          set({ content: data || [], loading: false })
        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      },

      fetchBookmarks: async () => {
        const user = useAuthStore.getState().user
        if (!user) return

        set({ loading: true, error: null })

        try {
          const { data, error } = await supabase
            .from("bookmarks")
            .select(`
              *,
              content (*)
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

          if (error) throw error

          set({ bookmarks: data || [], loading: false })
        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      },

      addBookmark: async (contentId: string) => {
        const user = useAuthStore.getState().user
        if (!user) return { error: new Error("Not authenticated") }

        const { data, error } = await supabase
          .from("bookmarks")
          .insert({
            user_id: user.id,
            content_id: contentId,
          })
          .select(`
            *,
            content (*)
          `)
          .single()

        if (error) {
          return { error }
        }

        // Add to local state
        set((state) => ({
          bookmarks: [data, ...state.bookmarks],
        }))

        return { error: null }
      },

      removeBookmark: async (contentId: string) => {
        const user = useAuthStore.getState().user
        if (!user) return { error: new Error("Not authenticated") }

        const { error } = await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("content_id", contentId)

        if (error) {
          return { error }
        }

        // Remove from local state
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.content_id !== contentId),
        }))

        return { error: null }
      },

      isBookmarked: (contentId: string) => {
        const { bookmarks } = get()
        return bookmarks.some((b) => b.content_id === contentId)
      },

      subscribeToBookmarks: () => {
        const user = useAuthStore.getState().user
        if (!user) return () => {}

        const subscription = supabase
          .channel("bookmarks-changes")
          .on(
            "postgres_changes",
            {
              event: "*",
              schema: "public",
              table: "bookmarks",
              filter: `user_id=eq.${user.id}`,
            },
            (payload) => {
              console.log("Bookmark change received:", payload)
              get().fetchBookmarks() // Refresh bookmarks
            },
          )
          .subscribe()

        return () => {
          subscription.unsubscribe()
        }
      },
    }),
    {
      name: "thrive-content-storage",
      partialize: (state) => ({
        // Only persist non-sensitive data
        content: state.content,
      }),
    },
  ),
)
