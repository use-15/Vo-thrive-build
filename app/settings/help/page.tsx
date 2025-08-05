import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { HelpCircle, Mail, MessageCircle, Book, ExternalLink } from "lucide-react"

const faqItems = [
  {
    question: "How do I create a new habit?",
    answer:
      "You can create new habits from your dashboard by clicking the 'Add Habit' button. Choose from our templates or create a custom habit that fits your goals.",
  },
  {
    question: "Can I change my wellness goals after onboarding?",
    answer:
      "Yes! You can update your goals anytime in the Settings > Profile section. Your recommendations will automatically adjust to your new preferences.",
  },
  {
    question: "How does the streak system work?",
    answer:
      "Streaks count consecutive days you complete a habit. If you miss a day, your streak resets to 0. Don't worry - progress isn't lost, just the consecutive count.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use industry-standard encryption and never share your personal data with third parties. You can export or delete your data anytime.",
  },
]

export default function HelpPage() {
  return (
    <div className="space-y-6">
      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Get Help
          </CardTitle>
          <CardDescription>Need assistance? We're here to help you succeed on your wellness journey.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Email Support</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get detailed help via email. We typically respond within 24 hours.
              </p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="mailto:support@thrive.app">
                  Contact Support
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-3">
                <MessageCircle className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Live Chat</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Chat with our support team in real-time during business hours.
              </p>
              <Button className="w-full">Start Live Chat</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Quick answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>Learn more about making the most of Thrive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/library">
                <Book className="h-4 w-4 mr-2" />
                Browse Wellness Content
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/privacy-policy">
                <ExternalLink className="h-4 w-4 mr-2" />
                Privacy Policy
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start bg-transparent">
              <Link href="/terms-of-service">
                <ExternalLink className="h-4 w-4 mr-2" />
                Terms of Service
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
