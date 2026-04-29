"use client"

import type { ChangeEvent, ReactNode } from "react"
import { useState } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileSpreadsheet,
  Link2,
  LoaderCircle,
  PencilLine,
  Send,
  Store,
  Tag,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  publishTelegramOffer,
  type TelegramOfferPayload,
} from "@/lib/services/telegramOfferService"

type FeedbackState =
  | {
      type: "success" | "error"
      message: string
    }
  | null

type MarketplaceOption = {
  id: "shopee" | "amazon" | "mercado-livre" | "magalu"
  label: string
  enabled: boolean
}

type CsvImportedItem = {
  id: string
  itemId: string
  productLink: string
  originalTitle: string
  title: string
  price: string
  oldPrice: string
  description: string
  shopName: string
  sales: string
  commission: string
  affiliateUrl: string
  imageUrl: string
  isEditing: boolean
  isEnrichingImage: boolean
  isPublishing: boolean
  feedback: FeedbackState
}

type ShopeeEnrichRequestItem = {
  itemId: string
  productLink: string
  offerLink?: string
}

type ShopeeEnrichResponseItem = {
  itemId: string
  imageUrl?: string
  title?: string
  description?: string
}

type ShopeeEnrichResponse = {
  items?: ShopeeEnrichResponseItem[]
}

type EditableItemField =
  | "title"
  | "price"
  | "description"
  | "imageUrl"
  | "affiliateUrl"

type ParseShopeeCsvResult = {
  items: CsvImportedItem[]
  skippedRows: number
}

const MARKETPLACES: MarketplaceOption[] = [
  { id: "shopee", label: "Shopee", enabled: true },
  { id: "amazon", label: "Amazon", enabled: false },
  { id: "mercado-livre", label: "Mercado Livre", enabled: false },
  { id: "magalu", label: "Magalu", enabled: false },
]

const REQUIRED_SHOPEE_HEADERS = ["Item Name", "Price", "Offer Link"] as const

const INPUT_CLASSNAME =
  "h-12 rounded-[18px] border-2 border-border bg-background px-4 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"

const TEXTAREA_CLASSNAME =
  "min-h-28 rounded-[18px] border-2 border-border bg-background px-4 py-3 text-[16px] font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"

const TITLE_MAX_LENGTH = 120
const MAX_ENRICH_ITEMS = 30

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

  return `R$ ${trimmedValue}`
}

function normalizeTitleToken(token: string) {
  return token
    .toLocaleLowerCase("pt-BR")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")
}

function areEquivalentTokenSequences(left: string[], right: string[]) {
  if (left.length !== right.length) {
    return false
  }

  return left.every((token, index) => token === right[index])
}

function collapseRepeatedTokenSequences(tokens: string[]) {
  const result: string[] = []
  let index = 0

  while (index < tokens.length) {
    let matchedSequence = false

    for (const sequenceLength of [3, 2, 1]) {
      if (index + sequenceLength * 2 > tokens.length) {
        continue
      }

      const currentSequence = tokens.slice(index, index + sequenceLength)
      const normalizedCurrentSequence = currentSequence.map(normalizeTitleToken)

      if (!normalizedCurrentSequence.some(Boolean)) {
        continue
      }

      const nextSequence = tokens.slice(
        index + sequenceLength,
        index + sequenceLength * 2,
      )
      const normalizedNextSequence = nextSequence.map(normalizeTitleToken)

      if (!areEquivalentTokenSequences(normalizedCurrentSequence, normalizedNextSequence)) {
        continue
      }

      result.push(...currentSequence)
      index += sequenceLength * 2

      while (index + sequenceLength <= tokens.length) {
        const repeatedSequence = tokens.slice(index, index + sequenceLength)
        const normalizedRepeatedSequence = repeatedSequence.map(normalizeTitleToken)

        if (
          !areEquivalentTokenSequences(
            normalizedCurrentSequence,
            normalizedRepeatedSequence,
          )
        ) {
          break
        }

        index += sequenceLength
      }

      matchedSequence = true
      break
    }

    if (!matchedSequence) {
      result.push(tokens[index])
      index += 1
    }
  }

  return result
}

