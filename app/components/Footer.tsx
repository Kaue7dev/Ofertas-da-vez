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
  return (
    <footer className="mt-10 border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <ShoppingBag className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-foreground">
                Ofertas da Vez
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Economia inteligente para o brasileiro que sabe comprar bem.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Explorar</h4>
            <div className="space-y-2">
              {[
                "Ofertas",
                "Cupons",
                "Cashback",
                "Categorias",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Lojas populares</h4>
            <div className="space-y-2">
              {[
                "Amazon",
                "Magazine Luiza",
                "Americanas",
                "Shopee",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-heading font-semibold text-foreground">Sobre</h4>
            <div className="space-y-2">
              {[
                "Quem somos",
                "Contato",
                "Termos de uso",
                "Privacidade",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 Ofertas da Vez. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
