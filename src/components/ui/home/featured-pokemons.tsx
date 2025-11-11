"use client"

import { useEffect, useState } from "react"
import type { Pokemon } from "@/types/pokemon"
import PokemonCard from "@/components/ui/home/pokemon-card"
import { fetchFeaturedPokemons } from "@/lib/api/pokemons"

export default function FeaturedPokemons() {
	const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true

		async function load() {
				try {
					const mapped = await fetchFeaturedPokemons()
					if (!mounted) return
					setPokemons(mapped)
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

	return (
		<section className="py-8">
			<h2 className="text-4xl font-extrabold mb-8 text-slate-950">Featured Pokémon</h2>

			{loading ? (
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="rounded-xl border p-8 bg-white shadow-sm animate-pulse h-96"
						/>
					))}
				</div>
			) : error ? (
				<div className="text-red-600">Error loading featured pokémon: {error}</div>
			) : !pokemons || pokemons.length === 0 ? (
				<div className="text-slate-950">No featured pokémon found.</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{pokemons.map((p) => (
						<PokemonCard key={p.id} pokemon={p} />
					))}
				</div>
			)}
		</section>
	)
}
