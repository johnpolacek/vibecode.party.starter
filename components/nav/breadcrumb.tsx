import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  homeHref?: string
  homeLabel?: string
}

export function Breadcrumb({ items, homeHref = "/", homeLabel = "Home" }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      <Link href={homeHref} className="hover:text-foreground transition-colors">
        {homeLabel}
      </Link>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1" />
          {index === items.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <Link href={item.href!} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
