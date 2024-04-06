import { CountryServer, SelectOption } from "@/types/dicts";

export class DictsAdapter {
  public static countriesToClient(countries: CountryServer[]): SelectOption[] {
    return countries.map(c => ({value: c.name, label: c.name}))
  }
}
