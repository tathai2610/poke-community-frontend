export type TypeInfo = {
	id: string
	name: string
	color?: string
}

export type Pokemon = {
	id: number
	name: string
	number?: string
	image?: string
	types?: TypeInfo[]
}
