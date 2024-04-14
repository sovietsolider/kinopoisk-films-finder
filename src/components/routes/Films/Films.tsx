import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { FilmType } from "@/components/routes/Film/types"
import FilmCard from './components/FilmCard/FilmCard'
import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  const [searchParams, setSearchParams] = useSearchParams();
  const calculatePageLimit = () => {
    let page = Number(searchParams.get('page')) || 1;
    let limit = Number(searchParams.get('limit')) || 10;
    return {page, limit}
  }

  const [films, setFilms] = useRecoilState<{ docs: FilmType[], pages: number }>(storedFilms)
  const [isLoading, setIsLoading] = useState(true)

  const isFirstRender = useRef(true)
  const cachedPages = useRef<{ [k: string]: { docs: never[], pages: number, elementsPerPage: number } }>({})
  
  const [filmsFilter, setFilmsFilter] = useState<FilmsFilterType>(FilmsAdapter.filterFromQuery(searchParams))
  const filmsFilterRef = useRef(FilmsAdapter.filterFromQuery(searchParams));

  const [currentPage, setCurrentPage] = useState(calculatePageLimit().page)
  const [elementsPerPage, setElementsPerPage] = useState(calculatePageLimit().limit)

  const [storedLastFilmsUrl, setStoredLastFilmsUrl] = useRecoilState(lastFilmsUrl)

  const isDeepChanged = (first: any, second: any) => {
    
    return !_.isEmpty(difference(_.cloneDeep(first), _.cloneDeep(second)))
  }
  const navigate = useNavigate();

  const getFilms = async (filter: FilmsFilterType, elementsPerPage: number, currentPage: number) => {
    
    setIsLoading(true)
    if (cachedPages.current[currentPage] && elementsPerPage === cachedPages.current[currentPage].elementsPerPage) {
      setFilms(cachedPages.current[currentPage])
    } else {
      const res = (await FilmsAPI.getFilms(elementsPerPage, currentPage, filter)).data
      setFilms({ docs: res.docs, pages: res.pages })
      cachedPages.current[currentPage] = { docs: res.docs, pages: res.pages, elementsPerPage }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getFilms(filmsFilter, elementsPerPage, currentPage)
    setStoredLastFilmsUrl(`/films?${FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter).toString()}`)
  }, [filmsFilter.ageRating, filmsFilter.countries, filmsFilter.year, elementsPerPage, currentPage])

  useEffect(() => {
    console.log('rerender')
  })

  useEffect(() => {
    filmsFilterRef.current = filmsFilter;
  }, [filmsFilter]);

  useEffect(() => {
    setSearchParams(FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter))
  }, [])
  
  
  const onPaginationChanged = (page: number, pageSize: number) => {
    if(page !== currentPage) {
      setCurrentPage(page)
    }
    if(pageSize !== elementsPerPage) {
      setElementsPerPage(pageSize)
    }
    console.log(page, pageSize)
    setSearchParams(FilmsAdapter.filmsFilterToServer(pageSize, page, filmsFilter))
  }
  
  const setFilmsFilterDebounced = useCallback(
    _.debounce(async (model: FilmsFilterType) => {
      console.log('insideFilterChange', _.cloneDeep(model))
        setFilmsFilter(model)
    }, 1000, {trailing: true}), []
  )

  const onFilterChanged = (filter: FilmsFilterType) => {
    if(isDeepChanged(filmsFilterRef.current, filter)) {
      cachedPages.current = {}
      setCurrentPage(1)
      setFilmsFilterDebounced(filter)
      setSearchParams(FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filter))
    }
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