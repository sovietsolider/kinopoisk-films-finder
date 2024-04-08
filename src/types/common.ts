export interface CommonServerPaginationResponse {
  docs: never[], pages: number
}

export interface CachedPages {
  [k:string]: CommonServerPaginationResponse
}