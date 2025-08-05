import type { Metadata } from "next"
import OfflineClientPage from "./OfflineClientPage"

export const metadata: Metadata = {
  title: "You're Offline",
  description: "You're currently offline. Some features may be limited.",
}

export default function OfflinePage() {
  return <OfflineClientPage />
}
