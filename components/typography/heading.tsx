import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("text-balance font-extrabold", {
  variants: {
    variant: {
      h1: "text-4xl sm:text-5xl md:text-7xl scale-x-110 tracking-wide",
      h2: "text-3xl sm:text-5xl font-extrabold",
      h3: "text-2xl sm:text-4xl font-extrabold text-primary",
      h4: "text-xl sm:text-2xl font-bold",
      h5: "text-lg sm:text-xl font-bold",
      h6: "text-base sm:text-lg font-bold",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
})

type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface HeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "className">, Omit<VariantProps<typeof headingVariants>, "as"> {
  variant: HeadingVariant
  as?: HeadingVariant
  className?: string
}

export function Heading({ className, variant, as, ...props }: HeadingProps) {
  const Tag = as || variant

  return (
    <Tag
      className={cn(
        headingVariants({
          variant,
          className,
        })
      )}
      {...props}
    />
  )
}
