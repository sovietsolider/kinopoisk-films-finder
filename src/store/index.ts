import { DictsAdapter } from "@/adapters/dicts";
import DictsAPI from "@/api/dicts";
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

