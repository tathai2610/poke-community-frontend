"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { fetchPokemonById } from "@/lib/api/pokemons"
import TypePill from "@/components/ui/type-pill"
import StatsChart from "@/components/ui/pokedex/stats-chart"

export default function PokemonDetailPageClient() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attrs, setAttrs] = useState<any>(null)
  const [included, setIncluded] = useState<any[]>([])
  const [relationships, setRelationships] = useState<any>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)

      const segments = (pathname || "").split("/").filter(Boolean)
      const name = segments[segments.length - 1]
      if (!name) {
        setError("No pokemon specified in path")
        setLoading(false)
        return
      }

      try {
        let json = null
        try {
          json = await fetchPokemonById(name)
        } catch (e) {
          // try numeric id
          json = await fetchPokemonById(Number(name).toString())
        }

  if (!mounted) return
  const data = json?.data
  setAttrs(data?.attributes || {})
  setRelationships(data?.relationships || {})
  setIncluded(json?.included || [])
      } catch (e: any) {
        if (!mounted) return
        setError(e?.message || String(e))
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [pathname])

  const types: { id: string; name: string; color?: string }[] = []
  // types may live on attributes (attrs.types) or on the parent data.relationships.types.data
  const dataTypes = (attrs?.types || relationships?.types?.data || [])
  ;(dataTypes || []).forEach((t: any) => {
    if (t && t.id) {
      const inc = (included || []).find((i: any) => String(i.id) === String(t.id))
      if (inc?.attributes) types.push({ id: String(inc.id), name: inc.attributes.name, color: inc.attributes.color })
      else if (t.name) types.push({ id: String(t.id), name: t.name })
      else types.push({ id: String(t.id), name: String(t.id) })
    }
  })

  const image = attrs?.large_img ?? attrs?.small_img ?? attrs?.image
  const nationalId = attrs?.national_id
  const number = nationalId ? `#${String(nationalId).padStart(4, "0")}` : undefined
  // normalize stat names: API may return them under attributes directly or inside attributes.stats
  const getStat = (keys: string[]) => {
    for (const k of keys) {
      const v1 = attrs?.stats?.[k]
      if (v1 !== undefined) return Number(v1) || 0
      const v2 = attrs?.[k]
      if (v2 !== undefined) return Number(v2) || 0
    }
    return 0
  }

  const stats = {
    hp: getStat(["hp"]),
    attack: getStat(["attack", "atk"]),
    defense: getStat(["defense"]),
    sp_atk: getStat(["sp_atk", "spAtk", "spatk"]),
    sp_def: getStat(["sp_def", "spDef", "spdef"]),
    speed: getStat(["speed", "spd"]),
  }

  console.log(stats);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl border p-8 bg-white shadow-sm animate-pulse h-96" />
          </div>
          <aside className="lg:col-span-1">
            <div className="rounded-xl border p-6 bg-white shadow-sm animate-pulse h-48" />
          </aside>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-3">
            <Link href="/pokedex" className="block text-sm text-red-600">
              ← Back to Pokédex
            </Link>
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-xl border p-8 bg-white shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-64 h-64 relative mb-6">
                  {image ? (
                    <Image src={image} alt={attrs?.name || "pokemon"} fill sizes="256px" className="object-contain" />
                  ) : (
                    <div className="w-64 h-64 bg-gray-100" />
                  )}
                </div>

                <h2 className="text-4xl font-extrabold text-slate-950">{attrs?.name}</h2>
                {number && <p className="text-slate-600 mt-2">{number}</p>}

                <div className="mt-8 w-full text-center">
                  <div className="flex items-center justify-center gap-3">
                    {types.map((t) => (
                      <TypePill key={t.id} name={t.name} color={t.color} />
                    ))}
                  </div>
                </div>

                <div className="mt-8 w-full">
                  <button className="w-full bg-red-600 text-white rounded-md py-3 font-semibold">+ Add to Team</button>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <StatsChart stats={stats} />
          </aside>
        </main>
      </div>
    </div>
  )
}
