import { NextResponse } from "next/server"

type EnrichRequestItem = {
  itemId: string
  productLink?: string
  offerLink?: string
}

type ParsedEnrichRequestItem = {
  itemId: string
  productLink?: string
  offerLink?: string
}

type EnrichResponseItem = {
  itemId: string
  imageUrl?: string
  title?: string
  description?: string
}

type FetchHtmlResult = {
  status?: number
  finalUrl?: string
  contentType?: string
  html?: string
}

type HtmlDiagnostics = {
  contains: {
    ogImage: boolean
    twitterImage: boolean
    imageUrl: boolean
    image: boolean
    product: boolean
  }
  snippet: string
}

type EnrichAttemptResult = {
  source: "productLink" | "offerLink"
  requestedUrl: string
  fetch: FetchHtmlResult
  extracted: Omit<EnrichResponseItem, "itemId">
}

type RoutePayloadParseResult =
  | {
      ok: true
      items: ParsedEnrichRequestItem[]
    }
  | {
      ok: false
      status: number
      error: string
    }

const MAX_ITEMS_PER_REQUEST = 30
const FETCH_TIMEOUT_MS = 8000
const FETCH_CONCURRENCY = 4

export const runtime = "nodejs"

function logShopeeEnrichDebug(message: string, details: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") {
    return
  }

  console.error(`[shopee/enrich] ${JSON.stringify({ message, ...details })}`)
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#47;/gi, "/")
  }

function normalizeScrapedString(value: string) {
  return decodeHtmlEntities(value)
    .replace(/\\u002F/gi, "/")
    .replace(/\\u0026/gi, "&")
    .replace(/\\\//g, "/")
    .trim()
}

function buildHtmlDiagnostics(html: string): HtmlDiagnostics {
  const loweredHtml = html.toLowerCase()

  return {
    contains: {
      ogImage: loweredHtml.includes("og:image") || loweredHtml.includes("og:image:secure_url"),
      twitterImage: loweredHtml.includes("twitter:image"),
      imageUrl: loweredHtml.includes("imageurl"),
      image: loweredHtml.includes('"image"') || loweredHtml.includes("images"),
      product: loweredHtml.includes("product"),
    },
    snippet: html.slice(0, 1000),
  }
}

function isAllowedShopeeUrl(value: string) {
  try {
    const url = new URL(value)
    const hostname = url.hostname.toLowerCase()

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false
    }

    return (
      hostname === "shopee.com.br" ||
      hostname.endsWith(".shopee.com.br") ||
      hostname === "shopee.com" ||
      hostname.endsWith(".shopee.com") ||
      hostname === "shope.ee" ||
      hostname.endsWith(".shope.ee")
    )
  } catch {
    return false
  }
}

function normalizeAbsoluteHttpUrl(value: string | undefined, baseUrl: string) {
  if (!value) {
    return undefined
  }

  const normalizedValue = normalizeScrapedString(value)

  if (!normalizedValue) {
    return undefined
  }

  const candidateValue = normalizedValue.startsWith("//")
    ? `https:${normalizedValue}`
    : normalizedValue

  try {
    const url = new URL(candidateValue, baseUrl)

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return undefined
    }

    return url.toString()
  } catch {
    return undefined
  }
}

function parseAttributesFromTag(tag: string) {
  const attributes = new Map<string, string>()
  const attributePattern = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g
  let match: RegExpExecArray | null = null

  while ((match = attributePattern.exec(tag)) !== null) {
    const attributeName = match[1].toLowerCase()
    const attributeValue = match[2] ?? match[3] ?? match[4] ?? ""

    attributes.set(attributeName, attributeValue)
  }

  return attributes
}

function extractMetaContent(html: string, targets: string[]) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || []
  const normalizedTargets = targets.map((target) => target.toLowerCase())

  for (const tag of metaTags) {
    const attributes = parseAttributesFromTag(tag)
    const property = attributes.get("property")?.toLowerCase()
    const name = attributes.get("name")?.toLowerCase()
    const content = attributes.get("content")

    if (
      content &&
      ((property && normalizedTargets.includes(property)) ||
        (name && normalizedTargets.includes(name)))
    ) {
      return normalizeScrapedString(content)
    }
  }

  return undefined
}

function extractImageFromJson(html: string, baseUrl: string) {
  const patterns = [
    /"image"\s*:\s*"([^"]+)"/i,
    /"image"\s*:\s*\[\s*"([^"]+)"/i,
    /"imageUrl"\s*:\s*"([^"]+)"/i,
    /"thumbnailUrl"\s*:\s*"([^"]+)"/i,
    /"images"\s*:\s*\[\s*"([^"]+)"/i,
  ]

  for (const pattern of patterns) {
    const match = html.match(pattern)

    if (match?.[1]) {
      const normalizedUrl = normalizeAbsoluteHttpUrl(match[1], baseUrl)

      if (normalizedUrl) {
        return normalizedUrl
      }
    }
  }

  return undefined
}

function extractShopeeMetadata(html: string, productLink: string): Omit<EnrichResponseItem, "itemId"> {
  const imageUrl =
    normalizeAbsoluteHttpUrl(
      extractMetaContent(html, ["og:image", "og:image:secure_url", "twitter:image"]),
      productLink,
    ) ||
    extractImageFromJson(html, productLink)

  const title = extractMetaContent(html, ["og:title"])
  const description = extractMetaContent(html, ["og:description"])

  return {
    ...(imageUrl ? { imageUrl } : {}),
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  }
}

