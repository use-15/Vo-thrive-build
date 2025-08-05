"use client"

import { useState, useEffect } from "react"

interface OfflineAction {
  id: string
  type: string
  data: any
  timestamp: number
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([])

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true)
      syncPendingActions()
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Load pending actions from localStorage
    loadPendingActions()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadPendingActions = () => {
    try {
      const stored = localStorage.getItem("offline-actions")
      if (stored) {
        setPendingActions(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Failed to load pending actions:", error)
    }
  }

  const savePendingActions = (actions: OfflineAction[]) => {
    try {
      localStorage.setItem("offline-actions", JSON.stringify(actions))
      setPendingActions(actions)
    } catch (error) {
      console.error("Failed to save pending actions:", error)
    }
  }

  const addOfflineAction = (type: string, data: any) => {
    const action: OfflineAction = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
    }

    const newActions = [...pendingActions, action]
    savePendingActions(newActions)

    // If online, try to sync immediately
    if (isOnline) {
      syncAction(action)
    }
  }

  const syncAction = async (action: OfflineAction) => {
    try {
      let endpoint = ""
      let method = "POST"

      switch (action.type) {
        case "habit-toggle":
          endpoint = "/api/habits/toggle"
          break
        case "profile-update":
          endpoint = "/api/user/profile"
          method = "PUT"
          break
        case "settings-update":
          endpoint = "/api/user/settings"
          method = "PUT"
          break
        default:
          console.warn("Unknown action type:", action.type)
          return
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      })

      if (response.ok) {
        // Remove synced action
        const updatedActions = pendingActions.filter((a) => a.id !== action.id)
        savePendingActions(updatedActions)
        console.log("Action synced successfully:", action.type)
      } else {
        console.error("Failed to sync action:", response.statusText)
      }
    } catch (error) {
      console.error("Sync error:", error)
    }
  }

  const syncPendingActions = async () => {
    if (!isOnline || pendingActions.length === 0) return

    console.log("Syncing pending actions:", pendingActions.length)

    for (const action of pendingActions) {
      await syncAction(action)
    }
  }

  const clearPendingActions = () => {
    localStorage.removeItem("offline-actions")
    setPendingActions([])
  }

  return {
    isOnline,
    pendingActions,
    addOfflineAction,
    syncPendingActions,
    clearPendingActions,
  }
}
