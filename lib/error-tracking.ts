// Error tracking service wrapper
interface ErrorContext {
  user?: {
    id: string
    email: string
  }
  extra?: Record<string, any>
  tags?: Record<string, string>
}

class ErrorTracker {
  private isEnabled = false

  constructor() {
    this.isEnabled = typeof window !== "undefined" && process.env.NODE_ENV === "production"

    if (this.isEnabled) {
      // Initialize error tracking service (Sentry, Bugsnag, etc.)
      console.log("Error tracking initialized")

      // Set up global error handlers
      this.setupGlobalHandlers()
    }
  }

  private setupGlobalHandlers() {
    // Catch unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.captureException(event.reason, {
        tags: { type: "unhandled_promise_rejection" },
      })
    })

    // Catch global errors
    window.addEventListener("error", (event) => {
      this.captureException(event.error, {
        tags: { type: "global_error" },
      })
    })
  }

  captureException(error: Error | string, context?: ErrorContext) {
    if (!this.isEnabled) {
      console.error("Error captured:", error, context)
      return
    }

    try {
      // Send to your error tracking service
      // Example: Sentry.captureException(error, context)
      console.error("Tracking error:", error, context)
    } catch (trackingError) {
      console.error("Error tracking failed:", trackingError)
    }
  }

  captureMessage(message: string, level: "info" | "warning" | "error" = "info", context?: ErrorContext) {
    if (!this.isEnabled) {
      console.log("Message captured:", message, level, context)
      return
    }

    try {
      // Send to your error tracking service
      // Example: Sentry.captureMessage(message, level, context)
      console.log("Tracking message:", message, level, context)
    } catch (trackingError) {
      console.error("Message tracking failed:", trackingError)
    }
  }

  setUser(user: { id: string; email: string; name?: string }) {
    if (!this.isEnabled) {
      console.log("User context set:", user)
      return
    }

    try {
      // Set user context in your error tracking service
      // Example: Sentry.setUser(user)
      console.log("Setting user context:", user)
    } catch (error) {
      console.error("Failed to set user context:", error)
    }
  }

  addBreadcrumb(message: string, category?: string, data?: Record<string, any>) {
    if (!this.isEnabled) {
      console.log("Breadcrumb:", message, category, data)
      return
    }

    try {
      // Add breadcrumb to your error tracking service
      // Example: Sentry.addBreadcrumb({ message, category, data })
      console.log("Adding breadcrumb:", message, category, data)
    } catch (error) {
      console.error("Failed to add breadcrumb:", error)
    }
  }
}

export const errorTracker = new ErrorTracker()

// Convenience function for API errors
export const handleApiError = (error: any, context?: string) => {
  errorTracker.captureException(error, {
    tags: { type: "api_error", context: context || "unknown" },
    extra: {
      status: error?.status,
      statusText: error?.statusText,
      url: error?.config?.url,
    },
  })
}
