"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ContactForm } from "./contact-form"

interface ContactDialogProps {
  trigger: React.ReactNode
  subject?: string
}

export function ContactDialog({ trigger, subject }: ContactDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>Send us a message and we&apos;ll get back to you as soon as possible.</DialogDescription>
        </DialogHeader>
        <ContactForm subject={subject} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
