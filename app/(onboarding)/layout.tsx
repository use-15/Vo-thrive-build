import type React from "react"
import { ProgressBar } from "@/components/ui/ProgressBar"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <ProgressBar currentStep={1} totalSteps={4} />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
