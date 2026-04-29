"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileSpreadsheet, PencilLine, Search } from "lucide-react"

const NAV_ITEMS = [
  {
    href: "/admin/manual",
    label: "Manual",
    icon: PencilLine,
  },
  {
    href: "/admin/csv",
    label: "CSV",
    icon: FileSpreadsheet,
  },
  {
    href: "/admin/buscar",
    label: "Buscar",
    icon: Search,
  },
] as const

export default function AdminBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-2 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-2 text-center transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}