import { DictsAdapter } from "@/adapters/dicts";
import DictsAPI from "@/api/dicts";
import FilmsAPI from "@/api/films";
import { FilmsFilterType } from "@/components/routes/Films/components/FilmsFilter/types";
import { CountryServer } from "@/types/dicts";
import { atom, selector, SetterOrUpdater } from "recoil";

export const dictCountries = atom({
  key: 'dictCountries',
  default: []
})
export function setDictCountries(countries: never[], setCountries: SetterOrUpdater<never[]>) {
  if(!countries.length) {
    DictsAPI.getCountries().then((resp) => setCountries(DictsAdapter.countriesToClient(resp.data) as any))
  }
}

export const foundFilms = atom({
  key: 'foundFilms',
  default: []
})
export async function fetchFilms(
  state: never[], 
  setFilms: SetterOrUpdater<never[]>, 
  limit: number, page: number, 
  filterModel: FilmsFilterType
) {
  setFilms((await FilmsAPI.getFilms(limit, page, filterModel)).data.docs)
}



