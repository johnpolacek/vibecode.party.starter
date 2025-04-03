"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CopyToClipboardProps {
  children: string
  className?: string
  iconClassName?: string
  timeout?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

const positionClasses = {
  "top-right": "right-5 top-5",
  "top-left": "left-5 top-5",
  "bottom-right": "right-5 bottom-5",
  "bottom-left": "left-5 bottom-5",
}

export function CopyToClipboard({ children, className, iconClassName, timeout = 1000, position = "top-right" }: CopyToClipboardProps) {
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
      <button className={cn("absolute p-0.5 border dark:border-neutral-800 rounded-md z-[2] backdrop-blur-2xl cursor-pointer", positionClasses[position], className)} onClick={handleCopy}>
        {copied ? <CheckMark className={iconClassName} /> : <ClipBoard className={iconClassName} />}
      </button>
      {children}
    </>
  )
}

interface IconProps {
  className?: string
}

const ClipBoard = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={cn("scale-[0.70] dark:stroke-neutral-400 stroke-neutral-800", className)}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
)

const CheckMark = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={cn("scale-[0.70] dark:stroke-neutral-400 stroke-neutral-800", className)}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
