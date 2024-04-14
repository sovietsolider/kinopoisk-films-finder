import { CountryServer, SelectOption } from '@/types/dicts';

const typesTranslator: { [k: string]: string } = {
  'animated-series': 'Анимационный сериал',
  anime: 'Аниме',
  cartoon: 'Мультфильм',
  movie: 'Фильм',
  'tv-series': 'Телесериал',
};

export class DictsAdapter {
  public static dictToClient(dict: CountryServer[], isType = false): SelectOption[] {
    if (isType) {
      return dict.map((c) => ({ value: c.slug, label: typesTranslator[c.slug] }));
    }
    return dict.map((c) => ({ value: c.name, label: c.name }));
  }
}
