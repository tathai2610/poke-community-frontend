"use client"

import type { FC } from "react"
import type { TypeInfo } from "@/types/pokemon"

type Props = {
  value: string
  onChange: (v: string) => void
  types: TypeInfo[]
  label?: string
}

const Filters: FC<Props> = ({ value, onChange, types, label = "Type" }) => {
  return (
    <div>
      <label className="block text-sm text-slate-700 mb-2">{label}</label>
      <select
        className="w-full rounded-md border px-4 py-3 bg-white text-slate-950"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All Types</option>
        {types.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filters
