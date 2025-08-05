import type { Metadata } from "next"
import AnalyticsClientPage from "./AnalyticsClientPage"

export const metadata: Metadata = {
  title: "Analytics | Thrive",
  description: "Track your wellness progress with detailed analytics and insights",
}

export default function AnalyticsPage() {
  return <AnalyticsClientPage />
}
