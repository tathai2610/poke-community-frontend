"use client"

import Link from "next/link"
import Navbar from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import FeaturedPokemons from "@/components/ui/home/featured-pokemons"

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-blue-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to PokéCommunity</h1>
          <p className="text-xl text-gray-600 mb-8">
            Explore Pokémon, build teams, and connect with trainers worldwide
          </p>
          <Link href="/pokedex">
            <Button size="lg">
              Explore Pokédex
            </Button>
          </Link>
        </div>

        {/* Featured Pokemon */}
        <FeaturedPokemons />
      </div>
    </div>
  )
}
