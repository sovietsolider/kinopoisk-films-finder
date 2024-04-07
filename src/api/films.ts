import { FilmsFilterType } from "@/components/routes/Films/components/FilmsFilter/types";
import { http } from "./httpAxios";
import _ from 'lodash'
import { FilmsAdapter } from "@/adapters/films";

export default class FilmsAPI {
  public static async getFilms(limit: number, page: number, filter: Partial<FilmsFilterType>) {
    const resParams = new URLSearchParams()
    resParams.append('limit', limit.toString())
    resParams.append('page', page.toString())
    const filterToServer = FilmsAdapter.filmsFilterToServer(filter)
    for(const key of Object.keys(filterToServer)) {
      if(filterToServer[key]) {
        resParams.append(key, filterToServer[key])
      } 
    }
    if(filterToServer["countries.name"]) {
      for(const country of filterToServer["countries.name"]) {
        resParams.append('countries.name', country)
      }
    }
    console.log('params', resParams)
    return http.get('/v1.4/movie', { params: resParams })
  }

  public static async getFilmsByName(name: string, limit: number, page: number) {
    return http.get(`/v1.4/movie/search?query=${name}&limit=${limit}&page=${page}`)
  }

  public static async getFilmById(id: number) {
    return http.get(`/v1.4/movie/${id}`)
  }

  public static async getFilmImages(id: number, 
    type: 'backdrops' | 'cover' 
    | 'frame' | 'promo' 
    | 'screenshot' | 'shooting' 
    | 'still' | 'wallpaper',
    limit: number,
    page: number,
  ) {
    return http.get(`/v1.4/image?limit=${limit}&page=${page}&type=${type}&movieId=${id}`)
  }
}