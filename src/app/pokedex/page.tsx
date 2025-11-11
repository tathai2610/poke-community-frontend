"use client"

import { useEffect, useMemo, useState } from "react"
import type { Pokemon, TypeInfo } from "@/types/pokemon"
import PokemonCard from "@/components/ui/home/pokemon-card"
import { fetchPokemons } from "@/lib/api/pokemons"

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const data = await fetchPokemons()
        if (!mounted) return
        setPokemons(data)
      } catch (e) {
        if (!mounted) return
        setError((e as Error).message)
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const types = useMemo(() => {
    const typesMap: Record<string, TypeInfo> = {}
    ;((pokemons ?? []) as Pokemon[]).forEach((p) => {
      ;((p.types ?? []) as TypeInfo[]).forEach((t) => {
        if (!typesMap[t.id]) typesMap[t.id] = t
      })
    })
    return Object.values(typesMap)
  }, [pokemons])

  const filtered = useMemo(() => {
    if (!pokemons) return []
    return pokemons.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(query.trim().toLowerCase())
      const matchesType =
        selectedType === "all" || (p.types || []).some((t) => t.id === selectedType || t.name === selectedType)
      return matchesName && matchesType
    })
  }, [pokemons, query, selectedType])

  return (
    <main className="p-8">
      <h1 className="text-5xl font-extrabold mb-8 text-slate-950">Pokédex</h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm text-slate-700 mb-2">Search</label>
          <input
            className="w-full rounded-md border px-4 py-3 bg-white"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-700 mb-2">Type</label>
          <select
            className="w-full rounded-md border px-4 py-3 bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section>
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl border p-8 bg-white shadow-sm animate-pulse h-96" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600">Error loading pokémon: {error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-slate-950">No pokémon match your filters.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
