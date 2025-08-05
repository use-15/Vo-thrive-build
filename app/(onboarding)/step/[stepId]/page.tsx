"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { getQuestionById, getNextStepId, onboardingQuestions } from "@/lib/onboarding-data"
import { ProgressBar } from "@/components/ui/ProgressBar"
import { useAuthStore } from "@/lib/auth-store"

interface OnboardingStepPageProps {
  params: {
    stepId: string
  }
}

export default function OnboardingStepPage({ params }: OnboardingStepPageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { completeOnboarding } = useAuthStore()

  const question = getQuestionById(params.stepId)
  const currentStepIndex = onboardingQuestions.findIndex((q) => q.id === params.stepId)
  const currentStep = currentStepIndex + 1
  const totalSteps = onboardingQuestions.length

  useEffect(() => {
    // Load saved answers from localStorage
    const savedAnswers = localStorage.getItem("onboarding-answers")
    if (savedAnswers) {
      const parsed = JSON.parse(savedAnswers)
      setAnswers(parsed)
      setSelectedOption(parsed[params.stepId] || null)
    }
  }, [params.stepId])

  if (!question) {
    router.push("/onboarding/welcome")
    return null
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNext = async () => {
    if (!selectedOption) return

    setIsLoading(true)

    // Save answer
    const newAnswers = { ...answers, [params.stepId]: selectedOption }
    setAnswers(newAnswers)
    localStorage.setItem("onboarding-answers", JSON.stringify(newAnswers))

    // Navigate to next step or complete onboarding
    const nextStepId = getNextStepId(params.stepId)
    if (nextStepId) {
      router.push(`/onboarding/step/${nextStepId}`)
    } else {
      // Complete onboarding - save to Supabase
      try {
        const wellness_goals = [newAnswers["1"]] // Primary goal
        const time_commitment = newAnswers["2"]
        const experience_level = newAnswers["3"]

        const { error } = await completeOnboarding({
          wellness_goals,
          time_commitment,
          experience_level,
        })

        if (error) {
          console.error("Error completing onboarding:", error)
          // Still proceed to dashboard
        }

        localStorage.removeItem("onboarding-answers")
        router.push("/dashboard")
      } catch (error) {
        console.error("Error completing onboarding:", error)
        router.push("/dashboard")
      }
    }

    setIsLoading(false)
  }

  return (
    <div>
      <div className="mb-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {question.options.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedOption === option.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-gray-50"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {option.emoji && <div className="text-2xl">{option.emoji}</div>}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{option.label}</h3>
                      {option.description && <p className="text-prose-secondary mt-1">{option.description}</p>}
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedOption === option.id ? "bg-primary border-primary" : "border-gray-300"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedOption} isLoading={isLoading}>
              {getNextStepId(params.stepId) ? "Next" : "Complete Setup"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
