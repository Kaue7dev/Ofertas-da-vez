import type { ReactNode } from "react"
import { FolderKanban, LogOut } from "lucide-react"
import { redirect } from "next/navigation"

import { logoutAdminAction } from "@/admin/actions"
import AdminBottomNav from "@/admin/_components/AdminBottomNav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { hasAdminSession } from "@/lib/admin-session"

export default async function AdminPanelLayout({
  children,
}: {
  children: ReactNode
}) {
  if (!(await hasAdminSession())) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-4 md:px-6">
          <div className="min-w-0 space-y-1">
            <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
              Painel admin
            </Badge>
            <div className="flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" />
              <p className="truncate font-heading text-lg font-bold text-foreground md:text-xl">
                Ofertas da Vez Admin
              </p>
            </div>
          </div>

          <form action={logoutAdminAction}>
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="h-4 w-4" /> Sair
            </Button>
          </form>
        </div>
      </header>

      <main className="px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>

      <AdminBottomNav />
    </div>
  )
}