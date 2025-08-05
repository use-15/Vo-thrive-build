import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { mockContent, type ContentItem } from "@/lib/mock-data"
import { ArrowLeft, Play, Headphones, Clock, User, Calendar } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

// Generate static params for popular content
export async function generateStaticParams() {
  const popularSlugs = ["morning-meditation-guide", "hiit-workout-beginners", "healthy-meal-prep-sunday"]
  return popularSlugs.map((slug) => ({ slug }))
}

async function getContentBySlug(slug: string): Promise<ContentItem | null> {
  return mockContent.find((item) => item.slug === slug) || null
}

interface ContentViewerPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ContentViewerPageProps): Promise<Metadata> {
  const content = await getContentBySlug(params.slug)

  if (!content) {
    return {
      title: "Content Not Found",
      description: "The requested content could not be found.",
    }
  }

  return {
    title: content.title,
    description: content.description,
    keywords: [content.category, content.type, "wellness", "personal growth"],
    authors: [{ name: content.author }],
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      publishedTime: content.publishedAt,
      authors: [content.author],
      images: [
        {
          url: content.thumbnail || "/placeholder.svg",
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [content.thumbnail || "/placeholder.svg"],
    },
  }
}

export default async function ContentViewerPage({ params }: ContentViewerPageProps) {
  const content = await getContentBySlug(params.slug)

  if (!content) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/library">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Library
          </Link>
        </Button>
      </div>

      {/* Content Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-prose-secondary capitalize bg-gray-100 px-2 py-1 rounded">
            {content.category}
          </span>
          <span className="text-xs text-prose-secondary capitalize bg-primary/10 text-primary px-2 py-1 rounded">
            {content.type}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
        <p className="text-xl text-prose-secondary mb-6">{content.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-prose-secondary">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{content.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={content.publishedAt}>
              {new Date(content.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          {content.duration && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{content.duration}</span>
            </div>
          )}
        </div>
      </header>

      {/* Content Body */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {content.type === "article" && content.content && (
            <article className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: content.content
                    .replace(/\n/g, "<br>")
                    .replace(/#{1,6}\s/g, (match) => `<h${match.length - 1}>`)
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            </article>
          )}

          {content.type === "video" && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Video Player</p>
                      <p className="text-sm text-gray-500">
                        {content.videoUrl ? "Video would load here" : "Video not available"}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Play Video
                  </Button>
                </CardContent>
              </Card>

              {content.content && (
                <div className="prose prose-lg max-w-none">
                  <p>{content.content}</p>
                </div>
              )}
            </div>
          )}

          {content.type === "audio" && (
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-8 text-center mb-4">
                    <Headphones className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Audio Player</h3>
                    <p className="text-gray-600">
                      {content.audioUrl ? "Audio would load here" : "Audio not available"}
                    </p>
                  </div>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Play Audio
                  </Button>
                </CardContent>
              </Card>

              {content.content && (
                <div className="prose prose-lg max-w-none">
                  <p>{content.content}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">About this {content.type}</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium inline">Category:</dt>
                  <dd className="ml-2 capitalize inline">{content.category}</dd>
                </div>
                <div>
                  <dt className="font-medium inline">Author:</dt>
                  <dd className="ml-2 inline">{content.author}</dd>
                </div>
                {content.duration && (
                  <div>
                    <dt className="font-medium inline">Duration:</dt>
                    <dd className="ml-2 inline">{content.duration}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium inline">Published:</dt>
                  <dd className="ml-2 inline">
                    <time dateTime={content.publishedAt}>{new Date(content.publishedAt).toLocaleDateString()}</time>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Related Content</h3>
              <div className="space-y-3">
                {mockContent
                  .filter((item) => item.category === content.category && item.id !== content.id)
                  .slice(0, 3)
                  .map((item) => (
                    <Link key={item.id} href={`/library/${item.slug}`}>
                      <div className="flex space-x-3 p-2 rounded hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                          <p className="text-xs text-prose-secondary">{item.author}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
