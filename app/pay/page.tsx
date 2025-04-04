"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/typography/heading"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LogIn, Coffee } from "lucide-react"
import { StripePaymentForm } from "@/components/checkout/stripe-payment-form"

export default function DonatePage() {
  const { isSignedIn, isLoaded, user } = useUser()
  const [clientSecret, setClientSecret] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDonate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/pay/intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500, // $5.00
        }),
      })
      const data = await response.json()
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error("Error creating payment intent:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuccess = () => {
    setShowSuccess(true)
    setClientSecret("")
  }

  if (!isLoaded) {
    return null
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Support the Project</span>
        <Heading variant="h2" className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
          Buy me a <span className="text-primary">Coffee</span>
        </Heading>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">If you find this project helpful, consider supporting its development with a small donation.</p>
      </div>

      <div className="mx-auto max-w-md mt-12">
        <Card className="p-6">
          {!isSignedIn ? (
            <div className="py-12 text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <LogIn className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-medium">Sign in to Donate</h3>
              <p className="text-sm text-muted-foreground mb-6">You need to be signed in to make a donation.</p>
              <SignInButton mode="modal">
                <Button size="lg">Sign in to Continue</Button>
              </SignInButton>
            </div>
          ) : showSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-green-500/10">
                  <Coffee className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-lg font-medium">Thank You!</h3>
              <p className="text-sm text-muted-foreground text-balance">Your support is greatly appreciated. Thank you for your donation!</p>
            </div>
          ) : clientSecret ? (
            <div className="space-y-6">
              <StripePaymentForm clientSecret={clientSecret} quantity={1} userId={user.id} onSuccess={handleSuccess} discountCode="" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center mb-8">
                <div className="p-4 rounded-full bg-primary/10">
                  <Coffee className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-lg font-medium">Buy me a coffee</h3>
                <p className="text-sm text-muted-foreground">Support this project with a $5 donation</p>
              </div>
              <Button onClick={handleDonate} disabled={isLoading} className="w-full" size="lg">
                {isLoading ? "Loading..." : "Donate $5"}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
