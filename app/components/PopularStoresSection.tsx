import { ArrowRight, Store } from "lucide-react"

import { POPULAR_STORES } from "@/lib/home-data"

export default function PopularStoresSection() {
  return (
    <section id="lojas" className="py-5 md:py-6">
      <div className="container">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold text-foreground md:text-xl">
              Lojas populares
            </h2>
          </div>
          <a
            href="#confianca"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Como funciona <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {POPULAR_STORES.map((store) => (
            <a
              key={store.name}
              href={store.href}
              className="flex min-w-[170px] items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-primary/30 hover:shadow-card-hover md:min-w-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Store className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-foreground">
                  {store.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {store.offerCount}
                </p>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}