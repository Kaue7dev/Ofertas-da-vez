import { ArrowRight, BadgePercent, CreditCard, Ticket, Truck } from "lucide-react"

import { QUICK_ACCESS_ITEMS } from "@/lib/home-data"

const iconMap = {
  truck: Truck,
  "badge-percent": BadgePercent,
  ticket: Ticket,
  "credit-card": CreditCard,
}

export default function QuickAccessSection() {
  return (
    <section className="py-3 md:py-4">
      <div className="container">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
          {QUICK_ACCESS_ITEMS.map((item) => {
            const Icon = iconMap[item.icon]

            return (
              <a
                key={item.title}
                href={item.href}
                className="group flex min-w-[200px] items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/30 md:min-w-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}