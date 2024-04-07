export interface CountryServer {
  name: string,
  slug: string
}

export interface SelectOption {
  value: string,
  label: string
}

export type FilmImagesTypes = 'backdrops' | 'cover' 
| 'frame' | 'promo' 
| 'screenshot' | 'shooting' 
| 'still' | 'wallpaper'