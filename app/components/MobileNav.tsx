import { Grid2X2, Home, Percent, Store, Ticket } from "lucide-react"

export default function MobileNav() {
  const tabs = [
    { icon: Home, label: "Início", href: "#topo" },
    { icon: Grid2X2, label: "Categorias", href: "#categorias" },
    { icon: Percent, label: "Ofertas", href: "#ofertas-destaque" },
    { icon: Ticket, label: "Cupons", href: "#cupons" },
    { icon: Store, label: "Lojas", href: "#lojas" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map((tab, i) => (
          <a
            key={tab.label}
            href={tab.href}
            className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-colors ${
              i === 0
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}
