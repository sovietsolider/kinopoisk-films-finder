export interface FilmsFilterType {
  [k: string]: any,
  year: number | null,
  ageRating: number[] | null,
  countries: string[] | null
}

export interface FilmsFilterToServer {
  [k: string]: any
  year: string | null
  ageRating: string | null
  'countries.name': string[] | null
}