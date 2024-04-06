import { atom } from "recoil";

export const storedCurrentPage = atom({
  key: 'currentPage',
  default: 1
})

export const storedElementsPerPage = atom({
  key: 'elementPerPage',
  default: 10
})