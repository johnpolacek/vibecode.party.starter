import { Heading } from "@/components/typography/heading"
export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Heading variant="h2" as="h1">
            About
          </Heading>
        </div>

        <div className="mb-8 space-y-6">
          <p>Replace this with your about page content...</p>
        </div>
      </div>
    </div>
  )
}
