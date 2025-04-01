import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { unsubscribeFromNotifications } from "@/app/_actions/unsubscribe"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

interface UnsubscribePageProps {
  searchParams: Promise<{
    token?: string
    email?: string
  }>
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const { token, email } = await searchParams
  const { userId } = await auth()
  const isAuthenticated = !!userId

  // If no token or email provided, show error
  if (!token || !email) {
    return (
      <div className="container max-w-lg py-8">
        <Card>
          <CardHeader>
            <CardTitle>Invalid Unsubscribe Link</CardTitle>
            <CardDescription>This unsubscribe link appears to be invalid or incomplete.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>If you want to manage your notification preferences, please {isAuthenticated ? "visit your profile" : "sign in to your account"}.</p>
            <div className="flex justify-end">
              <Button asChild>
                <Link href={isAuthenticated ? "/profile" : "/sign-in"}>{isAuthenticated ? "Go to Profile" : "Sign In"}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Process unsubscribe request
  const result = await unsubscribeFromNotifications(token, email)

  if (result.success) {
    return (
      <div className="container max-w-lg py-8 sm:py-16">
        <Card>
          <CardHeader>
            <CardTitle>Successfully Unsubscribed</CardTitle>
            <CardDescription>You have been unsubscribed from all hackathon notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAuthenticated ? (
              <>
                <p>
                  You can enable notifications for specific hackathons you&apos;re participating in by visiting the{" "}
                  <Link href="/hackathons" className="underline">
                    hackathons page
                  </Link>
                  .
                </p>
                <div className="flex justify-end pt-4">
                  <Button asChild>
                    <Link href="/hackathons">View Hackathons</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p>If you change your mind, you can always re-enable notifications by signing in to your account and updating your preferences.</p>
                <div className="flex justify-end">
                  <Button asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-lg py-8">
      <Card>
        <CardHeader>
          <CardTitle>Unsubscribe Failed</CardTitle>
          <CardDescription>We were unable to process your unsubscribe request.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{result.error || "An unknown error occurred. Please try again or contact support if the problem persists."}</p>
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
