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

export const reviewTypes = {
  positive: 'Позитивный',
  negative: 'Негативный'
}

export const defaultResponsiveSliderOptions = {
  responsive: [
    {
      breakpoint: 867,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]
}