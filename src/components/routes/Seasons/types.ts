export interface EpisodeType {
  duration: number
  description: string
  name: string
  number: number
  still: {
    previewUrl: string
    url: string
  }
}
export interface SeasonType {
  episodes: EpisodeType[]
  duration: number
  id: string
  name: string
  number: number
  poster: { url: string, previewUrl: string }
}