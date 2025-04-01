"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const AvatarContext = React.createContext<{ hasError: boolean; setHasError: (error: boolean) => void }>({
  hasError: false,
  setHasError: () => {},
})

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  const [hasError, setHasError] = React.useState(false)

  return (
    <AvatarContext.Provider value={{ hasError, setHasError }}>
      <AvatarPrimitive.Root data-slot="avatar" className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)} {...props} />
    </AvatarContext.Provider>
  )
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  const { setHasError } = React.useContext(AvatarContext)
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", className)}
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setHasError(true)
        setIsLoaded(false)
      }}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const { hasError } = React.useContext(AvatarContext)

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("bg-muted flex size-full items-center justify-center rounded-full transition-opacity duration-200", !hasError && "hidden", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
