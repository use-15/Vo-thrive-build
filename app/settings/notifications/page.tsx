"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Bell, Mail, Smartphone, Clock } from "lucide-react"
import { notificationManager, requestNotificationPermission } from "@/lib/notifications"

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
  type: "email" | "push" | "in-app"
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "habit-reminders",
      title: "Habit Reminders",
      description: "Get reminded when it's time to complete your daily habits",
      enabled: true,
      type: "push",
    },
    {
      id: "weekly-progress",
      title: "Weekly Progress Report",
      description: "Receive a summary of your weekly progress every Sunday",
      enabled: true,
      type: "email",
    },
    {
      id: "new-content",
      title: "New Content",
      description: "Be notified when new articles, videos, or audio content is available",
      enabled: false,
      type: "in-app",
    },
    {
      id: "streak-milestones",
      title: "Streak Milestones",
      description: "Celebrate when you reach habit streak milestones",
      enabled: true,
      type: "push",
    },
    {
      id: "community-updates",
      title: "Community Updates",
      description: "Updates about community challenges and events",
      enabled: false,
      type: "email",
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>("default")

  useEffect(() => {
    setNotificationPermission(notificationManager.permissionStatus)
  }, [])

  const toggleSetting = (id: string) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const saveSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Notification settings saved successfully!")
    } catch (error) {
      alert("Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission()
    setNotificationPermission(granted ? "granted" : "denied")

    if (granted) {
      // Enable habit reminders by default
      setSettings((prev) =>
        prev.map((setting) => (setting.id === "habit-reminders" ? { ...setting, enabled: true } : setting)),
      )
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "push":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "email":
        return "text-blue-600 bg-blue-50"
      case "push":
        return "text-green-600 bg-green-50"
      default:
        return "text-purple-600 bg-purple-50"
    }
  }

  return (
    <div className="space-y-6">
      {notificationPermission !== "granted" && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center text-yellow-800">
              <Bell className="h-5 w-5 mr-2" />
              Enable Notifications
            </CardTitle>
            <CardDescription className="text-yellow-700">
              Allow notifications to receive habit reminders and progress updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRequestPermission} className="bg-yellow-600 hover:bg-yellow-700">
              Enable Notifications
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how and when you want to receive notifications from Thrive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Settings */}
          <div className="space-y-4">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`p-2 rounded-full ${getTypeColor(setting.type)}`}>{getTypeIcon(setting.type)}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{setting.description}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2 capitalize">
                      {setting.type}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button
                    onClick={() => toggleSetting(setting.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                      setting.enabled ? "bg-primary" : "bg-gray-200"
                    }`}
                    role="switch"
                    aria-checked={setting.enabled}
                    aria-labelledby={`${setting.id}-label`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quiet Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Quiet Hours
              </CardTitle>
              <CardDescription>Set times when you don't want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="quiet-start" className="text-sm font-medium">
                    Start Time
                  </label>
                  <input
                    id="quiet-start"
                    type="time"
                    defaultValue="22:00"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="quiet-end" className="text-sm font-medium">
                    End Time
                  </label>
                  <input
                    id="quiet-end"
                    type="time"
                    defaultValue="08:00"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={saveSettings} isLoading={isLoading}>
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
