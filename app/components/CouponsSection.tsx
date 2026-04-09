"use client"

import { useRef } from "react"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { HOME_COUPONS } from "@/lib/home-data"

const toneClasses = {
  primary: "border-primary/20 bg-primary/5",
  success: "border-success/20 bg-success/5",
  highlight: "border-highlight/30 bg-highlight/10",
  sky: "border-sky-200 bg-sky-50",
}

export default function CouponsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" })
  }

  return (
    <section id="cupons" className="py-5 md:py-6">
      <div className="container">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-success" />
            <h2 className="font-heading text-xl font-bold text-foreground">
              Cupons do dia
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
              href="#lojas"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver lojas <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide pb-2"
        >
          {HOME_COUPONS.map((coupon) => (
            <a
              key={coupon.code}
              href={coupon.href}
              target="_blank"
              rel="noreferrer"
              className={`flex min-w-[230px] shrink-0 snap-start flex-col rounded-xl border-2 border-dashed p-3 transition hover:shadow-card-hover sm:p-4 ${toneClasses[coupon.tone]}`}
            >
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="text-[11px]">
                  {coupon.store}
                </Badge>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {coupon.highlight}
                </span>
              </div>
              <p className="mt-2 font-heading text-2xl font-extrabold text-foreground">
                {coupon.discount}
              </p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {coupon.description}
              </p>
              <div className="mt-3 rounded-lg border border-border/80 bg-card px-3 py-2">
                <p className="font-heading text-sm font-bold tracking-widest text-foreground">
                  {coupon.code}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
