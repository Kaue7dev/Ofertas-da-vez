"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import {
  CheckCircle2,
  FlaskConical,
  LoaderCircle,
  RotateCcw,
  Send,
} from "lucide-react"

import Header from "@/components/Header"
import MobileNav from "@/components/MobileNav"
import { Badge } from "@/components/ui/badge"
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
]

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
  children: React.ReactNode
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

export default function TelegramAdminPage() {
  const [formState, setFormState] = useState<TelegramOfferFormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)

  const updateField = <K extends keyof TelegramOfferFormState>(
    field: K,
    value: TelegramOfferFormState[K],
  ) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handlePreset = (preset: TelegramOfferFormState) => {
    setFormState(preset)
    setFeedback(null)
  }

  const handleReset = () => {
    setFormState(EMPTY_FORM)
    setFeedback(null)
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

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 md:pb-0">
      <Header />

      <main className="py-8 md:py-10">
        <div className="container">
          <div className="mx-auto max-w-5xl space-y-6">
            <section className="rounded-[28px] border border-border bg-card p-5 shadow-card md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl space-y-3">
                  <Badge variant="highlight" className="w-fit">
                    Teste interno de publicacao
                  </Badge>
                  <div className="space-y-2">
                    <h1 className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                      Publicar oferta no Telegram
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      Ferramenta manual para testar a rota interna de publicacao sem
                      depender da home, banco ou autenticacao.
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <FlaskConical className="h-4 w-4 text-primary" />
                    Fluxo do teste
                  </div>
                  <p className="mt-2 max-w-sm leading-relaxed">
                    A tela envia o payload para <strong>/api/telegram/post-offer</strong>.
                    Nenhum segredo e exposto no front e nenhuma API externa e chamada
                    diretamente pelo navegador.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
              <div className="rounded-[28px] border border-border bg-card p-5 shadow-card md:p-8">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-heading text-xl font-bold text-foreground">
                        Dados da oferta
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Preencha manualmente ou use um modelo pronto para testar.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={isSubmitting}
                    >
                      <RotateCcw className="h-4 w-4" /> Limpar formulario
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset) => (
                      <Button
                        key={preset.label}
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePreset(preset.payload)}
                        disabled={isSubmitting}
                      >
                        Usar preset {preset.label}
                      </Button>
                    ))}
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <Field label="Title" required>
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(event) => updateField("title", event.target.value)}
                        required
                        className="h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="Ex.: Fralda Pampers Confort Sec 72un"
                      />
                    </Field>

                    <Field label="Description">
                      <textarea
                        value={formState.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        rows={4}
                        className="min-h-28 rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="Resumo curto da oferta para o canal"
                      />
                    </Field>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Price" required>
                        <input
                          type="text"
                          value={formState.price}
                          onChange={(event) => updateField("price", event.target.value)}
                          required
                          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                          placeholder="Ex.: R$ 49,90"
                        />
                      </Field>

                      <Field label="Old price">
                        <input
                          type="text"
                          value={formState.oldPrice}
                          onChange={(event) => updateField("oldPrice", event.target.value)}
                          className="h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                          placeholder="Ex.: R$ 79,90"
                        />
                      </Field>
                    </div>

                    <Field label="Image URL">
                      <input
                        type="url"
                        value={formState.imageUrl}
                        onChange={(event) => updateField("imageUrl", event.target.value)}
                        className="h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="https://..."
                      />
                    </Field>

                    <Field label="Affiliate URL" required>
                      <input
                        type="url"
                        value={formState.affiliateUrl}
                        onChange={(event) => updateField("affiliateUrl", event.target.value)}
                        required
                        className="h-12 rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="https://example.com/oferta"
                      />
                    </Field>

                    {feedback ? (
                      <div
                        aria-live="polite"
                        className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
                          feedback.type === "success"
                            ? "border-success/20 bg-success/10 text-foreground"
                            : "border-destructive/20 bg-destructive/10 text-foreground"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              feedback.type === "success"
                                ? "text-success"
                                : "text-destructive"
                            }`}
                          />
                          <span>{feedback.message}</span>
                        </div>
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Publicando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Publicar no Telegram
                          </>
                        )}
                      </Button>

                      <p className="text-sm text-muted-foreground">
                        Se `imageUrl` estiver vazio, a rota usa `sendMessage`. Se estiver
                        preenchido, usa `sendPhoto`.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-[28px] border border-border bg-card p-5 shadow-card md:p-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    Regras rapidas
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    <li>`title`, `price` e `affiliateUrl` sao obrigatorios.</li>
                    <li>`description`, `oldPrice` e `imageUrl` sao opcionais.</li>
                    <li>A chamada sai do browser apenas para a rota interna do app.</li>
                    <li>Se houver bloqueio de rede para `api.telegram.org`, a falha aparecera aqui como erro amigavel.</li>
                  </ul>
                </div>

                <div className="rounded-[28px] border border-border bg-card p-5 shadow-card md:p-6">
                  <h2 className="font-heading text-lg font-bold text-foreground">
                    Payload atual
                  </h2>
                  <pre className="mt-3 overflow-x-auto rounded-2xl bg-secondary/50 p-4 text-xs leading-relaxed text-foreground">
{JSON.stringify(buildPayload(formState), null, 2)}
                  </pre>
                </div>
              </aside>
            </section>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}