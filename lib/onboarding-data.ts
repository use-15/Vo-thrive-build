export interface OnboardingQuestion {
  id: string
  question: string
  options: {
    id: string
    label: string
    description?: string
    emoji?: string
  }[]
}

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "1",
    question: "What's your primary wellness goal?",
    options: [
      {
        id: "fitness",
        label: "Improve Physical Fitness",
        description: "Build strength, endurance, and overall health",
        emoji: "💪",
      },
      {
        id: "mindfulness",
        label: "Enhance Mental Wellbeing",
        description: "Reduce stress and increase mindfulness",
        emoji: "🧘",
      },
      {
        id: "nutrition",
        label: "Better Nutrition",
        description: "Develop healthy eating habits",
        emoji: "🥗",
      },
      {
        id: "sleep",
        label: "Improve Sleep Quality",
        description: "Get better rest and recovery",
        emoji: "😴",
      },
    ],
  },
  {
    id: "2",
    question: "How much time can you dedicate daily?",
    options: [
      {
        id: "15min",
        label: "15 minutes",
        description: "Quick daily habits",
        emoji: "⚡",
      },
      {
        id: "30min",
        label: "30 minutes",
        description: "Moderate commitment",
        emoji: "⏰",
      },
      {
        id: "60min",
        label: "1 hour",
        description: "Dedicated practice time",
        emoji: "🎯",
      },
      {
        id: "flexible",
        label: "Flexible",
        description: "Varies day to day",
        emoji: "🔄",
      },
    ],
  },
  {
    id: "3",
    question: "What's your experience level?",
    options: [
      {
        id: "beginner",
        label: "Beginner",
        description: "Just starting my wellness journey",
        emoji: "🌱",
      },
      {
        id: "intermediate",
        label: "Intermediate",
        description: "Some experience with healthy habits",
        emoji: "🌿",
      },
      {
        id: "advanced",
        label: "Advanced",
        description: "Well-established wellness routine",
        emoji: "🌳",
      },
    ],
  },
]

export function getQuestionById(id: string): OnboardingQuestion | undefined {
  return onboardingQuestions.find((q) => q.id === id)
}

export function getNextStepId(currentId: string): string | null {
  const currentIndex = onboardingQuestions.findIndex((q) => q.id === currentId)
  if (currentIndex === -1 || currentIndex === onboardingQuestions.length - 1) {
    return null
  }
  return onboardingQuestions[currentIndex + 1].id
}
