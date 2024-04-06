export interface FilmsFilter {
  [k: string]: any,
  name: string | null,
  year: string | null,
  ageRating: string | null,
  countries: {
    name: string[]
  } | null
}

export interface FilmsFilterToServer {
  [k: string]: any
  year: string | null
  ageRating: string | null
  'countries.name': string[] | null
}