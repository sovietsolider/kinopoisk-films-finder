export interface EpisodeType {
  duration: number;
  description: string;
  name: string;
  number: number;
  still: {
    previewUrl: string;
    url: string;
  };
}
export interface SeasonType {
  episodes: EpisodeType[];
  duration: number;
  id: string;
  name: string;
  number: number;
  poster: { url: string; previewUrl: string } | undefined;
}

export interface PosterType {
  previewUrl: string;
  type: string;
  id: string;
  movieId: string;
  url: string;
}

export interface ReviewType {
  id: number;
  movieId: number;
  title: string;
  review: string;
  date: string;
  author: string;
  type: 'Позитивный' | 'Негативный';
}

export interface FilmType {
  id: number;
  isSeries: boolean;
  poster: {
    url: string;
    previewUrl: string;
  };
  name: string;
  alternativeName: string;
  year: number;
  ageRating: number;
  description: string;
  rating: {
    await: number | null;
    filmCritics: number | null;
    imdb: number | null;
    kp: number | null;
    russianFilmCritics: number | null;
  };
  similarMovies:
    | {
        year: number;
        name: string;
        poster: { url: string; previewUrl: string };
        id: number;
      }[]
    | undefined;
  persons: {
    name: string;
    photo: string;
    enProfession: 'actor';
    enName: string;
  }[];
}
