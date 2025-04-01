"use server"

import { z } from "zod"
import sgMail from "@sendgrid/mail"
import { verifyCaptcha } from "./verifyCaptcha"

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  subject: z.string().default("Contact Form Submission"),
  captchaToken: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate the input data
    const validatedData = contactFormSchema.parse(data)

    // Verify captcha if token is provided
    if (validatedData.captchaToken) {
      try {
        await verifyCaptcha(validatedData.captchaToken)
      } catch (error) {
        console.error("Error verifying captcha:", error)
        return {
          success: false as const,
          error: "reCAPTCHA verification failed. Please try again.",
        }
      }
    }

    // Configure SendGrid
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    // Prepare the email
    const msg = {
      to: process.env.CONTACT_EMAIL!,
      from: process.env.SENDGRID_SENDER!, // Must be verified sender in SendGrid
      replyTo: validatedData.email,
      subject: validatedData.subject,
      text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send the email
    await sgMail.send(msg)

    return {
      success: true as const,
    }
  } catch (error) {
    console.error("Error sending contact email:", error)
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
} 