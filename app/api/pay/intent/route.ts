import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { stripe, isStripeConfigured } from "@/lib/stripe"

export async function POST(request: Request) {
  try {
    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      )
    }

    // Check authentication
    const authResult = await auth()
    if (!authResult.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount } = await request.json()

    // We can safely use stripe here because we checked isStripeConfigured()
    const paymentIntent = await stripe!.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        userId: authResult.userId,
        type: "donation"
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json(
      { error: "Error creating payment intent" },
      { status: 500 }
    )
  }
} 