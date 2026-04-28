export type TelegramOfferPayload = {
  title: string
  description?: string
  price: string
  oldPrice?: string
  imageUrl?: string
  affiliateUrl: string
}

type TelegramOfferResponse = {
  ok?: boolean
  error?: string
}

function normalizeOptionalField(value?: string) {
  const normalizedValue = value?.trim()

  return normalizedValue ? normalizedValue : undefined
}

export async function publishTelegramOffer(payload: TelegramOfferPayload) {
  const requestBody: TelegramOfferPayload = {
    title: payload.title.trim(),
    price: payload.price.trim(),
    affiliateUrl: payload.affiliateUrl.trim(),
    ...(normalizeOptionalField(payload.description)
      ? { description: normalizeOptionalField(payload.description) }
      : {}),
    ...(normalizeOptionalField(payload.oldPrice)
      ? { oldPrice: normalizeOptionalField(payload.oldPrice) }
      : {}),
    ...(normalizeOptionalField(payload.imageUrl)
      ? { imageUrl: normalizeOptionalField(payload.imageUrl) }
      : {}),
  }

  const response = await fetch("/api/telegram/post-offer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  let responseBody: TelegramOfferResponse | null = null

  try {
    responseBody = (await response.json()) as TelegramOfferResponse
  } catch {
    responseBody = null
  }

  if (!response.ok || responseBody?.ok !== true) {
    throw new Error(
      responseBody?.error || "Nao foi possivel publicar a oferta no Telegram.",
    )
  }

  return responseBody
}