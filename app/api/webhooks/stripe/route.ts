import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe, isStripeConfigured } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
  // Check if Stripe is configured
  if (!isStripeConfigured() || !webhookSecret) {
    return NextResponse.json(
      { error: "Payment system not configured" },
      { status: 503 }
    )
  }

  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  try {
    const event = stripe!.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    console.log(`Processing Stripe webhook event: ${event.type}`)

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update sponsor record payment status
        const { error } = await supabaseAdmin
          .from("hackathon_sponsors")
          .update({
            payment_status: "paid",
            stripe_payment_intent_id: session.payment_intent as string,
            paid_at: new Date().toISOString()
          })
          .eq("stripe_session_id", session.id)

        if (error) {
          console.error("Error updating sponsor payment status:", error)
          return NextResponse.json(
            { error: "Failed to update sponsor payment status" },
            { status: 500 }
          )
        }

        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Update sponsor record payment status to failed
        const { error } = await supabaseAdmin
          .from("hackathon_sponsors")
          .update({
            payment_status: "failed"
          })
          .eq("stripe_payment_intent_id", paymentIntent.id)

        if (error) {
          console.error("Error updating sponsor payment status:", error)
          return NextResponse.json(
            { error: "Failed to update sponsor payment status" },
            { status: 500 }
          )
        }

        break
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge
        
        if (!charge.payment_intent) {
          console.error("No payment intent ID found in refunded charge")
          return NextResponse.json(
            { error: "Missing payment intent ID" },
            { status: 400 }
          )
        }

        // Update sponsor record payment status to refunded
        const { error } = await supabaseAdmin
          .from("hackathon_sponsors")
          .update({
            payment_status: "refunded"
          })
          .eq("stripe_payment_intent_id", charge.payment_intent as string)

        if (error) {
          console.error("Error updating sponsor payment status:", error)
          return NextResponse.json(
            { error: "Failed to update sponsor payment status" },
            { status: 500 }
          )
        }

        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Error processing webhook:", err)
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    )
  }
} 