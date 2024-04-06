import axios, { AxiosInstance } from "axios";

const baseURL = 'https://api.kinopoisk.dev'

export const http: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'X-API-KEY': process.env.TOKEN
  },
})