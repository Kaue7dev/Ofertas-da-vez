"use client"

import { ArrowRight, Ticket } from "lucide-react"

const coupons = [
  {
    store: "Amazon",
    code: "PROMO10",
    discount: "10% OFF",
    description: "Em eletrônicos selecionados",
    color: "border-primary/20 bg-primary/5",
  },
  {
    store: "Magazine Luiza",
    code: "MAGALU20",
    discount: "R$ 20 OFF",
    description: "Compras acima de R$ 100",
    color: "border-success/20 bg-success/5",
  },
  {
    store: "Americanas",
    code: "CUPOM15",
    discount: "15% OFF",
    description: "Primeira compra no app",
    color: "border-primary/20 bg-primary/5",
  },
  {
    store: "Shopee",
    code: "FRETE0",
    discount: "Frete Grátis",
    description: "Sem valor mínimo",
    color: "border-highlight/30 bg-highlight/10",
  },
]

export default function CouponsSection() {
  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
              <Ticket className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Cupons do dia
              </h2>
              <p className="text-sm text-muted-foreground">Ative e economize na hora</p>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Ver todos <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coupons.map((coupon, i) => (
            <div
              key={coupon.code}
              className={`group relative cursor-pointer rounded-2xl border-2 border-dashed ${coupon.color} p-5 transition-all duration-200 hover:shadow-card`}
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {coupon.store}
                </p>
                <p className="font-heading text-2xl font-bold text-foreground">
                  {coupon.discount}
                </p>
                <p className="text-sm text-muted-foreground">{coupon.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <code className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-heading font-bold tracking-wider text-foreground">
                    {coupon.code}
                  </code>
                  <span className="text-xs font-medium text-primary group-hover:underline">
                    Copiar
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
