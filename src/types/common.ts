export interface CommonServerPaginationResponse<T> {
  docs: T[], pages: number
}

export interface CachedPages<T> {
  [k:string]: CommonServerPaginationResponse<T>
}