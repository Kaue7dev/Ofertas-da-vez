import type { Metadata } from "next"

import ExploreCard from "@/components/ExploreCard"
import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { FEED_ITEMS, HOME_CATEGORIES } from "@/lib/home-data"

export const metadata: Metadata = {
  title: "Explorar",
  description:
    "Descubra ofertas, promoções e cupons das melhores lojas do Brasil.",
}

export default function ExplorarPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 md:pb-0">
      <Header />

      <div className="border-b border-border bg-card/50 py-2.5">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <span className="shrink-0 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background">
              Tudo
            </span>
            {HOME_CATEGORIES.map((cat) => (
              <a
                key={cat.label}
                href={cat.href}
                className="shrink-0 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="py-3 md:py-5">
        <div className="container">
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
            {FEED_ITEMS.map((item, i) => (
              <ExploreCard
                key={item.id}
                item={item}
                featured={i % 5 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <MobileNav />
    </div>
  )
}
