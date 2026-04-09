"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react"

import BrandLogo from "@/components/BrandLogo"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Ofertas", href: "/#ofertas-destaque" },
  { label: "Cupons", href: "/#cupons" },
  { label: "Lojas", href: "/#lojas" },
  { label: "Categorias", href: "/#categorias" },
]

const utilityLinks = [
  "Ofertas atualizadas diariamente",
  "40+ lojas parceiras",
  "Compra no site oficial",
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="hidden border-b border-primary/15 bg-primary text-primary-foreground lg:block">
          <div className="container flex h-8 items-center justify-between text-[11px] font-medium">
            <div className="flex items-center gap-6">
              {utilityLinks.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a href="/#confianca" className="opacity-90 transition-opacity hover:opacity-100">
              Como funciona
            </a>
          </div>
        </div>

        <div className="container flex h-14 items-center gap-3 md:h-16 md:gap-4">
          <Link href="/" aria-label="Ir para a página inicial" className="flex shrink-0 items-center">
            <BrandLogo
              priority
              className="w-[104px] sm:w-[148px]"
              sizes="(min-width: 640px) 148px, 104px"
            />
          </Link>

          <div className="mx-auto max-w-2xl flex-1">
            <div
              className={`flex h-10 items-center gap-2 rounded-lg border px-3 transition-all duration-200 ${
                searchFocused
                  ? "border-primary bg-card shadow-card-hover"
                  : "border-border bg-secondary/55"
              }`}
            >
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar ofertas, produtos, lojas..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          <nav className="hidden items-center gap-4 xl:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-1.5 md:flex">
            <button className="rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
              <Heart className="h-4 w-4" />
            </button>
            <button className="rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
              <ShoppingCart className="h-4 w-4" />
            </button>
            <Button variant="outline" size="sm" className="rounded-lg px-3">
              <UserRound className="h-4 w-4" /> Entrar
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-lg border border-border bg-background p-2 transition-colors hover:bg-secondary md:hidden"
            aria-label="Abrir navegação"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed left-0 right-0 top-14 z-40 overflow-hidden border-b border-border bg-card md:hidden"
          >
            <div className="container py-3">
              <nav className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <button className="rounded-lg border border-border bg-background px-2 py-2.5 text-sm font-medium text-foreground">
                  Favoritos
                </button>
                <button className="rounded-lg border border-border bg-background px-2 py-2.5 text-sm font-medium text-foreground">
                  Carrinho
                </button>
                <button className="rounded-lg border border-border bg-background px-2 py-2.5 text-sm font-medium text-foreground">
                  Entrar
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
