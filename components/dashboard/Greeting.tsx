import { useAuthStore } from "@/lib/store"

export function Greeting() {
  const user = useAuthStore((state) => state.user)

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const firstName = user?.name?.split(" ")[0] || "there"

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">
        {getTimeBasedGreeting()}, {firstName}!
      </h1>
      <p className="text-prose-secondary">Ready to make today amazing? Let's check your progress.</p>
    </div>
  )
}
