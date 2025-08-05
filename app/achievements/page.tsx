import type { Metadata } from "next"
import AchievementsClientPage from "./AchievementsClientPage"

export const metadata: Metadata = {
  title: "Achievements | Thrive",
  description: "Track your wellness milestones and unlock achievements",
}

export default function AchievementsPage() {
  return <AchievementsClientPage />
}