function parsePayload(body: unknown): RoutePayloadParseResult {
  if (!body || typeof body !== "object") {
    return {
      ok: false,
      status: 400,
      error: "Payload invalido.",
    }
  }

  const { items } = body as { items?: unknown }

  if (!Array.isArray(items)) {
    return {
      ok: false,
      status: 400,
      error: "Lista de itens invalida.",
    }
  }

  if (items.length > MAX_ITEMS_PER_REQUEST) {
    return {
      ok: false,
      status: 400,
      error: `Limite maximo de ${MAX_ITEMS_PER_REQUEST} itens por requisicao.`,
    }
  }

  const parsedItems = items.reduce<ParsedEnrichRequestItem[]>((result, item) => {
    if (!item || typeof item !== "object") {
      return result
    }

    const record = item as Partial<EnrichRequestItem>
    const itemId = typeof record.itemId === "string" ? record.itemId.trim() : ""

    if (!itemId) {
      return result
    }

    const productLink =
      typeof record.productLink === "string" ? record.productLink.trim() : ""
    const offerLink =
      typeof record.offerLink === "string" ? record.offerLink.trim() : ""

    result.push({
      itemId,
      ...(isAllowedShopeeUrl(productLink) ? { productLink } : {}),
      ...(isAllowedShopeeUrl(offerLink) ? { offerLink } : {}),
    })

    return result
  }, [])

  return {
    ok: true,
    items: parsedItems,
  }
}

async function fetchProductHtml(url: string): Promise<FetchHtmlResult> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    })

    const contentType = response.headers.get("content-type") || ""
    const baseResult: FetchHtmlResult = {
      status: response.status,
      finalUrl: response.url,
      contentType,
    }

    if (!response.ok) {
      logShopeeEnrichDebug("fetch-non-ok", {
        url,
        status: response.status,
      })

      return baseResult
    }

    if (!contentType.includes("text/html")) {
      logShopeeEnrichDebug("fetch-non-html", {
        url,
        contentType,
      })

      return baseResult
    }

    return {
      ...baseResult,
      html: await response.text(),
    }
  } catch (error) {
    logShopeeEnrichDebug("fetch-error", {
      url,
      error: error instanceof Error ? error.name : "unknown",
    })

    return {}
  } finally {
    clearTimeout(timeoutId)
  }
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
) {
  const results = new Array<R>(items.length)
  let nextIndex = 0

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex
      nextIndex += 1
      results[currentIndex] = await mapper(items[currentIndex], currentIndex)
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  )

  return results
}

function buildCandidateUrls(item: ParsedEnrichRequestItem) {
  const candidates: Array<{
    source: "productLink" | "offerLink"
    url: string
  }> = []

  if (item.productLink) {
    candidates.push({
      source: "productLink",
      url: item.productLink,
    })
  }

  if (item.offerLink && item.offerLink !== item.productLink) {
    candidates.push({
      source: "offerLink",
      url: item.offerLink,
    })
  }

  return candidates
}

async function enrichItem(
  item: ParsedEnrichRequestItem,
  itemIndex: number,
): Promise<EnrichResponseItem> {
  const candidates = buildCandidateUrls(item)

  if (candidates.length === 0) {
    return {
      itemId: item.itemId,
    }
  }

  let mergedMetadata: Omit<EnrichResponseItem, "itemId"> = {}
  const attemptResults: EnrichAttemptResult[] = []

  for (const candidate of candidates) {
    const fetchResult = await fetchProductHtml(candidate.url)
    const extracted = fetchResult.html
      ? extractShopeeMetadata(fetchResult.html, fetchResult.finalUrl || candidate.url)
      : {}

    attemptResults.push({
      source: candidate.source,
      requestedUrl: candidate.url,
      fetch: fetchResult,
      extracted,
    })

    mergedMetadata = {
      ...mergedMetadata,
      ...(mergedMetadata.imageUrl ? {} : extracted.imageUrl ? { imageUrl: extracted.imageUrl } : {}),
      ...(mergedMetadata.title ? {} : extracted.title ? { title: extracted.title } : {}),
      ...(mergedMetadata.description
        ? {}
        : extracted.description
          ? { description: extracted.description }
          : {}),
    }

    if (mergedMetadata.imageUrl) {
      break
    }
  }

  if (process.env.NODE_ENV !== "production" && itemIndex < 2) {
    logShopeeEnrichDebug("item-diagnostics", {
      itemIndex,
      itemId: item.itemId,
      productLink: item.productLink,
      offerLink: item.offerLink,
      attempts: attemptResults.map((attempt) => ({
        source: attempt.source,
        requestedUrl: attempt.requestedUrl,
        status: attempt.fetch.status,
        finalUrl: attempt.fetch.finalUrl,
        contentType: attempt.fetch.contentType,
        ...(attempt.fetch.html ? buildHtmlDiagnostics(attempt.fetch.html) : {}),
      })),
    })
  }

  return {
    itemId: item.itemId,
    ...mergedMetadata,
  }
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      {
        error: "Nao foi possivel ler o payload da requisicao.",
      },
      { status: 400 },
    )
  }

  const parsedPayload = parsePayload(body)

  if (!parsedPayload.ok) {
    return NextResponse.json(
      {
        error: parsedPayload.error,
      },
      { status: parsedPayload.status },
    )
  }

  try {
    const items = await mapWithConcurrency(
      parsedPayload.items,
      FETCH_CONCURRENCY,
      enrichItem,
    )

    return NextResponse.json({ items })
  } catch {
    return NextResponse.json(
      {
        error: "Nao foi possivel enriquecer os produtos da Shopee.",
      },
      { status: 500 },
    )
  }
}