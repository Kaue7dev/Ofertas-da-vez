import { ShieldCheck, Sparkles } from "lucide-react"
import { redirect } from "next/navigation"

import AdminLoginForm from "@/admin/_components/AdminLoginForm"
import { Badge } from "@/components/ui/badge"
import { hasAdminSession, isAdminPasswordConfigured } from "@/lib/admin-session"

export default async function AdminEntryPage() {
  if (await hasAdminSession()) {
    redirect("/admin/manual")
  }

  const passwordConfigured = isAdminPasswordConfigured()

  return (
    <main className="min-h-screen bg-background px-4 py-5 md:py-10">
      <div className="mx-auto max-w-md space-y-4">
        <section className="overflow-hidden rounded-[30px] border border-border bg-gradient-to-b from-card to-secondary/70 p-5 shadow-card md:p-8">
          <div className="space-y-4">
            <Badge variant="highlight" className="w-fit rounded-full px-3 py-1">
              Area admin temporaria
            </Badge>
            <div className="space-y-2">
              <h1 className="font-heading text-[2rem] font-extrabold leading-[1.02] text-foreground md:text-5xl">
                Entre para publicar e organizar os testes.
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Login fake temporario, validado no servidor, para separar a area admin
                do fluxo publico do site.
              </p>
            </div>

            <div className="rounded-[24px] border border-border bg-background/90 px-4 py-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
                  {passwordConfigured ? (
                    <ShieldCheck className="h-5 w-5" />
                  ) : (
                    <Sparkles className="h-5 w-5" />
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-base font-semibold text-foreground">
                    {passwordConfigured
                      ? "Senha pronta para uso"
                      : "Falta configurar a senha admin"}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {passwordConfigured
                      ? "Digite a senha temporaria para abrir o painel mobile-first com as abas de trabalho."
                      : "Defina ADMIN_ACCESS_PASSWORD no ambiente para liberar o acesso a esta area."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[30px] border border-border bg-card p-5 shadow-card md:p-8">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                Acessar painel
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                Depois do login voce cai direto na aba Manual, com as proximas areas
                organizadas na navegacao inferior.
              </p>
            </div>

            <AdminLoginForm passwordConfigured={passwordConfigured} />
          </div>
        </section>
      </div>
    </main>
  )
}