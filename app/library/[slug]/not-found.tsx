import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { FileX, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardHeader>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileX className="h-8 w-8 text-gray-400" />
            </div>
            <CardTitle className="text-2xl">Content Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-prose-secondary">The content you're looking for doesn't exist or may have been moved.</p>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/library">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Library
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
