import { FilmType } from "@/components/routes/Film/types";
import { CommonServerPaginationResponse } from "@/types/common";
import { atom } from "recoil";

export const storedCurrentPage = atom({
  key: 'currentPage',
  default: 1
})

export const storedElementsPerPage = atom({
  key: 'elementPerPage',
  default: 10
})

export const storedFilms = atom<CommonServerPaginationResponse<FilmType>>({
  key: 'lastFilms',
  default: {docs: [], pages: 0}
})

export const lastFilmsUrl = atom<string>({
  key: "lastFilmsUrl",
  default: ''
})