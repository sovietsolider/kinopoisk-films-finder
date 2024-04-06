import { FilmsFilter, FilmsFilterToServer } from "@/components/routes/Films/components/FilmsFilter/types";

export class FilmsAdapter {
  public static filmsFilterToServer(filter: Partial<FilmsFilter>): FilmsFilterToServer {
    return {
      year: filter.year ? filter.year.toString() : null,
      ageRating: filter.ageRating ? filter.ageRating : null,
      'countries.name': filter.countries ? filter.countries?.name : null
    }
  }
}
