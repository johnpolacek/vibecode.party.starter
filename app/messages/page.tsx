import { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignInButton } from "@clerk/nextjs"
import { Heading } from "@/components/typography/heading"
import { SendHorizonal } from "lucide-react"

export const metadata: Metadata = {
  title: "Send a Message",
  description: "Leave a message for the community",
}

export default async function MessagesPage() {
  const { userId } = await auth()

  return (
    <div className="container max-w-2xl py-8 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>
            <Heading variant="h4">Send a Message</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userId ? (
            // Authenticated user view
            <form className="space-y-4">
              <div className="space-y-2">
                <Input id="message" placeholder="Type your message here..." />
              </div>
              <div className="flex justify-end">
                <Button>
                  <SendHorizonal className="w-4 h-4 mr-1" />
                  Send Message
                </Button>
              </div>
            </form>
          ) : (
            // Non-authenticated user view
            <div className="flex flex-col items-center gap-6 py-16">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Sign in to Send Messages</h2>
                <p className="text-muted-foreground">Create an account or sign in to send messages</p>
              </div>
              <SignInButton mode="modal">
                <Button size="lg">Sign in to Continue</Button>
              </SignInButton>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
