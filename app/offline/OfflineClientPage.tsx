"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { WifiOff, RefreshCw } from "lucide-react"

export default function OfflineClientPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardHeader>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <WifiOff className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-2xl">You're Offline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              It looks like you're not connected to the internet. Don't worry - you can still view your cached content
              and any changes will sync when you're back online.
            </p>

            <div className="space-y-2">
              <Button onClick={() => window.location.reload()} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>

              <Button variant="outline" onClick={() => window.history.back()} className="w-full bg-transparent">
                Go Back
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Available offline:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>View your dashboard</li>
                <li>Browse cached content</li>
                <li>Update habits (will sync later)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
