"use client"

import type { FormEvent, ReactNode } from "react"
import { useState } from "react"
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  FileSpreadsheet,
  ImageIcon,
  ImagePlus,
  LoaderCircle,
  PackageSearch,
  RotateCcw,
  Send,
  Sparkles,
  Store,
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

type ImportedShopeeItem = {
  id: string
  itemId: string
  title: string
  price: string
  sales: string
  shopName: string
  commission: string
  affiliateUrl: string
  productUrl: string
  imageUrl: string
  isPublishing: boolean
  feedback: FeedbackState
}

type CsvImportResult = {
  items: ImportedShopeeItem[]
  skippedRows: number
}

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
  note: string
  payload: TelegramOfferFormState
}> = [
  {
    label: "Fralda",
    note: "Preco popular com imagem e desconto forte.",
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
    note: "Ticket maior para testar produto premium.",
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
    note: "Opcao leve para validar texto com imagem.",
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

const EXPECTED_SHOPEE_HEADERS = [
  "Item Id",
  "Item Name",
  "Price",
  "Sales",
  "Shop Name",
  "Commission Rate",
  "Commission",
  "Product Link",
  "Offer Link",
] as const

function normalizeCsvHeader(value: string) {
  return value.replace(/^\uFEFF/, "").trim()
}

function parseCsvRows(input: string) {
  const normalizedInput = input.replace(/^\uFEFF/, "")
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let insideQuotes = false

  for (let index = 0; index < normalizedInput.length; index += 1) {
    const character = normalizedInput[index]

    if (character === '"') {
      if (insideQuotes && normalizedInput[index + 1] === '"') {
        currentField += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }

      continue
    }

    if (character === "," && !insideQuotes) {
      currentRow.push(currentField.trim())
      currentField = ""
      continue
    }

    if (character === "\n" && !insideQuotes) {
      currentRow.push(currentField.trim())
      if (currentRow.some((value) => value.length > 0)) {
        rows.push(currentRow)
      }
      currentRow = []
      currentField = ""
      continue
    }

    if (character !== "\r") {
      currentField += character
    }
  }

  currentRow.push(currentField.trim())

  if (currentRow.some((value) => value.length > 0)) {
    rows.push(currentRow)
  }

  return rows
}

function formatBrazilianPrice(value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return ""
  }

  if (/^R\$\s*/i.test(trimmedValue)) {
    return trimmedValue
  }

  const sanitizedValue = trimmedValue
    .replace(/R\$/gi, "")
    .replace(/\s/g, "")

  const lastCommaIndex = sanitizedValue.lastIndexOf(",")
  const lastDotIndex = sanitizedValue.lastIndexOf(".")
  const decimalSeparatorIndex = Math.max(lastCommaIndex, lastDotIndex)

  let normalizedNumberText = sanitizedValue

  if (decimalSeparatorIndex !== -1) {
    const integerPart = sanitizedValue
      .slice(0, decimalSeparatorIndex)
      .replace(/[.,]/g, "")
    const decimalPart = sanitizedValue
      .slice(decimalSeparatorIndex + 1)
      .replace(/[.,]/g, "")

    normalizedNumberText = `${integerPart}.${decimalPart}`
  } else {
    normalizedNumberText = sanitizedValue.replace(/[.,]/g, "")
  }

  const numericValue = Number(normalizedNumberText.replace(/[^\d.-]/g, ""))

  if (!Number.isNaN(numericValue)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue)
  }

  return trimmedValue.startsWith("R$") ? trimmedValue : `R$ ${trimmedValue}`
}

function buildImportedItemDescription(item: ImportedShopeeItem) {
  return [
    `Loja: ${item.shopName || "-"}`,
    `Vendas: ${item.sales || "-"}`,
    `Comissao estimada: ${item.commission || "-"}`,
  ].join("\n")
}

function buildImportedItemPayload(item: ImportedShopeeItem): TelegramOfferPayload {
  return {
    title: item.title,
    description: buildImportedItemDescription(item),
    price: item.price,
    affiliateUrl: item.affiliateUrl,
    ...(item.imageUrl.trim() ? { imageUrl: item.imageUrl } : {}),
  }
}

