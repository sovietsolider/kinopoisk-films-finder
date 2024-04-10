import { FilmsFilterType, FilmsFilterToServer } from "@/components/routes/Films/components/FilmsFilter/types";

const sliderAdapter = (val: number[]) => {
  if(!val.length) {
    return null
  }
  if (val[0] !== val[1]) {
    return `${val[0]}-${val[1]}`
  } else {
    return `${val[0]}`
  }
}


export class FilmsAdapter {
  public static filmsFilterToServer(filter: FilmsFilterType): FilmsFilterToServer {
    return {
      year: filter.year ? filter.year.toString() : null,
      ageRating: sliderAdapter(filter.ageRating),
      'countries.name': (filter.countries 
        && filter.countries.length) ? filter.countries : null
    }
  }
}
