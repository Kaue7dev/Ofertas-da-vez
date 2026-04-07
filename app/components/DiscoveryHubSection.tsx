import { ArrowRight, Search } from "lucide-react"

import {
  POPULAR_BRANDS,
  TRENDING_SEARCHES,
} from "@/lib/home-data"

export default function DiscoveryHubSection() {
  return (
    <section id="descobertas" className="py-5 md:py-6">
      <div className="container space-y-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold text-foreground md:text-xl">
              Termos mais buscados
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((term) => (
              <a
                key={term}
                href="#ofertas-destaque"
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                {term}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-foreground">
              Marcas populares
            </h3>
            <a
              href="#mais-vendidos"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver mais <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_BRANDS.map((brand) => (
              <a
                key={brand}
                href="#mais-vendidos"
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition hover:border-primary/30 hover:text-primary"
              >
                {brand}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}