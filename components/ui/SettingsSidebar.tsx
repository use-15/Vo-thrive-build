"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Bell, Shield, HelpCircle } from "lucide-react"

const settingsNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
    icon: User,
    description: "Manage your personal information",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
    description: "Configure your notification preferences",
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: Shield,
    description: "Security and account settings",
  },
  {
    title: "Help & Support",
    href: "/settings/help",
    icon: HelpCircle,
    description: "Get help and contact support",
  },
]

export function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {settingsNavItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-start space-x-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium">{item.title}</div>
              <div className="text-xs text-muted-foreground hidden sm:block">{item.description}</div>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}