function parseShopeeCsv(input: string): CsvImportResult {
  const rows = parseCsvRows(input)

  if (rows.length < 2) {
    throw new Error("Cole um CSV valido da Shopee com cabecalho e pelo menos uma linha.")
  }

  const headerRow = rows[0].map(normalizeCsvHeader)
  const missingHeaders = EXPECTED_SHOPEE_HEADERS.filter(
    (header) => !headerRow.includes(header),
  )

  if (missingHeaders.length > 0) {
    throw new Error("O CSV nao parece estar no formato esperado da Shopee.")
  }

  const getFieldIndex = (header: (typeof EXPECTED_SHOPEE_HEADERS)[number]) =>
    headerRow.indexOf(header)

  let skippedRows = 0

  const items = rows.slice(1).reduce<ImportedShopeeItem[]>((result, row, index) => {
    const itemId = row[getFieldIndex("Item Id")]?.trim() || `row-${index + 1}`
    const title = row[getFieldIndex("Item Name")]?.trim() || ""
    const affiliateUrl = row[getFieldIndex("Offer Link")]?.trim() || ""

    if (!title || !affiliateUrl) {
      skippedRows += 1
      return result
    }

    result.push({
      id: `${itemId}-${index}`,
      itemId,
      title,
      price: formatBrazilianPrice(row[getFieldIndex("Price")]?.trim() || ""),
      sales: row[getFieldIndex("Sales")]?.trim() || "",
      shopName: row[getFieldIndex("Shop Name")]?.trim() || "",
      commission: row[getFieldIndex("Commission")]?.trim() || "",
      affiliateUrl,
      productUrl: row[getFieldIndex("Product Link")]?.trim() || "",
      imageUrl: "",
      isPublishing: false,
      feedback: null,
    })

    return result
  }, [])

  return {
    items,
    skippedRows,
  }
}

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
  hint,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="space-y-1">
        <span className="block text-[15px] font-semibold text-foreground md:text-base">
          {label}
          {required ? <span className="text-primary"> *</span> : null}
        </span>
        {hint ? (
          <span className="block text-sm leading-relaxed text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </span>
      {children}
    </label>
  )
}

