import { FilmsFilterType, FilmsFilterToServer } from "@/components/routes/Films/components/FilmsFilter/types";
import _ from 'lodash'

export const sliderAdapter = (val: number[]) => {
  if(!val.length) {
    return null
  }
  if (val[1] && (val[0] !== val[1])) {
    return `${val[0]}-${val[1]}`
  } else {
    return `${val[0]}`
  }
}


export class FilmsAdapter {
  public static filmsFilterToServer(limit: number, page: number, filter: FilmsFilterType): URLSearchParams {
    const params = new URLSearchParams()

    params.append('limit', limit.toString())
    params.append('page', page.toString())
    const filterToServer =  {
      year: filter.year ? filter.year.toString() : null,
      ageRating: sliderAdapter(filter.ageRating),
      'countries.name': (filter.countries 
        && filter.countries.length) ? filter.countries : null
    } as FilmsFilterToServer

    for(const key of _.without(Object.keys(filterToServer), 'countries.name')) {
      if(filterToServer[key]) {
        params.append(key, filterToServer[key])
      } 
    }
    if(filterToServer["countries.name"]) {
      for(const country of filterToServer["countries.name"]) {
        params.append('countries.name', country)
      }
    }
    console.log(params.toString())
    return params
  }

  public static filterFromQuery(params: URLSearchParams): FilmsFilterType {
    const resFilter: Partial<FilmsFilterType> = {}
    const queryFilter = Object.fromEntries(params.entries()) as any
    
    resFilter.countries = params.getAll('countries.name')
    resFilter.ageRating = queryFilter.ageRating?.split('-').map((d: string) => Number(d)) ?? [0, 18]
    resFilter.year = queryFilter.year ? Number(queryFilter.year) : null
    return resFilter as FilmsFilterType
  }
}
