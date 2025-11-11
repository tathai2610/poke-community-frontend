"use client"

import type { FC } from "react"
import { getContrastTextColor } from "@/lib/color"

type Props = {
  name: string
  color?: string
}

const TypePill: FC<Props> = ({ name, color }) => {
  const colorRaw = color ? String(color) : undefined
  const normalized = colorRaw && !colorRaw.startsWith("#") ? `#${colorRaw}` : colorRaw
  const textColor = normalized ? getContrastTextColor(normalized) : undefined

  return (
    <span
      className={`inline-flex items-center justify-center px-1 min-w-16 h-8 rounded-sm text-sm font-semibold ${
        !normalized ? "bg-gray-200 text-slate-950" : ""
      }`}
      style={normalized ? { backgroundColor: normalized, color: textColor } : undefined}
      title={name}
    >
      {name}
    </span>
  )
}

export default TypePill
