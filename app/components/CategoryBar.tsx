"use client"

import {
  Smartphone,
  Monitor,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  Baby,
  UtensilsCrossed,
  Plane,
  Gift,
} from "lucide-react"

const categories = [
  { icon: Smartphone, label: "Eletrônicos", color: "bg-primary/10 text-primary" },
  { icon: Monitor, label: "Informática", color: "bg-success/10 text-success" },
  { icon: Shirt, label: "Moda", color: "bg-highlight/20 text-highlight-foreground" },
  { icon: HomeIcon, label: "Casa", color: "bg-primary/10 text-primary" },
  { icon: Dumbbell, label: "Esportes", color: "bg-success/10 text-success" },
  { icon: Sparkles, label: "Beleza", color: "bg-highlight/20 text-highlight-foreground" },
  { icon: Baby, label: "Infantil", color: "bg-primary/10 text-primary" },
  { icon: UtensilsCrossed, label: "Gastronomia", color: "bg-success/10 text-success" },
  { icon: Plane, label: "Viagens", color: "bg-primary/10 text-primary" },
  { icon: Gift, label: "Presentes", color: "bg-highlight/20 text-highlight-foreground" },
]

export default function CategoryBar() {
  return (
    <section className="py-6">
      <div className="container">
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 scrollbar-hide">
          {categories.map((category, i) => (
            <a
              key={category.label}
              href="#"
              className="group flex min-w-[72px] flex-col items-center gap-2"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${category.color} transition-transform duration-200 group-hover:scale-110`}
              >
                <category.icon className="h-6 w-6" />
              </div>
              <span className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {category.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
