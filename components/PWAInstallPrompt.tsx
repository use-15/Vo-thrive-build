"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isInWebAppiOS = (window.navigator as any).standalone === true

    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Show prompt after a delay (don't be too aggressive)
      setTimeout(() => {
        const hasSeenPrompt = localStorage.getItem("pwa-install-prompt-seen")
        const lastPromptTime = localStorage.getItem("pwa-install-prompt-time")
        const now = Date.now()
        const oneWeek = 7 * 24 * 60 * 60 * 1000

        // Show if never seen, or if it's been more than a week
        if (!hasSeenPrompt || (lastPromptTime && now - Number.parseInt(lastPromptTime) > oneWeek)) {
          setShowPrompt(true)
        }
      }, 3000)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log("PWA was installed")
      setIsInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      console.log(`User response to install prompt: ${outcome}`)

      // Track the interaction
      localStorage.setItem("pwa-install-prompt-seen", "true")
      localStorage.setItem("pwa-install-prompt-time", Date.now().toString())

      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error("Error showing install prompt:", error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-install-prompt-seen", "true")
    localStorage.setItem("pwa-install-prompt-time", Date.now().toString())
  }

  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <Card className="shadow-lg border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">T</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">Install Thrive</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Get quick access to your wellness journey. Install our app for a better experience.
              </p>
              <div className="flex space-x-2 mt-3">
                <Button size="sm" onClick={handleInstallClick} className="text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Install
                </Button>
                <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-xs">
                  Not now
                </Button>
              </div>
            </div>
            <Button size="icon" variant="ghost" onClick={handleDismiss} className="h-6 w-6 flex-shrink-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
