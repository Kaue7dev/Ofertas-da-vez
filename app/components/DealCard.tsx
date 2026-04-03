"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface DealCardProps {
  image: string
  title: string
  store: string
  originalPrice: number
  salePrice: number
  discount: number
  cashback?: number
  coupon?: string
}

export default function DealCard({
  image,
  title,
  store,
  originalPrice,
  salePrice,
  discount,
  cashback,
  coupon,
}: DealCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden cursor-pointer"
    >
      <div className="absolute top-3 left-3 z-10">
        <span className="inline-flex items-center rounded-lg bg-primary px-2.5 py-1 text-xs font-heading font-bold text-primary-foreground">
          -{discount}%
        </span>
      </div>

      {cashback && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center rounded-lg bg-success px-2.5 py-1 text-xs font-heading font-bold text-success-foreground">
            {cashback}% volta
          </span>
        </div>
      )}

      <div className="aspect-square bg-secondary/40 p-4 transition-colors group-hover:bg-secondary/60 md:p-6">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          unoptimized
        />
      </div>

      <div className="p-3 md:p-4 space-y-1.5 md:space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {store}
        </p>
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="space-y-0.5 pt-1">
          <p className="text-xs text-muted-foreground line-through">
            R$ {originalPrice.toFixed(2).replace(".", ",")}
          </p>
          <p className="font-heading font-bold text-lg md:text-xl text-foreground">
            R${" "}
            <span className="text-primary">
              {salePrice.toFixed(2).replace(".", ",")}
            </span>
          </p>
        </div>

        {coupon && (
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 text-xs font-heading font-semibold text-primary">
              🏷️ {coupon}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )
}
