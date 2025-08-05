export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          bio: string | null
          location: string | null
          website: string | null
          avatar_url: string | null
          onboarding_completed: boolean
          wellness_goals: string[] | null
          time_commitment: string | null
          experience_level: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          wellness_goals?: string[] | null
          time_commitment?: string | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          wellness_goals?: string[] | null
          time_commitment?: string | null
          experience_level?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: "fitness" | "mindfulness" | "nutrition" | "sleep"
          emoji: string
          target_frequency: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: "fitness" | "mindfulness" | "nutrition" | "sleep"
          emoji?: string
          target_frequency?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: "fitness" | "mindfulness" | "nutrition" | "sleep"
          emoji?: string
          target_frequency?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      habit_completions: {
        Row: {
          id: string
          habit_id: string
          user_id: string
          completed_at: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          habit_id: string
          user_id: string
          completed_at?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          habit_id?: string
          user_id?: string
          completed_at?: string
          notes?: string | null
          created_at?: string
        }
      }
      content: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          content: string | null
          category: "meditation" | "workouts" | "nutrition" | "sleep" | "mindfulness"
          type: "article" | "video" | "audio"
          thumbnail_url: string | null
          video_url: string | null
          audio_url: string | null
          duration: string | null
          author: string
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          content?: string | null
          category: "meditation" | "workouts" | "nutrition" | "sleep" | "mindfulness"
          type: "article" | "video" | "audio"
          thumbnail_url?: string | null
          video_url?: string | null
          audio_url?: string | null
          duration?: string | null
          author: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description?: string | null
          content?: string | null
          category?: "meditation" | "workouts" | "nutrition" | "sleep" | "mindfulness"
          type?: "article" | "video" | "audio"
          thumbnail_url?: string | null
          video_url?: string | null
          audio_url?: string | null
          duration?: string | null
          author?: string
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          notifications: Json
          quiet_hours: Json
          theme: string
          language: string
          timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          notifications?: Json
          quiet_hours?: Json
          theme?: string
          language?: string
          timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          notifications?: Json
          quiet_hours?: Json
          theme?: string
          language?: string
          timezone?: string
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          content_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_habit_streak: {
        Args: {
          habit_uuid: string
        }
        Returns: number
      }
      get_weekly_progress: {
        Args: {
          user_uuid: string
        }
        Returns: {
          day_name: string
          completed: number
          total: number
        }[]
      }
    }
    Enums: {
      habit_category: "fitness" | "mindfulness" | "nutrition" | "sleep"
      content_type: "article" | "video" | "audio"
      content_category: "meditation" | "workouts" | "nutrition" | "sleep" | "mindfulness"
    }
  }
}
