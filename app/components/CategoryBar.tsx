import {
  Smartphone,
  Monitor,
  Shirt,
  Home as HomeIcon,
  Dumbbell,
  Sparkles,
  Baby,
  UtensilsCrossed,
} from "lucide-react"

import { HOME_CATEGORIES } from "@/lib/home-data"

const iconMap = {
  smartphone: Smartphone,
  monitor: Monitor,
  shirt: Shirt,
  home: HomeIcon,
  dumbbell: Dumbbell,
  sparkles: Sparkles,
  baby: Baby,
  utensils: UtensilsCrossed,
}

const colorCycle = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-highlight/20 text-highlight-foreground",
  "bg-secondary text-foreground",
]

export default function CategoryBar() {
  return (
    <section id="categorias" className="border-b border-border py-4">
      <div className="container">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide md:justify-center">
          {HOME_CATEGORIES.map((category, index) => {
            const Icon = iconMap[category.icon]

            return (
              <a
                key={category.label}
                href={category.href}
                className="group flex flex-col items-center gap-1.5 px-3 py-1"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${colorCycle[index % colorCycle.length]}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className="whitespace-nowrap text-[13px] font-medium text-muted-foreground group-hover:text-foreground">
                  {category.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
