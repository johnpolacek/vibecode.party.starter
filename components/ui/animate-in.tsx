import React, { useEffect, useState } from "react"
import type { JSX } from "react"
import { cn } from "@/lib/utils"

const AnimateIn = ({
  children,
  delay = 0,
  duration = 500,
  className = "",
  from,
  to,
  style,
  as = "div",
}: {
  from: string
  to: string
  children?: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof JSX.IntrinsicElements
}) => {
  const [animate, setAnimate] = useState(from)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const mediaQueryChangeHandler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", mediaQueryChangeHandler)

    return () => {
      mediaQuery.removeEventListener("change", mediaQueryChangeHandler)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      // If the user prefers reduced motion, skip the animation
      setAnimate(to)
      return
    }

    const timer = setTimeout(() => {
      setAnimate(to)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, to, prefersReducedMotion])

  return React.createElement(
    as,
    {
      className: cn("transition-all ease-in-out", className, animate),
      style: { transitionDuration: prefersReducedMotion ? "0ms" : `${duration}ms`, ...style },
    },
    children
  )
}

export default AnimateIn
