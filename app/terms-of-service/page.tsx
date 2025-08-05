import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Thrive's wellness platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p>
            By accessing and using Thrive, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use License</h2>
          <p>Permission is granted to temporarily use Thrive for personal, non-commercial transitory viewing only.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password and for restricting
            access to your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p>
            Questions about the Terms of Service should be sent to us at{" "}
            <a href="mailto:legal@thrive.app" className="text-primary hover:underline">
              legal@thrive.app
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
