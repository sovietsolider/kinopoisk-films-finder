import { FilmsFilterType } from "@/components/routes/Films/components/FilmsFilter/types";
import { http } from "./httpAxios";
import _ from 'lodash'
import { FilmsAdapter } from "@/adapters/films";

export default class FilmsAPI {
  public static async getFilms(limit: number, page: number, filter: Partial<FilmsFilterType>) {
    // console.log(filter)
    // let filmsByNameIds: number[] = []
    // if (filter.name) {
    //   const filmsByNameParams = new URLSearchParams()
    //   filmsByNameParams.append('limit', limit.toString())
    //   filmsByNameParams.append('page', page.toString())
    //   filmsByNameParams.append('query', filter.name)
    //   filmsByNameIds = (await http.get('/v1.4/movie/search', { params: filmsByNameParams }))
    //     .data.docs.map((d:any) => d.id)
    // }
    const resParams = new URLSearchParams()
    // filmsByNameIds.forEach((id) => {
    //   resParams.append('id', id.toString())
    // })

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
}