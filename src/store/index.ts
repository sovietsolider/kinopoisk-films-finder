import { DictsAdapter } from '@/adapters/dicts';
import DictsAPI from '@/api/dicts';
import { FilmsFilterType } from '@/components/routes/Films/components/FilmsFilter/types';
import { atom, SetterOrUpdater } from 'recoil';

export interface FilmsFromServer {
  docs: never[];
  pages: number;
}

export const dictCountries = atom({
  key: 'dictCountries',
  default: [],
});
export function setDictCountries(countries: never[], setCountries: SetterOrUpdater<never[]>) {
  if (!countries.length) {
    DictsAPI.getCountries().then((resp) =>
      setCountries(DictsAdapter.dictToClient(resp.data) as any)
    );
  }
}

export const storedDictGenres = atom({
  key: 'storedDictGenres',
  default: [],
});
export const storedDictTypes = atom({
  key: 'storedDictTypes',
  default: [],
});
export function setDictsForRandomFilm(
  genres: never[],
  types: never[],
  setGenres: SetterOrUpdater<never[]>,
  setTypes: SetterOrUpdater<never[]>
) {
  if (!genres.length) {
    DictsAPI.getGenres().then((resp) =>
      setGenres(
        DictsAdapter.dictToClient(resp.data).map((d) => ({
          value: d.value,
          label: d.label.charAt(0).toUpperCase() + d.label.slice(1),
        })) as any
      )
    );
  }
  if (!types.length) {
    DictsAPI.getTypes().then((resp) => setTypes(DictsAdapter.dictToClient(resp.data, true) as any));
  }
}

export const filmsFilter = atom<FilmsFilterType>({
  key: 'filmsFilter',
  default: {
    year: null,
    ageRating: [0, 18],
    countries: [],
  },
});

export const storedIsAuth = atom<boolean>({
  key: 'isAuth',
  default: false,
});
