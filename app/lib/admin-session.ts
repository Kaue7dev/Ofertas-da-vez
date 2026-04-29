import { createHash, timingSafeEqual } from "node:crypto"

import "server-only"

import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE_NAME = "admin_session"

function getConfiguredPassword() {
  return process.env.ADMIN_ACCESS_PASSWORD?.trim() || ""
}

function buildSessionValue(password: string) {
  return createHash("sha256")
    .update(`ofertas-da-vez-admin:${password}`)
    .digest("hex")
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function isAdminPasswordConfigured() {
  return getConfiguredPassword().length > 0
}

export function isValidAdminPassword(password: string) {
  const configuredPassword = getConfiguredPassword()

  if (!configuredPassword) {
    return false
  }

  return safeEqual(password.trim(), configuredPassword)
}

export function getAdminSessionValue() {
  const configuredPassword = getConfiguredPassword()

  if (!configuredPassword) {
    return ""
  }

  return buildSessionValue(configuredPassword)
}

export async function hasAdminSession() {
  const expectedSessionValue = getAdminSessionValue()

  if (!expectedSessionValue) {
    return false
  }

  const cookieStore = await cookies()
  const currentSessionValue = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value

  if (!currentSessionValue) {
    return false
  }

  return safeEqual(currentSessionValue, expectedSessionValue)
}