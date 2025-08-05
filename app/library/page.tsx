import type { Metadata } from "next"
import LibraryPageClient from "./LibraryPageClient"

export const metadata: Metadata = {
  title: "Content Library",
  description:
    "Discover articles, videos, and audio content to support your wellness journey. Expert-curated content on meditation, fitness, nutrition, and mindfulness.",
  keywords: ["wellness content", "meditation articles", "fitness videos", "nutrition guides", "mindfulness resources"],
}

export default function LibraryPage() {
  return <LibraryPageClient />
}
