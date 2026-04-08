import { Sparkles } from "lucide-react"

import FeedCard from "@/components/FeedCard"
import { FEED_ITEMS } from "@/lib/home-data"

export default function DiscoveryFeed() {
  return (
    <section id="feed" className="py-5 md:py-10">
      <div className="container">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
            Descobertas pra você
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {FEED_ITEMS.map((item) => (
            <FeedCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
