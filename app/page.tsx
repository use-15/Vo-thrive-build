import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Transform Your Life with <span className="text-primary">Thrive</span>
        </h1>
        <p className="text-xl text-prose-secondary mb-8 max-w-2xl mx-auto">
          Build lasting habits, achieve your wellness goals, and unlock your full potential with personalized guidance
          and support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Personalized Goals</h3>
          <p className="text-prose-secondary">
            Set and track meaningful goals tailored to your unique lifestyle and aspirations.
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-secondary text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Expert Content</h3>
          <p className="text-prose-secondary">
            Access curated articles, videos, and resources from wellness experts and thought leaders.
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-accent text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-prose-secondary">
            Visualize your journey with detailed analytics and celebrate your achievements.
          </p>
        </Card>
      </section>
    </div>
  )
}
