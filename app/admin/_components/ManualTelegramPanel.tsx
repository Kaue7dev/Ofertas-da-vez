"use client"

import type { FormEvent, ReactNode } from "react"
import { useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ImageIcon,
  LoaderCircle,
  RotateCcw,
  Send,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  publishTelegramOffer,
  type TelegramOfferPayload,
} from "@/lib/services/telegramOfferService"

type TelegramOfferFormState = {
  title: string
  description: string
  price: string
  oldPrice: string
  imageUrl: string
  affiliateUrl: string
}

type FeedbackState =
  | {
      type: "success" | "error"
      message: string
    }
  | null

const EMPTY_FORM: TelegramOfferFormState = {
  title: "",
  description: "",
  price: "",
  oldPrice: "",
  imageUrl: "",
  affiliateUrl: "",
}

const PRESETS: Array<{
  label: string
  payload: TelegramOfferFormState
}> = [
  {
    label: "Fralda",
    payload: {
      title: "Fralda Pampers Confort Sec 72un",
      description: "Oferta teste para o canal Ofertas da Vez Baby.",
      price: "R$ 49,90",
      oldPrice: "R$ 79,90",
      imageUrl:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&h=900&fit=crop",
      affiliateUrl: "https://example.com/oferta/fralda-pampers",
    },
  },
  {
    label: "Carrinho",
    payload: {
      title: "Carrinho de Bebe Compacto",
      description: "Modelo leve, dobravel e ideal para o dia a dia.",
      price: "R$ 399,90",
      oldPrice: "R$ 549,90",
      imageUrl:
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&h=900&fit=crop",
      affiliateUrl: "https://example.com/oferta/carrinho-bebe",
    },
  },
  {
    label: "Brinquedo",
    payload: {
      title: "Tapete Infantil de Atividades",
      description: "Produto teste para validar postagem com imagem e preco.",
      price: "R$ 89,90",
      oldPrice: "R$ 129,90",
      imageUrl:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=900&h=900&fit=crop",
      affiliateUrl: "https://example.com/oferta/tapete-infantil",
    },
  },
] as const

