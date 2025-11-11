"use client"

import type { FC } from "react"

type StatsShape = {
  hp: number
  attack: number
  defense: number
  sp_atk: number
  sp_def: number
  speed: number
}

type Props = {
  stats: StatsShape
  className?: string
}

const StatsChart: FC<Props> = ({ stats, className }) => {
  const rows: [string, number][] = [
    ["HP", stats.hp],
    ["Attack", stats.attack],
    ["Defense", stats.defense],
    ["Sp. Atk", stats.sp_atk],
    ["Sp. Def", stats.sp_def],
    ["Speed", stats.speed],
  ]

  return (
    <div className={className}>
      <div className="rounded-xl border p-6 bg-white shadow-sm">
        <h3 className="text-2xl font-bold text-slate-950 mb-6">Base Stats</h3>
        <div className="space-y-4">
          {rows.map(([label, value]) => {
            const val = Number(value) || 0
            const pct = Math.min(100, Math.round((val / 180) * 100))
            return (
              <div key={label}>
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-slate-700">{label}</div>
                  <div className="text-sm font-medium text-slate-700">{val}</div>
                </div>
                <div className="w-full rounded-full bg-gray-200 h-3 overflow-hidden">
                  <div className="h-3 bg-red-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StatsChart
