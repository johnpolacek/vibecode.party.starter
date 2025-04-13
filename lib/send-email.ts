import sgMail from "@sendgrid/mail"

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY environment variable")
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  const msg = {
    to,
    from: process.env.SENDGRID_SENDER || "noreply@example.com",
    subject,
    text,
    html: html || text,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error("Error sending email:", error)
    throw error
  }
} 