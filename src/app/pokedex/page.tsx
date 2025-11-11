"use client"

import { useEffect, useMemo, useState } from "react"
import type { Pokemon, TypeInfo } from "@/types/pokemon"
import PokemonCard from "@/components/ui/home/pokemon-card"
import Search from "@/components/ui/pokedex/search"
import Filters from "@/components/ui/pokedex/filters"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <main>
        <h1 className="text-5xl font-extrabold mb-8 text-slate-950">Pokédex</h1>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Search value={query} onChange={setQuery} />
          <Filters value={selectedType} onChange={setSelectedType} types={types} />
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
    </div>
  )
}
