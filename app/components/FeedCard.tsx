"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ExternalLink, Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { FeedItem } from "@/lib/home-data"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export default function FeedCard(item: FeedItem) {
  const [saved, setSaved] = useState(false)

  return (
    <article className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="relative aspect-[4/3] bg-secondary/40">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          loading="lazy"
          unoptimized
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge className="bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            -{item.discount}%
          </Badge>
          {item.cashback ? (
            <Badge variant="success" className="px-2 py-0.5 text-xs">
              {item.cashback}% volta
            </Badge>
          ) : null}
          {item.badge ? (
            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
              {item.badge}
            </Badge>
          ) : null}
        </div>

        <button
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remover dos favoritos" : "Salvar nos favoritos"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              saved
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
        </button>
      </div>

      <div className="space-y-2 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">
            {item.store}
          </span>
          <span className="text-[10px] text-muted-foreground/60">•</span>
          <span className="text-[10px] text-muted-foreground">
            {item.category}
          </span>
        </div>

        <h3 className="font-heading text-sm font-bold leading-snug text-foreground sm:text-base">
          {item.title}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        <div className="flex items-end gap-2">
          <div>
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(item.originalPrice)}
            </p>
            <p className="font-heading text-xl font-extrabold text-primary sm:text-2xl">
              {formatCurrency(item.salePrice)}
            </p>
          </div>
          {item.coupon ? (
            <Badge variant="highlight" className="mb-1 px-2 py-0.5 text-[10px]">
              Cupom {item.coupon}
            </Badge>
          ) : null}
        </div>

        <p className="text-[11px] text-muted-foreground">{item.installment}</p>

        <div className="flex items-center gap-3 border-t border-border pt-3">
          <span className="flex items-center gap-1 text-[11px] text-success">
            <Truck className="h-3.5 w-3.5" />
            {item.shipping}
          </span>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="ml-auto flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Ver oferta
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  )
}
