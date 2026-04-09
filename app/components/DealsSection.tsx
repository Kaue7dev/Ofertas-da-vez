import {
  ArrowRight,
  Clock,
  Flame,
  TrendingUp,
  Zap,
} from "lucide-react"

import type { HomeDeal } from "@/lib/home-data"

import DealCard from "./DealCard"

interface DealsSectionProps {
  id?: string
  title: string
  subtitle?: string
  icon: "flame" | "clock" | "zap" | "trending"
  items: HomeDeal[]
  viewAllHref?: string
  viewAllLabel?: string
}

const iconMap = {
  flame: Flame,
  clock: Clock,
  zap: Zap,
  trending: TrendingUp,
}

export default function DealsSection({
  id,
  title,
  subtitle,
  icon,
  items,
  viewAllHref = "#",
  viewAllLabel = "Ver tudo",
}: DealsSectionProps) {
  const Icon = iconMap[icon]

  return (
    <section id={id} className="py-5 md:py-6">
      <div className="container">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                {title}
              </h2>
            </div>
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
          </div>
          <a
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {items.map((deal) => (
            <div key={deal.id} className="h-full">
              <DealCard {...deal} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
