"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { FeedItem } from "@/lib/home-data"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

interface ExploreCardProps {
  item: FeedItem
  featured?: boolean
}

export default function ExploreCard({
  item,
  featured = false,
}: ExploreCardProps) {
  const [saved, setSaved] = useState(false)

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className={`group relative block overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-card-hover ${
        featured ? "col-span-2" : ""
      }`}
    >
      <div
        className={`relative bg-secondary/40 ${
          featured ? "aspect-[2/1]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={
            featured
              ? "100vw"
              : "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          }
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          unoptimized
        />

        <div className="absolute left-2 top-2 flex gap-1">
          <Badge className="bg-primary px-1.5 py-0.5 text-[11px] text-primary-foreground shadow-sm">
            -{item.discount}%
          </Badge>
          {item.cashback ? (
            <Badge
              variant="success"
              className="px-1.5 py-0.5 text-[11px] shadow-sm"
            >
              {item.cashback}% volta
            </Badge>
          ) : null}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setSaved((s) => !s)
          }}
          aria-label={saved ? "Remover dos favoritos" : "Salvar"}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              saved
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2.5 pt-8">
          <p className="font-heading text-lg font-extrabold text-white drop-shadow-sm sm:text-xl">
            {formatCurrency(item.salePrice)}
          </p>
        </div>
      </div>

      <div className="p-2.5">
        <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-foreground">
          {item.title}
        </h3>
        <p className="mt-1 text-[11px] text-muted-foreground">{item.store}</p>
      </div>
    </a>
  )
}
