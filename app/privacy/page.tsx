import { Heading } from "@/components/typography/heading"

export default function PrivacyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Heading variant="h1" className="mb-8">
            Privacy Policy
          </Heading>
        </div>

        <p className="text-gray-700 mb-6">Put your privacy policy here.</p>
      </div>
    </div>
  )
}
