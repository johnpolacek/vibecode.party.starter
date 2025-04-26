import { MailingListForm } from "@/components/forms/mailing-list-form"
import { Heading } from "@/components/typography/heading"
import { getSubscription, unsubscribe } from "@/app/_actions/mailing-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfigCard } from "@/components/admin/config-card"

async function handleUnsubscribe() {
  "use server"
  const result = await getSubscription()
  const subscription = result.success ? result.data : null
  if (!subscription?.email) return
  await unsubscribe(subscription.email)
}

export default async function MailingListPage() {
  // Check if required environment variables are configured
  const missingEnvVars = [
    {
      key: "SENDGRID_API_KEY",
      description: "Your SendGrid API key",
      isMissing: !process.env.SENDGRID_API_KEY,
    },
  ].filter((item) => item.isMissing)

  if (missingEnvVars.length > 0) {
    return (
      <div className="container max-w-2xl py-8 md:py-12">
        <ConfigCard title="Mailing List Setup Required" description="The mailing list feature needs configuration before it can be used." configItems={missingEnvVars} />
      </div>
    )
  }

  const result = await getSubscription()
  const subscription = result.success ? result.data : null

  return (
    <div className="container relative">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-8 py-8 md:py-12">
        <Heading variant="h2" className="text-center leading-tight">
          {subscription ? (
            <>
              {subscription.unsubscribedAt ? (
                <>
                  <span className="text-primary">Unsubscribed</span> <span className="text-muted-foreground">from our mailing list.</span>
                </>
              ) : (
                <>
                  <span className="text-primary">Subscribed</span> <span className="text-muted-foreground">to our mailing list.</span>
                </>
              )}
            </>
          ) : (
            <>
              Join the <span className="text-primary">Mailing List</span>
            </>
          )}
        </Heading>

        {subscription ? (
          <Card className="w-full max-w-[500px] p-4 md:p-8 md:mt-4">
            <CardHeader className="md:pt-4">
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent className="md:pb-4">
              {subscription.unsubscribedAt ? (
                <div className="space-y-4">
                  <p>You are currently unsubscribed. Your previous email was {subscription.email}.</p>
                  <MailingListForm initialEmail={subscription.email} />
                </div>
              ) : (
                <div className="space-y-4">
                  <p>You are currently subscribed with {subscription.email}.</p>
                  <form action={handleUnsubscribe}>
                    <Button variant="destructive" type="submit">
                      Unsubscribe
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <MailingListForm />
        )}
      </div>
    </div>
  )
}
