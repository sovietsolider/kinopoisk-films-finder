export interface SeasonType {
  episodes: {
    duration: number
    description: string
    name: string
    number: number
  }
  duration: number
  id: string
  name: string
  number: number
  poster: {url: string, previewUrl: string}
}