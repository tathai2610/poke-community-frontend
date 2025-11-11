"use client"

import type { FC } from "react"

type Props = {
  value: string
  onChange: (v: string) => void
  label?: string
  placeholder?: string
}

const Search: FC<Props> = ({ value, onChange, label = "Search", placeholder = "Search by name..." }) => {
  return (
    <div>
      <label className="block text-sm text-slate-700 mb-2">{label}</label>
      <input
        className="w-full rounded-md border px-4 py-3 bg-white text-slate-950 placeholder-slate-950"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Search
