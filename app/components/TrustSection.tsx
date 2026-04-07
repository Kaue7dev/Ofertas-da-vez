import { CreditCard, ShieldCheck, Truck } from "lucide-react"

const trustItems = [
  {
    icon: Truck,
    title: "Frete grátis",
    description:
      "Milhares de produtos com frete grátis nas lojas parceiras.",
  },
  {
    icon: CreditCard,
    title: "Pague como quiser",
    description:
      "Cartão, Pix, boleto ou parcelamento sem juros.",
  },
  {
    icon: ShieldCheck,
    title: "Compra segura",
    description:
      "Você navega aqui e finaliza direto na loja oficial.",
  },
]

export default function TrustSection() {
  return (
    <section
      id="confianca"
      className="border-t border-border bg-secondary/30 py-8 md:py-10"
    >
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-heading text-base font-bold text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}