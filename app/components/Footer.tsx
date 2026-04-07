import { ShoppingBag } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.75 1.24 4 4 0 0 1 7.75-1.24z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 4.01c-.77.35-1.6.58-2.47.69A4.3 4.3 0 0 0 21.43 2a8.6 8.6 0 0 1-2.73 1.05A4.28 4.28 0 0 0 11.4 7a12.15 12.15 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.33 5.72A4.23 4.23 0 0 1 2 7.62v.05a4.28 4.28 0 0 0 3.43 4.19 4.3 4.3 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.6 8.6 0 0 1 2 16.69 12.14 12.14 0 0 0 8.56 18.6c7.88 0 12.2-6.53 12.2-12.2l-.01-.56A8.7 8.7 0 0 0 22 4.01z" />
    </svg>
  )
}

export default function Footer() {
  const exploreLinks = [
    { label: "Ofertas em destaque", href: "#ofertas-destaque" },
    { label: "Cupons do dia", href: "#cupons" },
    { label: "Lojas populares", href: "#lojas" },
    { label: "Como funciona", href: "#confianca" },
  ]

  const categoryLinks = [
    { label: "Eletrônicos", href: "#categorias" },
    { label: "Casa e cozinha", href: "#categorias" },
    { label: "Moda", href: "#categorias" },
    { label: "Beleza", href: "#categorias" },
  ]

  const storeLinks = [
    { label: "Amazon", href: "#lojas" },
    { label: "Magalu", href: "#lojas" },
    { label: "Mercado Livre", href: "#lojas" },
    { label: "Shopee", href: "#lojas" },
  ]

  const institutionalLinks = [
    { label: "Quem somos", href: "#topo" },
    { label: "Contato", href: "#topo" },
    { label: "Termos de uso", href: "#topo" },
    { label: "Privacidade", href: "#topo" },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-8 md:py-10">
        <p className="mb-6 max-w-4xl text-xs leading-relaxed text-muted-foreground">
            O Ofertas da Vez funciona como vitrine de oportunidades. Você navega por ofertas, cupons e lojas parceiras aqui e conclui a compra diretamente no varejista. Em alguns casos, podemos receber comissão sem custo extra para o usuário.
        </p>

        <div className="grid gap-6 md:grid-cols-[1fr_repeat(4,minmax(0,1fr))]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <ShoppingBag className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-heading text-sm font-bold text-foreground">
                Ofertas da Vez
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Marketplace de ofertas e cupons com foco em descoberta e clareza.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <TwitterIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Explorar</h4>
            <div className="space-y-2">
              {exploreLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Categorias</h4>
            <div className="space-y-2">
              {categoryLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Lojas populares</h4>
            <div className="space-y-2">
              {storeLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Institucional</h4>
            <div className="space-y-2">
              {institutionalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-[11px] text-muted-foreground">
            © 2026 Ofertas da Vez. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
