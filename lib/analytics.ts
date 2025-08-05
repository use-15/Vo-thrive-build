// Analytics wrapper for tracking key events
interface AnalyticsEvent {
  name: string
  properties?: Record<string, any>
}

class Analytics {
  private isEnabled = false

  constructor() {
    // Initialize analytics service (Vercel Analytics, Segment, etc.)
    this.isEnabled = typeof window !== "undefined" && process.env.NODE_ENV === "production"

    if (this.isEnabled) {
      // Initialize your analytics service here
      console.log("Analytics initialized")
    }
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) {
      console.log("Analytics Event:", event)
      return
    }

    try {
      // Send to your analytics service
      // Example: analytics.track(event.name, event.properties)
      console.log("Tracking:", event)
    } catch (error) {
      console.error("Analytics error:", error)
    }
  }

  identify(userId: string, traits?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log("Analytics Identify:", { userId, traits })
      return
    }

    try {
      // Identify user in your analytics service
      // Example: analytics.identify(userId, traits)
      console.log("Identifying user:", userId, traits)
    } catch (error) {
      console.error("Analytics identify error:", error)
    }
  }

  page(name: string, properties?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log("Analytics Page:", { name, properties })
      return
    }

    try {
      // Track page view
      // Example: analytics.page(name, properties)
      console.log("Page view:", name, properties)
    } catch (error) {
      console.error("Analytics page error:", error)
    }
  }
}

export const analytics = new Analytics()

// Convenience functions for common events
export const trackEvent = {
  userLogin: (method: string) => {
    analytics.track({
      name: "user_login",
      properties: { method },
    })
  },

  habitCompleted: (habitId: string, habitName: string) => {
    analytics.track({
      name: "habit_completed",
      properties: { habitId, habitName },
    })
  },

  contentViewed: (contentId: string, contentType: string, contentTitle: string) => {
    analytics.track({
      name: "content_viewed",
      properties: { contentId, contentType, contentTitle },
    })
  },

  onboardingCompleted: (goals: string[], timeCommitment: string, experienceLevel: string) => {
    analytics.track({
      name: "onboarding_completed",
      properties: { goals, timeCommitment, experienceLevel },
    })
  },

  settingsUpdated: (section: string) => {
    analytics.track({
      name: "settings_updated",
      properties: { section },
    })
  },
}
