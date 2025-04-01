"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { sendContactEmail } from "@/app/_actions/contact"
import { useTheme } from "next-themes"
import ReCAPTCHA from "react-google-recaptcha"

interface ContactFormProps {
  subject?: string
  onSuccess?: () => void
  requireCaptcha?: boolean
}

export function ContactForm({ subject = "Contact Message", onSuccess, requireCaptcha = false }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const { theme } = useTheme()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      subject,
      ...(requireCaptcha && captchaToken && { captchaToken }),
    }

    try {
      if (requireCaptcha && !captchaToken) {
        throw new Error("Please complete the reCAPTCHA verification")
      }

      const result = await sendContactEmail(data)

      if (result.success) {
        toast.success("Message sent", {
          description: "We'll get back to you as soon as possible.",
        })
        onSuccess?.()
        // Reset form
        event.currentTarget.reset()
        setCaptchaToken(null)
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      const error = err as Error
      toast.error("Error", {
        description: error.message || "There was a problem sending your message. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="your@email.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Your message" required />
        </div>
        {requireCaptcha && (
          <div className="w-full">
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} theme={theme === "dark" ? "dark" : "light"} onChange={(value) => setCaptchaToken(value)} />
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="submit" disabled={isLoading || (requireCaptcha && !captchaToken)}>
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  )
}
