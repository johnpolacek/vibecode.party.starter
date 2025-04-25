"use client"
import { Card } from "@/components/ui/card"
import { Heading } from "@/components/typography/heading"
import { useState } from "react"
import { Copy, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GetStartedExampleProps {
  title: string
  prompt: string
  children?: React.ReactNode
  isCommand?: boolean
}
export default function GetStartedExample({ title, prompt, children, isCommand }: GetStartedExampleProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer relative group" onClick={copyToClipboard}>
      <Button
        size="icon"
        variant="outline"
        className="absolute top-6 right-6 h-8 w-8 transition-opacity opacity-70 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation()
          copyToClipboard()
        }}
      >
        {copied ? <Check className="h-4 w-4 text-green-600 scale-125" /> : <Copy className="h-4 w-4" />}
      </Button>
      <Heading variant="h6">{title}</Heading>
      {children}
      <pre className="bg-muted/50 border p-4 rounded-md text-xs sm:text-sm font-mono whitespace-pre-wrap -mt-2 flex items-center">
        {isCommand && <ChevronRight className="w-4 h-4 scale-125 text-primary mr-2" />}
        {prompt}
      </pre>
    </Card>
  )
}
