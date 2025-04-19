import { MailingListForm } from "@/components/forms/mailing-list-form"
import { Heading } from "@/components/typography/heading"
import { getSubscription, unsubscribe } from "@/app/_actions/mailing-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@clerk/nextjs/server"
import { isSupabaseConfigured } from "@/lib/supabase"

async function handleUnsubscribe() {
  "use server"
  const { userId } = await auth()
  if (!userId) return
  await unsubscribe(userId)
}

export default async function MailingListPage() {
  // Check if Supabase is configured
  const hasSupabaseConfig = isSupabaseConfigured()

  if (!hasSupabaseConfig) {
    return (
      <div className="container max-w-2xl py-8 md:py-12">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Setup Required: Mailing List</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">The mailing list feature requires Supabase configuration. Please set up your database first.</p>
            <p className="text-sm text-muted-foreground">
              Add the following to your <code className="px-1.5 py-0.5 bg-muted rounded text-xs">.env</code> file:
            </p>
            <pre className="mt-2 p-3 bg-muted rounded-md text-xs">
              <code>
                NEXT_PUBLIC_SUPABASE_URL=your_project_url{"\n"}
                SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
              </code>
            </pre>
          </CardContent>
        </Card>
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
              {subscription.unsubscribed_at ? (
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
              {subscription.unsubscribed_at ? (
                <div className="space-y-4">
                  <p>You are currently unsubscribed. Your previous email was {subscription.email}.</p>
                  <MailingListForm initialEmail={subscription.email} />
                </div>
              ) : (
                <div className="space-y-4">
                  <p>You are currently subscribed with {subscription.email}. Your preferences are:</p>
                  <ul className="list-inside list-disc">
                    {subscription.preferences.updates && <li>Product Updates</li>}
                    {subscription.preferences.marketing && <li>Marketing Updates</li>}
                  </ul>
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
          <>
            <p className="max-w-[700px] text-center text-muted-foreground text-balance">
              Subscribe to our mailing list to receive updates about new features, special offers, and tips for getting the most out of our products.
            </p>
            <MailingListForm />
          </>
        )}
      </div>
    </div>
  )
}
