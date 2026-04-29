"use client"

import { useActionState } from "react"
import { KeyRound, LoaderCircle, LockKeyhole } from "lucide-react"

import type { AdminLoginActionState } from "@/admin/actions"
import { loginAdminAction } from "@/admin/actions"
import { Button } from "@/components/ui/button"

const INITIAL_STATE: AdminLoginActionState = {
  error: null,
}

type AdminLoginFormProps = {
  passwordConfigured: boolean
}

export default function AdminLoginForm({
  passwordConfigured,
}: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    loginAdminAction,
    INITIAL_STATE,
  )

  return (
    <form action={formAction} className="space-y-4">
      <label className="flex flex-col gap-2.5">
        <span className="text-[15px] font-semibold text-foreground md:text-base">
          Senha de acesso
        </span>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={!passwordConfigured || isPending}
            className="h-14 w-full rounded-[22px] border border-border bg-background pl-11 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="Digite a senha temporaria"
          />
        </div>
      </label>

      {state.error ? (
        <div className="rounded-[22px] border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-foreground">
          {state.error}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={!passwordConfigured || isPending}
        className="h-14 w-full text-base"
      >
        {isPending ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Entrando...
          </>
        ) : (
          <>
            <LockKeyhole className="h-5 w-5" />
            Entrar na area admin
          </>
        )}
      </Button>
    </form>
  )
}