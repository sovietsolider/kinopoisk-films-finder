export interface FilmType {
  id: number
  isSeries: boolean
  poster: {
    url: string
    previewUrl: string
  },
  name: string
  year: number
  ageRating: number
  description: string
  rating: {
    await: number | null
    filmCritics: number | null
    imdb: number | null
    kp: number | null
    russianFilmCritics: number | null
  }
  persons: {name: string, photo: string}[]
}