export default function TelegramAdminPage() {
  const [formState, setFormState] = useState<TelegramOfferFormState>(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const [activePresetLabel, setActivePresetLabel] = useState<string | null>(null)
  const [csvInput, setCsvInput] = useState("")
  const [csvFeedback, setCsvFeedback] = useState<FeedbackState>(null)
  const [importedItems, setImportedItems] = useState<ImportedShopeeItem[]>([])

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

  const handleImportCsv = () => {
    setCsvFeedback(null)

    if (!csvInput.trim()) {
      setCsvFeedback({
        type: "error",
        message: "Cole o CSV da Shopee antes de importar.",
      })
      return
    }

    try {
      const { items, skippedRows } = parseShopeeCsv(csvInput)

      if (items.length === 0) {
        setImportedItems([])
        setCsvFeedback({
          type: "error",
          message: "Nenhum produto valido foi encontrado no CSV informado.",
        })
        return
      }

      setImportedItems(items)
      setCsvFeedback({
        type: "success",
        message:
          skippedRows > 0
            ? `${items.length} produtos importados. ${skippedRows} linhas foram ignoradas por estarem incompletas.`
            : `${items.length} produtos importados com sucesso.`,
      })
    } catch (error) {
      setImportedItems([])
      setCsvFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel importar o CSV da Shopee.",
      })
    }
  }

  const updateImportedItemImageUrl = (itemId: string, imageUrl: string) => {
    setImportedItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              imageUrl,
              feedback: null,
            }
          : item,
      ),
    )
  }

  const handlePublishImportedItem = async (itemId: string) => {
    const currentItem = importedItems.find((item) => item.id === itemId)

    if (!currentItem) {
      return
    }

    setImportedItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              isPublishing: true,
              feedback: null,
            }
          : item,
      ),
    )

    try {
      await publishTelegramOffer(buildImportedItemPayload(currentItem))
      setImportedItems((current) =>
        current.map((item) =>
          item.id === itemId
            ? {
                ...item,
                isPublishing: false,
                feedback: {
                  type: "success",
                  message: "Oferta publicada no Telegram com sucesso.",
                },
              }
            : item,
        ),
      )
    } catch (error) {
      setImportedItems((current) =>
        current.map((item) =>
          item.id === itemId
            ? {
                ...item,
                isPublishing: false,
                feedback: {
                  type: "error",
                  message:
                    error instanceof Error
                      ? error.message
                      : "Nao foi possivel publicar a oferta no Telegram.",
                },
              }
            : item,
        ),
      )
    }
  }

  const previewPayload = buildPayload(formState)
  const hasImage = Boolean(previewPayload.imageUrl?.trim())

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 md:pb-0">
      <Header />

      <main className="py-4 md:py-8">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-4 md:space-y-6">
            <section className="overflow-hidden rounded-[30px] border border-border bg-gradient-to-b from-card to-secondary/70 p-5 shadow-card md:p-8">
              <div className="space-y-5">
                <div className="space-y-3">
                  <Badge variant="highlight" className="w-fit rounded-full px-3 py-1">
                    Canal Ofertas da Vez Baby
                  </Badge>
                  <h1 className="max-w-xl font-heading text-[2rem] font-extrabold leading-[1.02] text-foreground md:text-5xl">
                    Publique uma nova oferta no canal em poucos toques.
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    Escolha um modelo pronto ou preencha os campos manualmente. A
                    experiencia foi pensada para voce testar rapido no celular, sem
                    desviar do fluxo principal do produto.
                  </p>
                </div>

                <div className="rounded-[26px] border border-border bg-background/85 p-4 backdrop-blur-sm md:p-5">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-base font-semibold text-foreground">
                        Modelos rapidos para comecar
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Use um preset para testar mais rapido. Se quiser validar o envio
                        sem foto, e so deixar a imagem vazia antes de publicar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 md:space-y-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {PRESETS.map((preset) => {
                  const isActive = activePresetLabel === preset.label

                  return (
                    <Button
                      key={preset.label}
                      type="button"
                      variant={isActive ? "default" : "secondary"}
                      onClick={() => handlePreset(preset.label, preset.payload)}
                      disabled={isSubmitting}
                      className="h-auto w-full flex-col items-start gap-1.5 rounded-[24px] px-4 py-4 text-left"
                    >
                      <span className="text-base font-bold">{preset.label}</span>
                      <span
                        className={`text-sm leading-relaxed ${
                          isActive
                            ? "text-primary-foreground/85"
                            : "text-muted-foreground"
                        }`}
                      >
                        {preset.note}
                      </span>
                    </Button>
                  )
                })}
              </div>

              <div className="rounded-[30px] border border-border bg-card p-5 shadow-card md:p-8">
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1.5">
                      <h2 className="font-heading text-2xl font-bold text-foreground md:text-[2rem]">
                        Monte a oferta
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        Preencha os campos do jeito que a oferta deve aparecer no canal.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      <RotateCcw className="h-4 w-4" /> Limpar
                    </Button>
                  </div>

                  <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
                    <Field
                      label="Nome da oferta"
                      required
                      hint="Use um titulo direto, facil de bater o olho e clicar."
                    >
                      <input
                        type="text"
                        value={formState.title}
                        onChange={(event) => updateField("title", event.target.value)}
                        required
                        className="h-14 rounded-[22px] border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="Ex.: Fralda Pampers Confort Sec 72un"
                      />
                    </Field>

                    <Field
                      label="Resumo"
                      hint="Opcional, mas ajuda a dar contexto e valor para a oferta."
                    >
                      <textarea
                        value={formState.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        rows={4}
                        className="min-h-32 rounded-[22px] border border-border bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="Ex.: Oferta teste para o canal Ofertas da Vez Baby."
                      />
                    </Field>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Preco atual" required>
                        <input
                          type="text"
                          value={formState.price}
                          onChange={(event) => updateField("price", event.target.value)}
                          required
                          className="h-14 rounded-[22px] border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                          placeholder="Ex.: R$ 49,90"
                        />
                      </Field>

                      <Field label="Preco de antes">
                        <input
                          type="text"
                          value={formState.oldPrice}
                          onChange={(event) => updateField("oldPrice", event.target.value)}
                          className="h-14 rounded-[22px] border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                          placeholder="Ex.: R$ 79,90"
                        />
                      </Field>
                    </div>

                    <Field
                      label="Foto da oferta"
                      hint="Se deixar vazio, o envio vai como mensagem sem imagem."
                    >
                      <input
                        type="url"
                        value={formState.imageUrl}
                        onChange={(event) => updateField("imageUrl", event.target.value)}
                        className="h-14 rounded-[22px] border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="https://..."
                      />
                    </Field>

                    <Field
                      label="Link da oferta"
                      required
                      hint="Cole o link final que a pessoa deve abrir ao tocar na oferta."
                    >
                      <input
                        type="url"
                        value={formState.affiliateUrl}
                        onChange={(event) => updateField("affiliateUrl", event.target.value)}
                        required
                        className="h-14 rounded-[22px] border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                        placeholder="https://example.com/oferta"
                      />
                    </Field>

                    {feedback ? (
                      <div
                        aria-live="polite"
                        className={`rounded-[22px] border px-4 py-3.5 text-sm leading-relaxed md:text-base ${
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

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 w-full text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                            Publicando agora...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Publicar no Telegram
                          </>
                        )}
                      </Button>

                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Para validar um post sem foto, deixe a imagem vazia. Para testar
                        com foto, basta colar uma URL valida.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              <div className="rounded-[30px] border border-border bg-card p-5 shadow-card md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <h2 className="font-heading text-2xl font-bold text-foreground md:text-[2rem]">
                        Previa da postagem
                      </h2>
                      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                        Veja rapidamente como a oferta esta ficando antes de enviar.
                      </p>
                    </div>
                    <Badge variant={hasImage ? "highlight" : "secondary"}>
                      {hasImage ? "Com foto" : "So texto"}
                    </Badge>
                  </div>

                  <div className="rounded-[26px] border border-border bg-secondary/55 p-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      {hasImage ? (
                        <ImageIcon className="h-4 w-4 text-primary" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-primary" />
                      )}
                      Canal Ofertas da Vez Baby
                    </div>

                    <div className="mt-4 space-y-3">
                      <h3 className="font-heading text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
                        {previewPayload.title.trim() || "Sua oferta aparece aqui"}
                      </h3>

                      <div className="space-y-1">
                        <p className="font-heading text-3xl font-extrabold text-primary md:text-4xl">
                          {previewPayload.price.trim() || "R$ 0,00"}
                        </p>
                        {previewPayload.oldPrice?.trim() ? (
                          <p className="text-base text-muted-foreground line-through">
                            {previewPayload.oldPrice}
                          </p>
                        ) : null}
                      </div>

                      <p className="text-base leading-relaxed text-foreground/90">
                        {previewPayload.description?.trim() ||
                          "Adicione um resumo curto para dar mais contexto e valor para a oferta."}
                      </p>

                      <div className="rounded-[22px] bg-background px-4 py-4">
                        <p className="text-sm font-semibold text-foreground">
                          Comprar agora
                        </p>
                        <p className="mt-1 break-all text-sm leading-relaxed text-muted-foreground">
                          {previewPayload.affiliateUrl.trim() || "https://example.com/oferta"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-border bg-background px-4 py-4">
                    <p className="text-base font-semibold text-foreground">
                      Dicas para um teste mais rapido
                    </p>
                    <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      <li>Comece por um preset e ajuste so o necessario.</li>
                      <li>Use um titulo curto e um preco bem visivel.</li>
                      <li>Se quiser validar o modo texto, remova a foto antes de enviar.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-border bg-card p-5 shadow-card md:p-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
                      Importar CSV Shopee
                    </Badge>
                    <h2 className="font-heading text-2xl font-bold text-foreground md:text-[2rem]">
                      Cole o CSV e transforme em ofertas prontas
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      Importe produtos da Shopee, revise cada card e publique um por vez.
                      O formulario manual continua funcionando normalmente acima.
                    </p>
                  </div>

                  <div className="rounded-[26px] border border-border bg-secondary/45 p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-primary/10 p-2.5 text-primary">
                        <FileSpreadsheet className="h-5 w-5" />
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-base font-semibold text-foreground">
                          Formato esperado da Shopee
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Cabecalho: Item Id, Item Name, Price, Sales, Shop Name,
                          Commission Rate, Commission, Product Link, Offer Link.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Field
                      label="CSV da Shopee"
                      hint="Cole aqui o conteudo bruto exportado da Shopee. O parser trata campos entre aspas e valores com virgula decimal."
                    >
                      <textarea
                        value={csvInput}
                        onChange={(event) => setCsvInput(event.target.value)}
                        rows={8}
                        className="min-h-48 rounded-[22px] border border-border bg-background px-4 py-3.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 md:text-base"
                        placeholder="Item Id, Item Name, Price, Sales, Shop Name, Commission Rate, Commission, Product Link, Offer Link"
                      />
                    </Field>

                    {csvFeedback ? (
                      <div
                        aria-live="polite"
                        className={`rounded-[22px] border px-4 py-3.5 text-sm leading-relaxed md:text-base ${
                          csvFeedback.type === "success"
                            ? "border-success/20 bg-success/10 text-foreground"
                            : "border-destructive/20 bg-destructive/10 text-foreground"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {csvFeedback.type === "success" ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          ) : (
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                          )}
                          <span>{csvFeedback.message}</span>
                        </div>
                      </div>
                    ) : null}

                    <Button
                      type="button"
                      onClick={handleImportCsv}
                      className="h-14 w-full text-base"
                    >
                      <FileSpreadsheet className="h-5 w-5" />
                      Importar CSV
                    </Button>
                  </div>
                </div>
              </div>

              {importedItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h2 className="font-heading text-2xl font-bold text-foreground md:text-[2rem]">
                      Produtos importados
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      Revise cada item, cole uma imagem se quiser e publique no canal.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {importedItems.map((item) => {
                      const itemDescription = buildImportedItemDescription(item)

                      return (
                        <article
                          key={item.id}
                          className="overflow-hidden rounded-[28px] border border-border bg-card shadow-card"
                        >
                          <div className="relative aspect-[16/10] bg-secondary/50">
                            {item.imageUrl.trim() ? (
                              <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-highlight/35 via-card to-primary/10 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                  <ImageIcon className="h-4 w-4 text-primary" />
                                  Imagem pronta para publicar
                                </div>
                                <div className="rounded-[20px] bg-background/90 px-4 py-3 backdrop-blur-sm">
                                  <p className="text-sm font-semibold text-foreground">
                                    URL de imagem adicionada
                                  </p>
                                  <p className="mt-1 line-clamp-2 break-all text-xs leading-relaxed text-muted-foreground">
                                    {item.imageUrl}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-secondary via-card to-secondary/80 p-4">
                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                  <PackageSearch className="h-4 w-4 text-primary" />
                                  Shopee import
                                </div>
                                <div className="rounded-[20px] bg-background/85 px-4 py-3 backdrop-blur-sm">
                                  <p className="font-heading text-3xl font-extrabold text-primary">
                                    {item.price || "R$ 0,00"}
                                  </p>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    Cole uma foto para publicar com imagem.
                                  </p>
                                </div>
                              </div>
                            )}

                            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                              <Badge className="bg-primary px-2 py-1 text-xs text-primary-foreground">
                                {item.price || "Sem preco"}
                              </Badge>
                              <Badge variant="secondary" className="px-2 py-1 text-xs">
                                {item.sales || "Sem vendas"}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-4 p-4 md:p-5">
                            <div className="space-y-2">
                              <h3 className="font-heading text-2xl font-extrabold leading-tight text-foreground">
                                {item.title}
                              </h3>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Store className="h-4 w-4 text-primary" />
                                {item.shopName || "Loja nao informada"}
                              </div>
                            </div>

                            <div className="grid gap-2 sm:grid-cols-3">
                              <div className="rounded-[18px] bg-secondary/55 px-3 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Vendas
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {item.sales || "-"}
                                </p>
                              </div>
                              <div className="rounded-[18px] bg-secondary/55 px-3 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Comissao
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {item.commission || "-"}
                                </p>
                              </div>
                              <div className="rounded-[18px] bg-secondary/55 px-3 py-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                  Item ID
                                </p>
                                <p className="mt-1 text-sm font-semibold text-foreground">
                                  {item.itemId}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-[20px] bg-background px-4 py-4">
                              <p className="text-sm font-semibold text-foreground">
                                Descricao que vai para o Telegram
                              </p>
                              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                                {itemDescription}
                              </p>
                            </div>

                            <Field
                              label="Foto para publicar"
                              hint="Opcional. Cole uma URL de imagem se quiser publicar esse item com foto."
                            >
                              <div className="space-y-2">
                                <div className="relative">
                                  <ImagePlus className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                  <input
                                    type="url"
                                    value={item.imageUrl}
                                    onChange={(event) =>
                                      updateImportedItemImageUrl(item.id, event.target.value)
                                    }
                                    className="h-14 w-full rounded-[22px] border border-border bg-background pl-11 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50"
                                    placeholder="https://..."
                                  />
                                </div>
                              </div>
                            </Field>

                            {item.feedback ? (
                              <div
                                aria-live="polite"
                                className={`rounded-[22px] border px-4 py-3.5 text-sm leading-relaxed md:text-base ${
                                  item.feedback.type === "success"
                                    ? "border-success/20 bg-success/10 text-foreground"
                                    : "border-destructive/20 bg-destructive/10 text-foreground"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  {item.feedback.type === "success" ? (
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                                  ) : (
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                                  )}
                                  <span>{item.feedback.message}</span>
                                </div>
                              </div>
                            ) : null}

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                              <Button
                                type="button"
                                disabled={item.isPublishing}
                                onClick={() => handlePublishImportedItem(item.id)}
                                className="h-12 w-full sm:w-auto"
                              >
                                {item.isPublishing ? (
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

                              <a
                                href={item.affiliateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 sm:w-auto"
                              >
                                Abrir link da oferta
                                <ArrowUpRight className="h-4 w-4" />
                              </a>
                            </div>

                            {item.productUrl ? (
                              <p className="break-all text-xs leading-relaxed text-muted-foreground">
                                Link do produto: {item.productUrl}
                              </p>
                            ) : null}
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </div>
              ) : null}
            </section>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}