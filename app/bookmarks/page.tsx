import type { Metadata } from "next"
import BookmarksClientPage from "./BookmarksClientPage"

export const metadata: Metadata = {
  title: "My Bookmarks | Thrive",
  description: "Access your saved wellness content and resources",
}

export default function BookmarksPage() {
  return <BookmarksClientPage />
}
