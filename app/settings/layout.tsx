import type React from "react"
import { SettingsSidebar } from "@/components/ui/SettingsSidebar"
import { Card } from "@/components/ui/Card"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar - Hidden on mobile, shown as tabs */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <SettingsSidebar />
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  )
}
