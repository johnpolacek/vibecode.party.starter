"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { PaymentElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  quantity: number
  userId: string
  onSuccess?: () => void
  discountCode: string
}

function PaymentForm({ quantity, userId, onSuccess, discountCode }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements || loading) return

    setLoading(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      })

      if (error) {
        console.error("Payment error:", error)
        return
      }

      if (paymentIntent.status === "succeeded") {
        await fetch("/api/credits/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            userId,
            quantity,
            discountCode,
          }),
        })

        onSuccess?.()
      }
    } catch (error) {
      console.error("Payment processing error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="max-h-[400px] overflow-y-auto pr-2">
        <PaymentElement />
      </div>
      <Button type="submit" disabled={!stripe || loading} className="w-full mt-4">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}

interface StripePaymentFormProps extends PaymentFormProps {
  clientSecret: string
}

export function StripePaymentForm({ clientSecret, quantity, userId, onSuccess, discountCode }: StripePaymentFormProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm quantity={quantity} userId={userId} onSuccess={onSuccess} discountCode={discountCode} />
    </Elements>
  )
}
