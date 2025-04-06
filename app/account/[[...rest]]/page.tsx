import { auth } from "@clerk/nextjs/server"
import { Container } from "@/components/ui/container"
import { Card, CardContent } from "@/components/ui/card"
import { SignInButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { AccountProfile } from "./components/account-profile"

export default async function AccountPage() {
  const { userId } = await auth()

  if (!userId) {
    return (
      <Container>
        <div className="py-16">
          <Card className="max-w-xl mx-auto">
            <CardContent className="flex flex-col items-center gap-6 py-16">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Sign in to Access Your Account</h2>
                <p className="text-muted-foreground">Create an account or sign in to manage your profile</p>
              </div>
              <SignInButton mode="modal">
                <Button size="lg">Sign in to Continue</Button>
              </SignInButton>
            </CardContent>
          </Card>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="py-16">
        <AccountProfile />
      </div>
    </Container>
  )
}
