export interface FilmsFilter {
  year: string[],
  ageRating: string[],
  countries: {
    name: string[]
  }
}