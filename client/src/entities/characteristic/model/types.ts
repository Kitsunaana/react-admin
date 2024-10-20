export type CharacteristicsResponse = Array<{ id: number, caption: string }>
export type UnitsResponse = Array<{ id: number, caption: string | null }>

export type Action = "none" | "add" | "replace"
