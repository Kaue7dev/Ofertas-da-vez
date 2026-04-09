import BrandLogo from "@/components/BrandLogo"

export default function Footer() {
  const quickLinks = [
    { label: "Ofertas em destaque", href: "#ofertas-destaque" },
    { label: "Mais vendidos da semana", href: "#mais-vendidos" },
    { label: "Nichos", href: "#categorias" },
    { label: "Explorar", href: "/explorar" },
  ]

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-6 md:py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-3">
            <BrandLogo className="w-[134px] sm:w-[148px]" sizes="148px" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Curadoria enxuta de ofertas para descobrir bons preços sem poluição visual.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 md:max-w-sm md:justify-end">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          O Ofertas da Vez funciona como vitrine de oportunidades. Você navega pelas ofertas aqui e conclui a compra diretamente no varejista. Em alguns casos, podemos receber comissão sem custo extra para o usuário.
        </p>

        <div className="mt-4 flex flex-col gap-2 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ofertas da Vez. Todos os direitos reservados.</p>
          <a href="#topo" className="transition-colors hover:text-foreground">
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  )
}
