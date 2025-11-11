"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  const links = [
    { name: "Pokédex", href: "/pokedex" },
    { name: "Teams", href: "/teams" },
  ]

  return (
    <nav className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-red-600">PokéCommunity</div>
        </Link>

        <div className="flex gap-2 items-center">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant={isActive(link.href) ? "primary" : "secondary"}>
                {link.name}
              </Button>
            </Link>
          ))}
          {/* <Link href="/pokedex">
            <Button variant={isActive("/pokedex") ? "default" : "ghost"}>Pokédex</Button>
          </Link>

          <Link href="/my-teams">
            <Button variant={isActive("/my-teams") ? "default" : "ghost"}>My Teams</Button>
          </Link> */}
        </div>
      </div>
    </nav>
  )
}
