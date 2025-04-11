import { Heading } from "@/components/typography/heading"

export default function TermsPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Heading variant="h1" className="mb-8">
            Terms of Service
          </Heading>
        </div>

        <p className="text-gray-700 mb-6">Put your terms of service here.</p>
      </div>
    </div>
  )
}
