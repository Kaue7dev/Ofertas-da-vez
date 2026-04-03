"use client"

import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden px-0">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-success/5" />
      <div className="container relative py-8 md:py-16">
        <div className="max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-heading font-semibold text-primary">
              Ofertas selecionadas para você
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1]">
            Descubra as{" "}
            <span className="text-primary">melhores ofertas</span>{" "}
            do momento
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-lg">
            Promoções reais, cupons exclusivos e cashback em centenas de lojas. Economia inteligente, sem perder tempo.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#ofertas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity shadow-card"
            >
              Ver ofertas <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#cupons"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-card border-2 border-border text-foreground font-heading font-semibold text-sm hover:border-primary/40 transition-colors"
            >
              Pegar cupons
            </a>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-6 pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-soft" />
              +2.400 ofertas ativas
            </span>
            <span>🏷️ 380 cupons válidos</span>
            <span>💰 Cashback em 150+ lojas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
