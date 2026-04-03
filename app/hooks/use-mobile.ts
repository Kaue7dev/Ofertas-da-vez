"use client"

import { useSyncExternalStore } from "react"

const MOBILE_BREAKPOINT = 768
const mobileMediaQuery = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribe(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(mobileMediaQuery)

  mediaQuery.addEventListener("change", onStoreChange)
  return () => mediaQuery.removeEventListener("change", onStoreChange)
}

function getSnapshot() {
  return typeof window !== "undefined"
    ? window.matchMedia(mobileMediaQuery).matches
    : false
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
