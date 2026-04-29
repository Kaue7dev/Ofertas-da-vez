import { redirect } from "next/navigation"

import { hasAdminSession } from "@/lib/admin-session"

export default async function LegacyAdminTelegramPage() {
  if (await hasAdminSession()) {
    redirect("/admin/manual")
  }

  redirect("/admin")
}