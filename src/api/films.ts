import { FilmsFilterType } from "@/components/routes/Films/components/FilmsFilter/types";
import { http } from "./httpAxios";
import _ from 'lodash'
import { FilmsAdapter } from "@/adapters/films";
import { FilmImagesTypes } from "@/types/dicts";
import { RandomFilmFilterType } from "@/components/routes/RandomFilm/RandomFilm";

export default class FilmsAPI {
  public static async getFilms(limit: number, page: number, filter: FilmsFilterType) {
    const resParams = FilmsAdapter.filmsFilterToServer(limit, page, filter)
    return http.get('/v1.4/movie', { params: resParams })
  }

  public static async getFilmsByName(name: string, limit: number, page: number) {
    return http.get(`/v1.4/movie/search?${ name.length > 0 ? `query=${encodeURIComponent(name)}&` : ''}limit=${limit}&page=${page}`)
  }

  public static async getFilmById(id: number) {
    return http.get(`/v1.4/movie/${id}`)
  }

  public static async getFilmImages(id: number, 
    type: FilmImagesTypes,
    limit: number,
    page: number,
  ) {
    return http.get(`/v1.4/image?page=${page}&limit=${limit}&movieId=${id}&type=${type}`)
  }
  
  public static async getFilmSeasons(id: number, limit: number, page: number) {
    return http.get(`/v1.4/season?limit=${limit}&page=${page}&movieId=${id}&sortField=number&sortType=1`)
  }

  public static async getFilmReviews(id: number, limit: number, page: number) {
    return http.get(`/v1.4/review?limit=${limit}&page=${page}&movieId=${id}`)
  }

  public static async getFilmsSeasonsNames(id: number, limit: number, page: number) {
    return http.get(`/v1.4/season?limit=${limit}&page=${page}&movieId=${id}&sortField=number&sortType=1&selectFields=name&selectFields=number`)
  } 

  public static async getRandomFilm(filter: RandomFilmFilterType) {
    const params = FilmsAdapter.randomFilmFilterToServer(filter)
    return http.get('/v1.4/movie/random', { params })

  }
}