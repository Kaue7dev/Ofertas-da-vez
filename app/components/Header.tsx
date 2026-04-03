"use client"

import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Search, ShoppingBag, X } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="container flex h-16 items-center gap-3 md:h-[72px]">
          <Link href="/" className="shrink-0 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <ShoppingBag className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-lg font-bold leading-tight text-foreground">
                Ofertas
              </span>
              <span className="font-heading text-lg font-bold leading-tight text-primary">
                {" "}da Vez
              </span>
            </div>
          </Link>

          <div className="mx-auto max-w-xl flex-1">
            <div
              className={`flex h-11 items-center gap-2 rounded-2xl border-2 px-4 transition-all duration-200 ${
                searchFocused
                  ? "border-primary bg-card shadow-card-hover"
                  : "border-border bg-secondary/60"
              }`}
            >
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar ofertas, cupons, produtos..."
                className="flex-1 bg-transparent text-sm font-body text-foreground outline-none placeholder:text-muted-foreground"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ofertas
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cupons
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cashback
            </a>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Lojas
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl p-2 transition-colors hover:bg-secondary md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed left-0 right-0 top-16 z-40 overflow-hidden border-b border-border bg-card md:hidden"
          >
            <nav className="container flex flex-col gap-1 py-4">
              {[
                "Ofertas",
                "Cupons",
                "Cashback",
                "Lojas",
                "Categorias",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
