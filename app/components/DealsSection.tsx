"use client"

import { ArrowRight, Clock, Flame, TrendingUp, Zap } from "lucide-react"

import DealCard from "./DealCard"

interface DealsSectionProps {
  title: string
  subtitle: string
  icon: "flame" | "clock" | "zap" | "trending"
  showDeals?: number
}

const deals = [
  {
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    title: "Tênis Nike Air Max 90 Essential Masculino",
    store: "Nike",
    originalPrice: 799.99,
    salePrice: 399.99,
    discount: 50,
    cashback: 8,
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    title: "Fone Bluetooth JBL Tune 520BT Sem Fio",
    store: "Amazon",
    originalPrice: 349.0,
    salePrice: 189.9,
    discount: 46,
    coupon: "JBL20OFF",
  },
  {
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop",
    title: "Perfume Malbec Gold 100ml O Boticário",
    store: "O Boticário",
    originalPrice: 189.9,
    salePrice: 129.9,
    discount: 32,
    cashback: 12,
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    title: "Smartwatch Samsung Galaxy Watch 6 44mm",
    store: "Magazine Luiza",
    originalPrice: 1899.0,
    salePrice: 1099.0,
    discount: 42,
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    title: "Tênis Adidas Ultraboost 23 Running",
    store: "Adidas",
    originalPrice: 999.99,
    salePrice: 549.99,
    discount: 45,
    coupon: "BOOST30",
    cashback: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    title: "Headphone Sony WH-1000XM5 Noise Cancelling",
    store: "Americanas",
    originalPrice: 2299.0,
    salePrice: 1599.0,
    discount: 30,
  },
  {
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    title: "Câmera Instantânea Fujifilm Instax Mini 12",
    store: "Shopee",
    originalPrice: 599.0,
    salePrice: 379.0,
    discount: 37,
    cashback: 10,
    coupon: "INSTAX50",
  },
  {
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
    title: "Tênis New Balance 574 Classic Lifestyle",
    store: "Netshoes",
    originalPrice: 699.99,
    salePrice: 389.99,
    discount: 44,
  },
]

const iconMap = {
  flame: Flame,
  clock: Clock,
  zap: Zap,
  trending: TrendingUp,
}

export default function DealsSection({
  title,
  subtitle,
  icon,
  showDeals = 4,
}: DealsSectionProps) {
  const Icon = iconMap[icon]
  const visibleDeals = deals.slice(0, showDeals)

  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Ver mais <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {visibleDeals.map((deal, i) => (
            <div key={deal.title}>
              <DealCard {...deal} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