function truncateTitle(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value
  }

  const truncatedValue = value.slice(0, maxLength).trim()
  const lastSpaceIndex = truncatedValue.lastIndexOf(" ")

  if (lastSpaceIndex <= maxLength * 0.6) {
    return `${truncatedValue}...`
  }

  return `${truncatedValue.slice(0, lastSpaceIndex).trim()}...`
}

function sanitizeShopeeTitle(value: string) {
  const normalizedWhitespace = value.replace(/\s+/g, " ").trim()

  if (!normalizedWhitespace) {
    return ""
  }

  const collapsedTokens = collapseRepeatedTokenSequences(
    normalizedWhitespace.split(" "),
  )
  const collapsedTitle = collapsedTokens.join(" ").replace(/\s+/g, " ").trim()

  return truncateTitle(collapsedTitle, TITLE_MAX_LENGTH)
}

function getFieldValue(row: string[], headerIndex: Map<string, number>, header: string) {
  const index = headerIndex.get(header)

  if (index === undefined) {
    return ""
  }

  return row[index]?.trim() || ""
}

function buildShopeeDescription(shopName: string, sales: string, commission: string) {
  return [
    `Loja: ${shopName || "-"}`,
    `Vendas: ${sales || "-"}`,
    `Comissao estimada: ${commission || "-"}`,
  ].join("\n")
}

