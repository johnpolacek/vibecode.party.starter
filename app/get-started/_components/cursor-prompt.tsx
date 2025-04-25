"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard"
import { Heading } from "@/components/typography/heading"
import { ChevronsDown, ChevronsUp } from "lucide-react"

interface CursorPromptProps {
  prompt: string
  heading: string
}

export function CursorPrompt({ prompt, heading }: CursorPromptProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4 sm:gap-8">
        <Heading variant="h5">{heading}</Heading>
        <Button className="text-primary hover:text-primary" variant="outline" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <ChevronsUp className="w-4 h-4" /> : <ChevronsDown className="w-4 h-4" />}
          {isVisible ? "Hide Cursor Prompt" : "Show Cursor Prompt"}
        </Button>
      </div>

      {isVisible && (
        <div className="cursor-prompt-container border rounded-lg p-4 mt-2">
          <div className="flex items-center justify-between mb-2 relative">
            <h4 className="font-semibold text-primary">Cursor Prompt</h4>
            <div className="absolute -top-4 -right-4 w-full">
              <CopyToClipboard position="top-right" hideContent={true}>
                {prompt}
              </CopyToClipboard>
            </div>
          </div>
          <p className="text-sm text-muted-foreground -mt-2 mb-4">Copy this prompt and paste it to Cursor to automatically remove admin functionality:</p>
          <pre className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">
            <code>{prompt}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
