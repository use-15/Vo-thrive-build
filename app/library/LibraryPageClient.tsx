"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { useContentStore } from "@/lib/content-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import Link from "next/link"
import { Search, BookOpen, Clock, Bookmark, BookmarkCheck, Filter } from "lucide-react"
import Image from "next/image"

export default function LibraryPageClient() {
  const { user, initialized, initialize } = useAuthStore()
  const { content, loading, fetchContent, addBookmark, removeBookmark, isBookmarked } = useContentStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [bookmarkLoading, setBookmarkLoading] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialized, initialize])

  useEffect(() => {
    if (initialized && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchContent()
    }
  }, [initialized, user, router, fetchContent])

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(content.map((c) => c.category)))]

  const handleBookmarkToggle = async (contentId: string) => {
    setBookmarkLoading(contentId)

    try {
      if (isBookmarked(contentId)) {
        await removeBookmark(contentId)
      } else {
        await addBookmark(contentId)
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    } finally {
      setBookmarkLoading(null)
    }
  }

  if (!initialized || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Content Library</h1>
        <p className="text-muted-foreground">Discover wellness content to support your journey</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Grid */}
      {filteredContent.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {content.length === 0 ? "No content available" : "No content matches your search"}
            </h3>
            <p className="text-muted-foreground">
              {content.length === 0
                ? "Check back later for new wellness content"
                : "Try adjusting your search or filter criteria"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item) => {
            const bookmarked = isBookmarked(item.id)
            const isBookmarkingInProgress = bookmarkLoading === item.id

            return (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={item.image || `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(item.title)}`}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={() => handleBookmarkToggle(item.id)}
                    disabled={isBookmarkingInProgress}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white disabled:opacity-50"
                    title={bookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    {isBookmarkingInProgress ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    ) : bookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4 text-gray-600" />
                    )}
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.duration || 5} min read
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/library/${item.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
