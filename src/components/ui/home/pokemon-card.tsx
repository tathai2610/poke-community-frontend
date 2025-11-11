"use client"

import Image from "next/image"
import type { FC } from "react"
import type { Pokemon } from "@/types/pokemon"
import TypePill from "@/components/ui/type-pill"

type Props = {
  pokemon: Pokemon
}

const PokemonCard: FC<Props> = ({ pokemon }) => {
  return (
    <div className="rounded-xl border p-8 bg-white shadow-sm flex flex-col items-center text-center h-96">
      <div className="w-48 h-48 mb-4 relative">
        {pokemon.image ? (
          <Image src={pokemon.image} alt={pokemon.name} fill className="object-contain rounded-md" />
        ) : (
          <div className="w-48 h-48 bg-gray-100 rounded-md" />
        )}
      </div>

      <h3 className="text-2xl font-semibold text-slate-950">{pokemon.name}</h3>
      {pokemon.number && <p className="text-slate-950 mt-2">{pokemon.number}</p>}

      <div className="flex gap-3 mt-6">
        {pokemon.types &&
          pokemon.types.map((t) => (
            <TypePill key={t.id} name={t.name ?? t.id} color={t.color} />
          ))}
      </div>
    </div>
  )
}

export default PokemonCard
