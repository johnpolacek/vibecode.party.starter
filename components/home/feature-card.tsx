import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Heading } from "@/components/typography/heading"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  badgeText: string
  features: string[]
  envVars?: string[]
  preview: React.ReactNode
  gradientFrom?: string
  gradientTo?: string
  gradientCirclePosition?: string
  link?: string
  linkText?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  badgeText,
  features,
  envVars,
  preview,
  gradientFrom = "from-primary/5",
  gradientTo = "to-primary/30",
  gradientCirclePosition = "30% 20%",
  link,
  linkText = "Try it",
}: FeatureCardProps) {
  return (
    <Card className="border-primary/20 bg-background/60 py-0 backdrop-blur-sm hover:bg-background/80 transition-all hover:shadow-md hover:shadow-primary/10 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              {icon}
              {badgeText}
            </div>
            <Heading variant="h3" className="text-2xl font-bold mb-2">
              {title}
            </Heading>
            <p className="text-muted-foreground mb-4">{description}</p>
          </div>
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="mr-2 h-4 w-4 mt-1 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            {envVars && envVars.length > 0 && (
              <div className="flex flex-wrap gap-x-2 gap-y-1 justify-start text-sm text-muted-foreground">
                {envVars.map((envVar) => (
                  <code key={envVar} className={`rounded-md bg-muted px-1.5 py-0.5 text-xs`}>
                    {envVar}
                  </code>
                ))}
              </div>
            )}
            {link && (
              <div>
                <Link href={link}>
                  <Button className="group">
                    {linkText}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={cn("p-6 flex items-center justify-center relative overflow-hidden bg-gradient-to-br", gradientFrom, gradientTo)}>
          <div className={`absolute inset-0 bg-[radial-gradient(circle_at_${gradientCirclePosition},currentColor_0,transparent_60%)] opacity-20`} />
          <div className="relative z-10">{preview}</div>
        </div>
      </div>
    </Card>
  )
}
