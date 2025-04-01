import { NextRequest, NextResponse } from "next/server"
import sgMail from "@sendgrid/mail"

export async function POST(request: NextRequest) {
  try {
    // Parse the multipart form data from SendGrid
    const formData = await request.formData()
    const from = formData.get("from") as string
    const subject = formData.get("subject") as string
    const text = formData.get("text") as string
    const html = formData.get("html") as string

    // Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // Forward the email to the contact email
    const msg = {
      to: process.env.CONTACT_EMAIL!,
      from: process.env.SENDGRID_SENDER!,
      replyTo: from,
      subject: `[Forwarded] ${subject}`,
      text: `Original From: ${from}\n\n${text}`,
      html: `
        <p><strong>Original From:</strong> ${from}</p>
        <hr/>
        ${html}
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing inbound email:", error)
    return NextResponse.json(
      { error: "Failed to process inbound email" },
      { status: 500 }
    )
  }
} 