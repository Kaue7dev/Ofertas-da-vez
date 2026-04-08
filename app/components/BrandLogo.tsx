import Image from "next/image"

import { cn } from "@/lib/utils"

type BrandLogoProps = {
  className?: string
  alt?: string
  priority?: boolean
  sizes?: string
}

export default function BrandLogo({
  className,
  alt = "OFF-ertas da Vez",
  priority = false,
  sizes = "148px",
}: BrandLogoProps) {
  return (
    <Image
      src="/brand/offertas-da-vez-logo.svg"
      alt={alt}
      width={820}
      height={300}
      priority={priority}
      sizes={sizes}
      className={cn("h-auto w-[112px] sm:w-[148px]", className)}
    />
  )
}