function buildPayload(formState: TelegramOfferFormState): TelegramOfferPayload {
  return {
    title: formState.title,
    price: formState.price,
    affiliateUrl: formState.affiliateUrl,
    ...(formState.description.trim()
      ? { description: formState.description }
      : {}),
    ...(formState.oldPrice.trim() ? { oldPrice: formState.oldPrice } : {}),
    ...(formState.imageUrl.trim() ? { imageUrl: formState.imageUrl } : {}),
  }
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="block text-base font-semibold text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

export default function ManualTelegramPanel() {
  const [formState, setFormState] = useState<TelegramOfferFormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const [activePresetLabel, setActivePresetLabel] = useState<string | null>(null)

  const updateField = <K extends keyof TelegramOfferFormState>(
    field: K,
    value: TelegramOfferFormState[K],
  ) => {
    setActivePresetLabel(null)
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handlePreset = (label: string, preset: TelegramOfferFormState) => {
    setFormState({ ...preset })
    setFeedback(null)
    setActivePresetLabel(label)
  }

  const handleReset = () => {
    setFormState(EMPTY_FORM)
    setFeedback(null)
    setActivePresetLabel(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      await publishTelegramOffer(buildPayload(formState))
      setFeedback({
        type: "success",
        message: "Oferta publicada no Telegram com sucesso.",
      })
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nao foi possivel publicar a oferta no Telegram."

      setFeedback({
        type: "error",
        message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewPayload = buildPayload(formState)
  const previewImageUrl = previewPayload.imageUrl?.trim() || ""
  const hasImage = Boolean(previewImageUrl)
  const hasPreviewContent = Boolean(
    previewPayload.title.trim() ||
      previewPayload.price.trim() ||
      previewPayload.affiliateUrl.trim() ||
      previewPayload.description?.trim(),
  )

  return (
    <div className="space-y-3 md:space-y-4">
      <header className="space-y-3">
        <h1 className="font-heading text-[2rem] font-extrabold leading-none text-foreground md:text-[2.25rem]">
          Publicar oferta
        </h1>

        <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const isActive = activePresetLabel === preset.label

          return (
            <Button
              key={preset.label}
              type="button"
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handlePreset(preset.label, preset.payload)}
              disabled={isSubmitting}
              className="h-10 rounded-full px-4 text-sm"
            >
              {preset.label}
            </Button>
          )
        })}
        </div>
      </header>

      <section className="rounded-[28px] border border-border bg-card p-4 shadow-card md:p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Nome" required>
            <input
              type="text"
              value={formState.title}
              onChange={(event) => updateField("title", event.target.value)}
              required
              className="h-14 rounded-[20px] border-2 border-border bg-background px-4 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
              placeholder="Ex.: Fralda Pampers Confort Sec 72un"
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Preco" required>
              <input
                type="text"
                value={formState.price}
                onChange={(event) => updateField("price", event.target.value)}
                required
                className="h-14 rounded-[20px] border-2 border-border bg-background px-4 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
                placeholder="R$ 49,90"
              />
            </Field>

            <Field label="Preco antigo">
              <input
                type="text"
                value={formState.oldPrice}
                onChange={(event) => updateField("oldPrice", event.target.value)}
                className="h-14 rounded-[20px] border-2 border-border bg-background px-4 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
                placeholder="R$ 79,90"
              />
            </Field>
          </div>

          <Field label="Imagem">
            <input
              type="url"
              value={formState.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              className="h-14 rounded-[20px] border-2 border-border bg-background px-4 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
              placeholder="https://..."
            />
          </Field>

          <Field label="Link" required>
            <input
              type="url"
              value={formState.affiliateUrl}
              onChange={(event) => updateField("affiliateUrl", event.target.value)}
              required
              className="h-14 rounded-[20px] border-2 border-border bg-background px-4 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
              placeholder="https://example.com/oferta"
            />
          </Field>

          <Field label="Resumo">
            <textarea
              value={formState.description}
              onChange={(event) => updateField("description", event.target.value)}
              rows={3}
              className="min-h-28 rounded-[20px] border-2 border-border bg-background px-4 py-3.5 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
              placeholder="Resumo curto da oferta"
            />
          </Field>

          {feedback ? (
            <div
              aria-live="polite"
              className={`rounded-[20px] border px-4 py-3 text-sm font-medium leading-relaxed ${
                feedback.type === "success"
                  ? "border-success/20 bg-success/10 text-foreground"
                  : "border-destructive/20 bg-destructive/10 text-foreground"
              }`}
            >
              <div className="flex items-start gap-2">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                )}
                <span>{feedback.message}</span>
              </div>
            </div>
          ) : null}

          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full text-base"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Publicar no Telegram
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting}
              className="h-14 w-full text-base"
            >
              <RotateCcw className="h-5 w-5" />
              Limpar
            </Button>
          </div>
        </form>
      </section>

      <details className="group rounded-[24px] border border-border bg-card shadow-card">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-left">
          <div>
            <p className="text-base font-semibold text-foreground">Preview</p>
            <p className="text-sm text-muted-foreground">
              {hasPreviewContent ? (hasImage ? "Com imagem" : "Sem imagem") : "Vazio"}
            </p>
          </div>
          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>

        <div className="border-t border-border px-4 py-4">
          <div className="rounded-[20px] border border-border bg-background px-4 py-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ImageIcon className="h-4 w-4 text-primary" />
              Canal Ofertas da Vez Baby
            </div>

            <div className="mt-3 space-y-2.5">
              {hasImage ? (
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-[18px] border border-border bg-secondary bg-cover bg-center"
                  style={{ backgroundImage: `url(${previewImageUrl})` }}
                >
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-3">
                    <p className="text-sm font-semibold text-white">Imagem da oferta</p>
                  </div>
                </div>
              ) : null}

              <h2 className="font-heading text-2xl font-extrabold leading-tight text-foreground">
                {previewPayload.title.trim() || "Sua oferta aparece aqui"}
              </h2>

              <div className="space-y-1">
                <p className="font-heading text-3xl font-extrabold text-primary">
                  {previewPayload.price.trim() || "R$ 0,00"}
                </p>
                {previewPayload.oldPrice?.trim() ? (
                  <p className="text-base text-muted-foreground line-through">
                    {previewPayload.oldPrice}
                  </p>
                ) : null}
              </div>

              {previewPayload.description?.trim() ? (
                <p className="text-base leading-relaxed text-foreground/90">
                  {previewPayload.description}
                </p>
              ) : null}

              <p className="break-all text-sm leading-relaxed text-muted-foreground">
                {previewPayload.affiliateUrl.trim() || "https://example.com/oferta"}
              </p>
            </div>
          </div>
        </div>
      </details>
    </div>
  )
}