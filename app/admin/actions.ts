"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminSessionValue,
  isAdminPasswordConfigured,
  isValidAdminPassword,
} from "@/lib/admin-session"

export type AdminLoginActionState = {
  error: string | null
}

export async function loginAdminAction(
  _previousState: AdminLoginActionState,
  formData: FormData,
): Promise<AdminLoginActionState> {
  if (!isAdminPasswordConfigured()) {
    return {
      error: "Configure ADMIN_ACCESS_PASSWORD para liberar o acesso admin.",
    }
  }

  const passwordValue = formData.get("password")

  if (typeof passwordValue !== "string" || passwordValue.trim().length === 0) {
    return {
      error: "Digite a senha de acesso para continuar.",
    }
  }

  if (!isValidAdminPassword(passwordValue)) {
    return {
      error: "Senha incorreta.",
    }
  }

  const cookieStore = await cookies()

  cookieStore.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: getAdminSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  })

  redirect("/admin/manual")
}

export async function logoutAdminAction() {
  const cookieStore = await cookies()

  cookieStore.delete({
    name: ADMIN_SESSION_COOKIE_NAME,
    path: "/admin",
  })

  redirect("/admin")
}