import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { FilmType } from "@/components/routes/Film/types"
import FilmCard from './components/FilmCard/FilmCard'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { FilmsFilterType } from './components/FilmsFilter/types'
import { Pagination, PaginationProps, Skeleton, Spin } from 'antd'
import { storedFilms, storedCurrentPage, storedElementsPerPage, lastFilmsUrl } from '@/store/filmsPagination'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import _, { filter } from 'lodash'
import { difference } from '@/utils/deep-compare'
import FilmsAPI from '@/api/films'
import { filmsFilter } from '@/store'
import { FilmsGrid } from './components/FilmsGrid/FilmsGrid'
import { FilmsAdapter } from '@/adapters/films'



export function Films() {
  //const [films, setFilms] = useRecoilState(foundFilms)
  const [films, setFilms] = useRecoilState<{ docs: FilmType[], pages: number }>(storedFilms)
  const [isLoading, setIsLoading] = useState(true)
  
  const isFirstRender = useRef(true)
  const cachedPages = useRef<{ [k: string]: { docs: never[], pages: number, elementsPerPage: number } }>({})
  const [searchParams, setSearchParams] = useSearchParams();

  const [filmsFilter, setFilmsFilter] = useState<FilmsFilterType>(FilmsAdapter.filterFromQuery(searchParams))
  const [currentPage, setCurrentPage] = useState(1)
  const [elementsPerPage, setElementsPerPage] = useState(10)

  const [storedLastFilmsUrl, setStoredLastFilmsUrl] = useRecoilState(lastFilmsUrl)


  const getFilms = async (filter: FilmsFilterType) => {
    console.log('getFilms')
    setIsLoading(true)
    if (cachedPages.current[currentPage] && elementsPerPage === cachedPages.current[currentPage].elementsPerPage) {
      setFilms(cachedPages.current[currentPage])
    } else {
      const res = (await FilmsAPI.getFilms(elementsPerPage, currentPage, filter)).data
      setFilms({ docs: res.docs, pages: res.pages })
      cachedPages.current[currentPage] = { docs: res.docs, pages: res.pages, elementsPerPage }
      console.log('cache', cachedPages.current)
    }

    setIsLoading(false)
  }
  const isDeepChanged = (first: any, second: any) => {
    console.log(difference(_.cloneDeep(first), _.cloneDeep(second)))
    return !_.isEmpty(difference(_.cloneDeep(first), _.cloneDeep(second)))
  }

  const onFilterChanged = async (filter: FilmsFilterType) => {
    console.log(searchParams.toString)
    if (isDeepChanged(_.cloneDeep(filmsFilter), _.cloneDeep(filter))) {
      setFilmsFilter(filter)
      setSearchParams(FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filter))
      cachedPages.current = {}  
    }
  }

  useEffect(() => {
    const page = Number(searchParams.get('page'))
    const limit = Number(searchParams.get('limit'))
    if(page > 0) {
      setCurrentPage(page)
    } else {
      setSearchParams(FilmsAdapter.filmsFilterToServer(limit, 1, filmsFilter))
    }
    if(limit > 0) {
      setElementsPerPage(limit)
    } else {
      setSearchParams(FilmsAdapter.filmsFilterToServer(10, page, filmsFilter))
    }
    setFilmsFilter(FilmsAdapter.filterFromQuery(searchParams)) 
  }, [searchParams])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      getFilms(filmsFilter)
      
    }
    setStoredLastFilmsUrl(`/films?${FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter).toString()}`)
    
    
  }, [...Object.keys(filmsFilter).map((key) => filmsFilter[key]), elementsPerPage, currentPage])

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setSearchParams(FilmsAdapter.filmsFilterToServer(pageSize, page, filmsFilter))
    // setCurrentPage(page)
    // setElementsPerPage(pageSize)
  }

  return (<>
    <div className='films-container'>
      <FilmsFilter model={filmsFilter} onFilterChanged={onFilterChanged} />

      <FilmsGrid
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        films={films.docs}
        pages={films.pages}
        isLoading={isLoading}
        onPaginationChanged={onPaginationChanged}
      />
    </div>
  </>
  )
}