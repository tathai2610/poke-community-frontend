import apiUrl from "@/lib/api"
import type { Pokemon, TypeInfo } from "@/types/pokemon"

type RawResponse = {
  data?: any[]
  included?: any[]
}

export async function fetchFeaturedPokemons(): Promise<Pokemon[]> {
  const res = await fetch(apiUrl("/api/v1/pokemons/featured"))
  if (!res.ok) throw new Error(`Failed to fetch featured pokemons: ${res.status}`)
  const json: RawResponse = await res.json()

  const items = Array.isArray(json?.data) ? json.data : []
  const included = Array.isArray(json?.included) ? json.included : []
  const includedMap: Record<string, any> = {}
  included.forEach((inc: any) => {
    if (inc && inc.id) includedMap[String(inc.id)] = inc
  })

  const mapped: Pokemon[] = items.map((it: any) => {
    const typeEntries: TypeInfo[] = (it.relationships?.types?.data || []).map((t: any) => {
      const inc = includedMap[String(t.id)]
      if (inc && inc.attributes) {
        return {
          id: String(inc.id),
          name: inc.attributes.name,
          color: inc.attributes.color,
        }
      }
      return { id: String(t.id), name: String(t.id) }
    })

    return {
      id: Number(it.attributes?.national_id ?? it.id),
      name: it.attributes?.name ?? "",
      number: it.attributes?.national_id ? `#${String(it.attributes.national_id).padStart(4, "0")}` : undefined,
      image: it.attributes?.large_img ?? it.attributes?.small_img,
      types: typeEntries,
    }
  })

  return mapped
}

export default fetchFeaturedPokemons

export async function fetchPokemons(): Promise<Pokemon[]> {
  const res = await fetch(apiUrl("/api/v1/pokemons"))
  if (!res.ok) throw new Error(`Failed to fetch pokemons: ${res.status}`)
  const json: RawResponse = await res.json()

  const items = Array.isArray(json?.data) ? json.data : []
  const included = Array.isArray(json?.included) ? json.included : []
  const includedMap: Record<string, any> = {}
  included.forEach((inc: any) => {
    if (inc && inc.id) includedMap[String(inc.id)] = inc
  })

  const mapped: Pokemon[] = items.map((it: any) => {
    const typeEntries: TypeInfo[] = (it.relationships?.types?.data || []).map((t: any) => {
      const inc = includedMap[String(t.id)]
      if (inc && inc.attributes) {
        return {
          id: String(inc.id),
          name: inc.attributes.name,
          color: inc.attributes.color,
        }
      }
      return { id: String(t.id), name: String(t.id) }
    })

    return {
      id: Number(it.attributes?.national_id ?? it.id),
      name: it.attributes?.name ?? "",
      number: it.attributes?.national_id ? `#${String(it.attributes.national_id).padStart(4, "0")}` : undefined,
      image: it.attributes?.large_img ?? it.attributes?.small_img,
      types: typeEntries,
    }
  })

  return mapped
}
