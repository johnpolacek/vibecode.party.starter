import { Heading } from "@/components/typography/heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UnsubscribeForm from "./unsubscribe-form"

export default function UnsubscribePage() {
  return (
    <div className="container max-w-md py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            <Heading variant="h2" className="text-center">
              Unsubscribe from Mailing List
            </Heading>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UnsubscribeForm />
        </CardContent>
      </Card>
    </div>
  )
}