function parseShopeeCsv(input: string): ParseShopeeCsvResult {
  const rows = parseCsvRows(input)

  if (rows.length < 2) {
    throw new Error("Envie um CSV da Shopee com cabecalho e pelo menos uma linha.")
  }

  const headerRow = rows[0].map(normalizeCsvHeader)
  const headerIndex = new Map<string, number>()

  headerRow.forEach((header, index) => {
    headerIndex.set(header, index)
  })

  const missingHeaders = REQUIRED_SHOPEE_HEADERS.filter(
    (header) => !headerIndex.has(header),
  )

  if (missingHeaders.length > 0) {
    throw new Error("O CSV nao parece estar no formato esperado da Shopee.")
  }

  let skippedRows = 0

  const items = rows.slice(1).reduce<CsvImportedItem[]>((result, row, index) => {
    const originalTitle = getFieldValue(row, headerIndex, "Item Name")
    const title = sanitizeShopeeTitle(originalTitle)
    const price = formatBrazilianPrice(getFieldValue(row, headerIndex, "Price"))
    const productLink = getFieldValue(row, headerIndex, "Product Link")
    const affiliateUrl = getFieldValue(row, headerIndex, "Offer Link")

    if (!originalTitle || !title || !price || !affiliateUrl) {
      skippedRows += 1
      return result
    }

    const itemId = getFieldValue(row, headerIndex, "Item Id") || `row-${index + 1}`
    const shopName = getFieldValue(row, headerIndex, "Shop Name")
    const sales = getFieldValue(row, headerIndex, "Sales")
    const commission = getFieldValue(row, headerIndex, "Commission")

    result.push({
      id: `${itemId}-${index}`,
      itemId,
      productLink,
      originalTitle,
      title,
      price,
      oldPrice: "",
      description: buildShopeeDescription(shopName, sales, commission),
      shopName,
      sales,
      commission,
      affiliateUrl,
      imageUrl: "",
      isEditing: false,
      isEnrichingImage: false,
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

function buildPublishPayload(item: CsvImportedItem): TelegramOfferPayload {
  return {
    title: item.title,
    price: item.price,
    affiliateUrl: item.affiliateUrl,
    ...(item.description.trim() ? { description: item.description } : {}),
    ...(item.imageUrl.trim() ? { imageUrl: item.imageUrl } : {}),
  }
}

async function enrichShopeeItems(items: ShopeeEnrichRequestItem[]) {
  const response = await fetch("/api/marketplaces/shopee/enrich", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  })

  let responseBody: ShopeeEnrichResponse | null = null

  try {
    responseBody = (await response.json()) as ShopeeEnrichResponse
  } catch {
    responseBody = null
  }

  if (!response.ok || !Array.isArray(responseBody?.items)) {
    throw new Error("Nao foi possivel buscar imagens da Shopee agora.")
  }

  return responseBody.items
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
      <span className="text-sm font-semibold text-foreground">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

function FeedbackBox({ feedback }: { feedback: FeedbackState }) {
  if (!feedback) {
    return null
  }

  return (
    <div
      aria-live="polite"
      className={`rounded-[18px] border px-4 py-3 text-sm font-medium leading-relaxed ${
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
  )
}

export default function CsvImportPanel() {
  const [selectedMarketplace] = useState<MarketplaceOption["id"]>("shopee")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [csvText, setCsvText] = useState("")
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)
  const [isEnrichingImages, setIsEnrichingImages] = useState(false)
  const [importFeedback, setImportFeedback] = useState<FeedbackState>(null)
  const [items, setItems] = useState<CsvImportedItem[]>([])

  const hasImportSource = Boolean(selectedFile || csvText.trim())

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] || null
    setSelectedFile(nextFile)
    setImportFeedback(null)
  }

  const handleClearImport = () => {
    setSelectedFile(null)
    setCsvText("")
    setIsEnrichingImages(false)
    setItems([])
    setImportFeedback(null)
  }

  const handleGeneratePreview = async () => {
    if (!hasImportSource) {
      setImportFeedback({
        type: "error",
        message: "Selecione um arquivo CSV ou cole o conteudo antes de gerar a previa.",
      })
      return
    }

    setIsGeneratingPreview(true)
    setImportFeedback(null)

    try {
      const source = selectedFile ? await selectedFile.text() : csvText
      const { items: parsedItems, skippedRows } = parseShopeeCsv(source)

      if (parsedItems.length === 0) {
        setImportFeedback({
          type: "error",
          message: "Nenhum produto valido foi encontrado nesse CSV.",
        })
        return
      }

      const enrichableItems = parsedItems
        .filter((item) => item.productLink.trim())
        .slice(0, MAX_ENRICH_ITEMS)
      const enrichableItemIds = new Set(enrichableItems.map((item) => item.id))
      const hasEnrichmentLimit = parsedItems.filter((item) => item.productLink.trim()).length > enrichableItems.length
      const previewItems = parsedItems.map((item) => ({
        ...item,
        isEnrichingImage: enrichableItemIds.has(item.id),
      }))

      setItems(previewItems)
      setImportFeedback({
        type: "success",
        message:
          skippedRows > 0
            ? `${parsedItems.length} produtos prontos. ${skippedRows} linhas foram ignoradas.${enrichableItems.length > 0 ? " Buscando imagens..." : ""}${hasEnrichmentLimit ? " Apenas os 30 primeiros links serao enriquecidos." : ""}`
            : `${parsedItems.length} produtos prontos para revisar.${enrichableItems.length > 0 ? " Buscando imagens..." : ""}${hasEnrichmentLimit ? " Apenas os 30 primeiros links serao enriquecidos." : ""}`,
      })

      if (enrichableItems.length === 0) {
        return
      }

      setIsEnrichingImages(true)

      try {
        const enrichedItems = await enrichShopeeItems(
          enrichableItems.map((item) => ({
            itemId: item.itemId,
            productLink: item.productLink,
            offerLink: item.affiliateUrl,
          })),
        )
        const enrichmentMap = new Map(
          enrichedItems.map((item) => [item.itemId, item]),
        )
        const foundImagesCount = enrichedItems.filter((item) => item.imageUrl?.trim()).length

        setItems((current) =>
          current.map((item) => {
            if (!item.isEnrichingImage) {
              return item
            }

            const enrichedItem = enrichmentMap.get(item.itemId)
            const sanitizedOriginalTitle = sanitizeShopeeTitle(item.originalTitle)
            const nextTitle = enrichedItem?.title?.trim()
              ? sanitizeShopeeTitle(enrichedItem.title)
              : item.title

            return {
              ...item,
              title:
                item.title === sanitizedOriginalTitle && nextTitle
                  ? nextTitle
                  : item.title,
              imageUrl: item.imageUrl.trim() || enrichedItem?.imageUrl?.trim() || "",
              isEnrichingImage: false,
            }
          }),
        )
        setImportFeedback({
          type: "success",
          message:
            foundImagesCount > 0
              ? `${parsedItems.length} produtos prontos. ${foundImagesCount} imagens encontradas automaticamente.${hasEnrichmentLimit ? " Apenas os 30 primeiros links foram enriquecidos." : ""}`
              : `${parsedItems.length} produtos prontos. Nenhuma imagem automatica foi encontrada.${hasEnrichmentLimit ? " Apenas os 30 primeiros links foram enriquecidos." : ""}`,
        })
      } catch {
        setItems((current) =>
          current.map((item) => ({
            ...item,
            isEnrichingImage: false,
          })),
        )
        setImportFeedback({
          type: "success",
          message: `${parsedItems.length} produtos prontos para revisar. Nao foi possivel buscar imagens automaticamente agora.`,
        })
      } finally {
        setIsEnrichingImages(false)
      }
    } catch (error) {
      setImportFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel gerar a previa do CSV.",
      })
    } finally {
      setIsGeneratingPreview(false)
    }
  }

  const handleToggleEditing = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              isEditing: !item.isEditing,
              feedback: null,
            }
          : item,
      ),
    )
  }

  const handleDeleteItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const handleUpdateItemField = <K extends EditableItemField>(
    id: string,
    field: K,
    value: CsvImportedItem[K],
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              feedback: null,
            }
          : item,
      ),
    )
  }

  const handlePublishItem = async (id: string) => {
    const currentItem = items.find((item) => item.id === id)

    if (!currentItem) {
      return
    }

    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              isPublishing: true,
              feedback: null,
            }
          : item,
      ),
    )

    try {
      await publishTelegramOffer(buildPublishPayload(currentItem))

      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                isPublishing: false,
                feedback: {
                  type: "success",
                  message: "Produto publicado no Telegram.",
                },
              }
            : item,
        ),
      )
    } catch (error) {
      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                isPublishing: false,
                feedback: {
                  type: "error",
                  message:
                    error instanceof Error
                      ? error.message
                      : "Nao foi possivel publicar esse produto.",
                },
              }
            : item,
        ),
      )
    }
  }

  return (
    <div className="space-y-4 md:space-y-5">
      <header className="space-y-3">
        <h1 className="font-heading text-[2rem] font-extrabold leading-none text-foreground md:text-[2.25rem]">
          Importar CSV
        </h1>

        <div className="flex flex-wrap gap-2">
          {MARKETPLACES.map((marketplace) => {
            const isSelected = marketplace.id === selectedMarketplace

            return (
              <Button
                key={marketplace.id}
                type="button"
                variant={isSelected ? "default" : "outline"}
                size="sm"
                disabled={!marketplace.enabled}
                className="h-10 rounded-full px-4 text-sm"
              >
                {marketplace.label}
              </Button>
            )
          })}
        </div>
      </header>

      <section className="rounded-[28px] border border-border bg-card p-4 shadow-card md:p-6">
        <div className="space-y-4">
          <Field label="Arquivo .csv" required>
            <div className="space-y-2">
              <label
                htmlFor="csv-upload"
                className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-border bg-background px-4 text-base font-semibold text-foreground transition-colors hover:border-primary"
              >
                <Upload className="h-5 w-5 text-primary" />
                Selecionar arquivo
              </label>
              <input
                id="csv-upload"
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="sr-only"
              />

              {selectedFile ? (
                <div className="flex items-center justify-between gap-3 rounded-[18px] border border-border bg-background px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">Arquivo pronto para importar</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Remover arquivo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>
          </Field>

          <details className="group rounded-[20px] border border-border bg-background">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5">
              <span className="text-sm font-semibold text-foreground">Colar CSV</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
            </summary>
            <div className="border-t border-border px-4 py-4">
              <textarea
                value={csvText}
                onChange={(event) => setCsvText(event.target.value)}
                rows={7}
                className="min-h-40 w-full rounded-[18px] border-2 border-border bg-card px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground/80 focus:border-primary"
                placeholder="Cole aqui o CSV bruto da Shopee"
              />
            </div>
          </details>

          <FeedbackBox feedback={importFeedback} />

          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              type="button"
              onClick={handleGeneratePreview}
              disabled={!hasImportSource || isGeneratingPreview}
              className="h-14 w-full text-base"
            >
              {isGeneratingPreview ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  {isEnrichingImages ? "Buscando imagens..." : "Gerando..."}
                </>
              ) : (
                <>
                  <FileSpreadsheet className="h-5 w-5" />
                  Gerar previa
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClearImport}
              disabled={isGeneratingPreview && !items.length}
              className="h-14 w-full text-base"
            >
              <X className="h-5 w-5" />
              Limpar
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">Produtos</h2>
            <p className="text-sm text-muted-foreground">
              {items.length > 0 ? `${items.length} itens na previa` : "Nenhum item importado"}
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[24px] border border-border bg-card px-4 py-5 text-sm font-medium text-muted-foreground shadow-card">
            Importe um CSV da Shopee para revisar os produtos antes de publicar.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              const hasImage = Boolean(item.imageUrl.trim())

              return (
                <article
                  key={item.id}
                  className="rounded-[24px] border border-border bg-card p-4 shadow-card"
                >
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {hasImage ? (
                        <div
                          className="aspect-[4/3] overflow-hidden rounded-[18px] border border-border bg-secondary bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.imageUrl.trim()})` }}
                        />
                      ) : item.isEnrichingImage ? (
                        <div className="flex aspect-[4/3] items-center justify-center gap-2 rounded-[18px] border border-border bg-secondary/65 text-sm font-semibold text-muted-foreground">
                          <LoaderCircle className="h-4 w-4 animate-spin text-primary" />
                          Buscando imagem...
                        </div>
                      ) : null}

                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-3 font-heading text-lg font-extrabold leading-snug text-foreground sm:text-xl">
                              {item.title}
                            </h3>
                          </div>
                          <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                            {item.price}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted-foreground">
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5">
                            <Store className="h-3.5 w-3.5" />
                            {item.shopName || "Loja -"}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5">
                            <TrendingUp className="h-3.5 w-3.5" />
                            {item.sales || "Sem vendas"}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1.5">
                            <Tag className="h-3.5 w-3.5" />
                            {item.commission || "Sem comissao"}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-[18px] border border-border bg-background px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          <Link2 className="h-3.5 w-3.5" />
                          Link da oferta
                        </div>
                        <p className="mt-2 line-clamp-2 break-all text-sm leading-relaxed text-foreground/90">
                          {item.affiliateUrl}
                        </p>
                      </div>
                    </div>

                    {item.isEditing ? (
                      <div className="space-y-3 rounded-[20px] border border-border bg-background px-4 py-4">
                        <p className="text-xs leading-relaxed text-muted-foreground">
                          Titulo original do CSV: {item.originalTitle}
                        </p>

                        <Field label="Titulo" required>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(event) =>
                              handleUpdateItemField(item.id, "title", event.target.value)
                            }
                            className={INPUT_CLASSNAME}
                          />
                        </Field>

                        <Field label="Preco" required>
                          <input
                            type="text"
                            value={item.price}
                            onChange={(event) =>
                              handleUpdateItemField(item.id, "price", event.target.value)
                            }
                            className={INPUT_CLASSNAME}
                          />
                        </Field>

                        <Field label="Descricao">
                          <textarea
                            value={item.description}
                            onChange={(event) =>
                              handleUpdateItemField(item.id, "description", event.target.value)
                            }
                            rows={4}
                            className={TEXTAREA_CLASSNAME}
                          />
                        </Field>

                        <Field label="Imagem">
                          <input
                            type="url"
                            value={item.imageUrl}
                            onChange={(event) =>
                              handleUpdateItemField(item.id, "imageUrl", event.target.value)
                            }
                            className={INPUT_CLASSNAME}
                            placeholder="https://..."
                          />
                        </Field>

                        <Field label="Link" required>
                          <input
                            type="url"
                            value={item.affiliateUrl}
                            onChange={(event) =>
                              handleUpdateItemField(item.id, "affiliateUrl", event.target.value)
                            }
                            className={INPUT_CLASSNAME}
                          />
                        </Field>
                      </div>
                    ) : null}

                    <FeedbackBox feedback={item.feedback} />

                    <div className="grid gap-2 sm:grid-cols-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleToggleEditing(item.id)}
                        className="h-12 w-full"
                      >
                        <PencilLine className="h-4 w-4" />
                        {item.isEditing ? "Fechar" : "Editar"}
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleDeleteItem(item.id)}
                        className="h-12 w-full border-destructive/20 text-destructive hover:border-destructive/40 hover:bg-destructive/5"
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>

                      <Button
                        type="button"
                        onClick={() => handlePublishItem(item.id)}
                        disabled={item.isPublishing}
                        className="h-12 w-full"
                      >
                        {item.isPublishing ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Publicando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Publicar
                          </>
                        )}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">Item {item.itemId}</p>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}