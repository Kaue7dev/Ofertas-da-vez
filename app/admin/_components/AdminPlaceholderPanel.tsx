import { Hammer, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type AdminPlaceholderPanelProps = {
  eyebrow: string
  title: string
  description: string
  points: string[]
}

export default function AdminPlaceholderPanel({
  eyebrow,
  title,
  description,
  points,
}: AdminPlaceholderPanelProps) {
  return (
    <div className="space-y-4 md:space-y-5">
      <section className="overflow-hidden rounded-[30px] border border-border bg-gradient-to-b from-card to-secondary/70 p-5 shadow-card md:p-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {eyebrow}
          </Badge>
          <div className="space-y-2">
            <h1 className="font-heading text-[2rem] font-extrabold leading-[1.02] text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-border bg-card p-5 shadow-card md:p-8">
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-[24px] border border-border bg-background px-4 py-4">
            <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
              <Hammer className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <p className="text-base font-semibold text-foreground">
                Aba preparada para a proxima fase
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                A navegacao ja esta pronta e o visual da area admin fica consistente no
                celular. O fluxo funcional fica concentrado na aba Manual por enquanto.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-border bg-secondary/45 p-4 md:p-5">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Proximos blocos sugeridos
            </div>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}