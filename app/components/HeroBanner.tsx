"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PROMO_BANNERS } from "@/lib/home-data"

export default function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const total = PROMO_BANNERS.length

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total],
  )

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const banner = PROMO_BANNERS[current]

  return (
    <section className="relative w-full">
      <div
        className={`relative flex min-h-[200px] items-center overflow-hidden transition-colors duration-500 md:min-h-[320px] lg:min-h-[380px] ${banner.bg}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Promoções em destaque"
      >
        <div className="container relative z-10 py-6 md:py-12">
          <div className="max-w-xl">
            {banner.eyebrow ? (
              <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {banner.eyebrow}
              </span>
            ) : null}
            <h2 className="font-heading text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
              {banner.title}
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/85 md:text-lg">
              {banner.subtitle}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-4 bg-white text-foreground hover:bg-white/90"
            >
              <a href={banner.href}>
                {banner.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 md:left-3 md:h-10 md:w-10"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40 md:right-3 md:h-10 md:w-10"
          aria-label="Próximo banner"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {PROMO_BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-white" : "w-2 bg-white/50"}`}
              aria-label={`Ir para banner ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
