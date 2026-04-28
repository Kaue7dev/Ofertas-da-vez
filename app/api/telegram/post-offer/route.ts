import { NextResponse } from "next/server"

type PostOfferPayload = {
  title: string
  description?: string
  price: string
  oldPrice?: string
  imageUrl?: string
  affiliateUrl: string
}

const TELEGRAM_MESSAGE_LIMIT = 4096
const TELEGRAM_CAPTION_LIMIT = 1024

export const runtime = "nodejs"

function logTelegramDebug(
  method: "sendMessage" | "sendPhoto",
  status: number,
  body: unknown,
) {
  if (process.env.NODE_ENV === "production") {
    return
  }

  console.error(
    `[telegram/${method}] ${JSON.stringify({ status, body })}`,
  )
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function buildTelegramMessage(payload: PostOfferPayload, maxLength: number) {
  const truncateEscapedText = (value: string, limit: number) => {
    if (value.length <= limit) {
      return value
    }

    if (limit <= 1) {
      return "…"
    }

    const targetLength = limit - 1
    let result = ""
    let index = 0

    while (index < value.length && result.length < targetLength) {
      if (value[index] === "&") {
        const entityEnd = value.indexOf(";", index)

        if (entityEnd !== -1) {
          const entity = value.slice(index, entityEnd + 1)

          if (result.length + entity.length > targetLength) {
            break
          }

          result += entity
          index = entityEnd + 1
          continue
        }
      }

      result += value[index]
      index += 1
    }

    return `${result.trimEnd()}…`
  }

  const composeMessage = (parts: {
    title: string
    price: string
    oldPrice?: string
    description?: string
    affiliateUrl: string
  }) => {
    const oldPriceBlock = parts.oldPrice
      ? `\nDe: <s>${parts.oldPrice}</s>`
      : ""
    const descriptionBlock = parts.description
      ? `\n\n${parts.description}`
      : ""

    return `🔥 <b>${parts.title}</b>\n\n💰 Por: <b>${parts.price}</b>${oldPriceBlock}${descriptionBlock}\n\n👉 Comprar agora:\n${parts.affiliateUrl}`
  }

  let parts = {
    title: escapeHtml(payload.title),
    price: escapeHtml(payload.price),
    oldPrice: payload.oldPrice ? escapeHtml(payload.oldPrice) : undefined,
    description: payload.description ? escapeHtml(payload.description) : undefined,
    affiliateUrl: escapeHtml(payload.affiliateUrl),
  }

  let message = composeMessage(parts)

  if (message.length <= maxLength) {
    return message
  }

  if (parts.description) {
    const messageWithoutDescription = composeMessage({
      ...parts,
      description: undefined,
    })

    if (messageWithoutDescription.length <= maxLength) {
      const availableDescriptionLength = maxLength - messageWithoutDescription.length

      parts = {
        ...parts,
        description:
          availableDescriptionLength > 0
            ? truncateEscapedText(parts.description, availableDescriptionLength)
            : undefined,
      }
      message = composeMessage(parts)
    } else {
      parts = {
        ...parts,
        description: undefined,
      }
      message = messageWithoutDescription
    }
  }

  if (message.length <= maxLength) {
    return message
  }

  if (parts.oldPrice) {
    parts = {
      ...parts,
      oldPrice: undefined,
    }
    message = composeMessage(parts)
  }

  if (message.length <= maxLength) {
    return message
  }

  const messageWithoutTitleContent = composeMessage({
    ...parts,
    title: "",
  })

  const availableTitleLength = Math.max(1, maxLength - messageWithoutTitleContent.length)

  parts = {
    ...parts,
    title: truncateEscapedText(parts.title, availableTitleLength),
  }
  message = composeMessage(parts)

  if (message.length <= maxLength) {
    return message
  }

  const messageWithoutPriceContent = composeMessage({
    ...parts,
    price: "",
  })

  const availablePriceLength = Math.max(1, maxLength - messageWithoutPriceContent.length)

  parts = {
    ...parts,
    price: truncateEscapedText(parts.price, availablePriceLength),
  }
  message = composeMessage(parts)

  if (message.length <= maxLength) {
    return message
  }

  const messageWithoutUrlContent = composeMessage({
    ...parts,
    affiliateUrl: "",
  })

  const availableUrlLength = Math.max(1, maxLength - messageWithoutUrlContent.length)

  parts = {
    ...parts,
    affiliateUrl: truncateEscapedText(parts.affiliateUrl, availableUrlLength),
  }

  return composeMessage(parts)
}

async function sendTelegramPhoto(
  botToken: string,
  chatId: string,
  imageUrl: string,
  caption: string,
) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      photo: imageUrl,
      caption,
      parse_mode: "HTML",
    }),
  })

  const data = await response.json().catch(() => null)

  logTelegramDebug("sendPhoto", response.status, data)

  return response.ok && data?.ok === true
}

async function sendTelegramMessage(
  botToken: string,
  chatId: string,
  text: string,
) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  })

  const data = await response.json().catch(() => null)

  logTelegramDebug("sendMessage", response.status, data)

  return response.ok && data?.ok === true
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function normalizeOptionalString(value: unknown) {
  if (value === undefined || value === null) {
    return undefined
  }

  if (typeof value !== "string") {
    return null
  }

  const trimmedValue = value.trim()

  return trimmedValue.length > 0 ? trimmedValue : undefined
}

function parsePayload(body: unknown): PostOfferPayload | null {
  if (!body || typeof body !== "object") {
    return null
  }

  const { title, description, price, oldPrice, imageUrl, affiliateUrl } = body as Record<string, unknown>

  if (
    typeof title !== "string" ||
    title.trim().length === 0 ||
    typeof price !== "string" ||
    price.trim().length === 0 ||
    typeof affiliateUrl !== "string" ||
    affiliateUrl.trim().length === 0
  ) {
    return null
  }

  const normalizedDescription = normalizeOptionalString(description)
  const normalizedOldPrice = normalizeOptionalString(oldPrice)
  const normalizedImageUrl = normalizeOptionalString(imageUrl)

  if (
    normalizedDescription === null ||
    normalizedOldPrice === null ||
    normalizedImageUrl === null
  ) {
    return null
  }

  const normalizedAffiliateUrl = affiliateUrl.trim()

  if (!isHttpUrl(normalizedAffiliateUrl)) {
    return null
  }

  if (normalizedImageUrl && !isHttpUrl(normalizedImageUrl)) {
    return null
  }

  return {
    title: title.trim(),
    description: normalizedDescription,
    price: price.trim(),
    oldPrice: normalizedOldPrice,
    imageUrl: normalizedImageUrl,
    affiliateUrl: normalizedAffiliateUrl,
  }
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram environment variables are not configured." },
      { status: 500 },
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    )
  }

  const payload = parsePayload(body)

  if (!payload) {
    return NextResponse.json(
      { error: "Invalid offer payload." },
      { status: 400 },
    )
  }

  const message = buildTelegramMessage(
    payload,
    payload.imageUrl ? TELEGRAM_CAPTION_LIMIT : TELEGRAM_MESSAGE_LIMIT,
  )

  try {
    const published = payload.imageUrl
      ? await sendTelegramPhoto(botToken, chatId, payload.imageUrl, message)
      : await sendTelegramMessage(botToken, chatId, message)

    if (!published) {
      return NextResponse.json(
        { error: "Failed to publish offer to Telegram." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: "Failed to publish offer to Telegram." },
      { status: 502 },
    )
  }
}