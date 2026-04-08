"use client"

import { useRef } from "react"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
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
  icon,
  items,
  viewAllHref = "#",
  viewAllLabel = "Ver tudo",
}: DealsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const Icon = iconMap[icon]

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" })
  }

  return (
    <section id={id} className="py-5 md:py-6">
      <div className="container">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold text-foreground md:text-xl">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground md:flex"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground md:flex"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <a
              href={viewAllHref}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {viewAllLabel} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
        >
          {items.map((deal) => (
            <div
              key={deal.id}
              className="w-[170px] shrink-0 snap-start md:w-[220px] lg:w-[240px]"
            >
              <DealCard {...deal} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
