"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import type { HomeDeal } from "@/lib/home-data"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export default function DealCard({
  image,
  title,
  store,
  originalPrice,
  salePrice,
  discount,
  installment,
  href,
  cashback,
  coupon,
}: HomeDeal) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block h-full overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative">
        <div className="absolute left-2 top-2 z-10 flex gap-1">
          <Badge className="bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
            -{discount}%
          </Badge>
          {cashback ? (
            <Badge
              variant="success"
              className="px-1.5 py-0.5 text-[10px]"
            >
              {cashback}% volta
            </Badge>
          ) : null}
        </div>
        <div className="aspect-square bg-secondary/40 p-3">
          <Image
            src={image}
            alt={title}
            width={240}
            height={240}
            sizes="240px"
            className="h-full w-full object-contain"
            loading="lazy"
            unoptimized
          />
        </div>
      </div>

      <div className="space-y-1.5 p-3">
        <h3 className="line-clamp-2 text-xs font-medium leading-snug text-foreground">
          {title}
        </h3>
        <div>
          <p className="text-[10px] text-muted-foreground line-through">
            {formatCurrency(originalPrice)}
          </p>
          <p className="font-heading text-lg font-extrabold text-primary">
            {formatCurrency(salePrice)}
          </p>
          <p className="text-[10px] text-muted-foreground">{installment}</p>
        </div>
        {coupon ? (
          <Badge
            variant="highlight"
            className="px-1.5 py-0.5 text-[10px]"
          >
            Cupom {coupon}
          </Badge>
        ) : null}
        <div className="flex items-center gap-1 pt-1">
          <span className="text-[10px] text-muted-foreground">{store}</span>
          <ArrowRight className="ml-auto h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </div>
    </a>
  )
}
