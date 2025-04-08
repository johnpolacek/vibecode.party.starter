"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

interface CopyToClipboardProps {
  children: string
  className?: string
  iconClassName?: string
  timeout?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  hideContent?: boolean
}

const positionClasses = {
  "top-right": "right-5 top-5",
  "top-left": "left-5 top-5",
  "bottom-right": "right-5 bottom-5",
  "bottom-left": "left-5 bottom-5",
}

export function CopyToClipboard({ children, className, iconClassName, timeout = 1000, position = "top-right", hideContent = false }: CopyToClipboardProps) {
  const [copied, setCopiedState] = useState(false)

  const handleCopy = () => {
    if (copied) return
    navigator.clipboard.writeText(children)
    setCopiedState(true)
    setTimeout(() => {
      setCopiedState(false)
    }, timeout)
  }

  return (
    <>
      <button
        className={cn("absolute p-1.5 border dark:border-neutral-800 rounded-md z-[2] backdrop-blur-2xl cursor-pointer", positionClasses[position], copied && "text-green-500", className)}
        onClick={handleCopy}
      >
        {copied ? <Check className={cn("w-4.5 h-4.5 scale-110", iconClassName)} /> : <Copy className={cn("w-4.5 h-4.5", iconClassName)} />}
      </button>
      {!hideContent && children}
    </>
  )
}
