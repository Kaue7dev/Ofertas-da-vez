"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Compass, Heart, Home, Percent, Ticket } from "lucide-react"

const tabs = [
  { icon: Home, label: "Início", href: "/" },
  { icon: Compass, label: "Explorar", href: "/explorar" },
  { icon: Percent, label: "Ofertas", href: "/#ofertas-destaque" },
  { icon: Ticket, label: "Cupons", href: "/#cupons" },
  { icon: Heart, label: "Favoritos", href: "/#topo" },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map((tab) => {
          const isActive =
            !tab.href.includes("#") && pathname === tab.href

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-1 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
