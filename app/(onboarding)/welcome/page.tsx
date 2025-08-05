"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useAuthStore } from "@/lib/store"

export default function WelcomePage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  const handleGetStarted = () => {
    router.push("/onboarding/step/1")
  }

  return (
    <div className="text-center">
      <Card className="p-8">
        <CardHeader>
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl">👋</span>
          </div>
          <CardTitle className="text-3xl mb-4">Welcome to Thrive, {user?.name?.split(" ")[0] || "there"}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-prose-secondary">
            We're excited to help you build lasting habits and achieve your wellness goals. Let's start by learning a
            bit about you and what you'd like to accomplish.
          </p>

          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="font-semibold mb-2">What to expect:</h3>
            <ul className="text-left space-y-2 text-prose-secondary">
              <li>• A few quick questions about your goals</li>
              <li>• Personalized recommendations based on your preferences</li>
              <li>• Your custom dashboard setup</li>
            </ul>
          </div>

          <p className="text-sm text-prose-secondary">This will only take 2-3 minutes to complete.</p>

          <Button onClick={handleGetStarted} size="lg" className="w-full sm:w-auto">
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
