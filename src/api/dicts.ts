import { http } from './httpAxios';

export default class DictsAPI {
  public static getCountries() {
    return http.get('/v1/movie/possible-values-by-field?field=countries.name');
  }
  public static getGenres() {
    return http.get('/v1/movie/possible-values-by-field?field=genres.name');
  }
  public static getTypes() {
    return http.get('/v1/movie/possible-values-by-field?field=type');
  }
}
