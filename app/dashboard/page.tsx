import type { Metadata } from "next"
import DashboardClientPage from "./DashboardClientPage"

export const metadata: Metadata = {
  title: "Dashboard | Thrive",
  description: "Your personal wellness dashboard - track habits, view progress, and stay motivated",
  keywords: ["wellness dashboard", "habit tracking", "personal growth", "health metrics"],
}

export default function DashboardPage() {
  return <DashboardClientPage />
}
