import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { FilmType } from "@/components/routes/Film/types"
import FilmCard from './components/FilmCard/FilmCard'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { FilmsFilterType } from './components/FilmsFilter/types'
import { Pagination, PaginationProps, Skeleton, Spin } from 'antd'
import { storedFilms, storedCurrentPage, storedElementsPerPage } from '@/store/filmsPagination'
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
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) ?? 1)
  const [elementsPerPage, setElementsPerPage] = useState(Number(searchParams.get('limit')) ?? 1)

  const getFilms = async (filter: FilmsFilterType) => {
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

  const onFilterChanged = async (filter: FilmsFilterType) => {
    setFilmsFilter(filter)    
    if (!_.isEmpty(difference(_.cloneDeep(filmsFilter), _.cloneDeep(filter)))) {
      setCurrentPage(1)
      cachedPages.current = {}
    }
  }

  useEffect(() => {
    getFilms(filmsFilter)
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      getFilms(filmsFilter as FilmsFilterType)
    }
    setSearchParams(FilmsAdapter.filmsFilterToServer(elementsPerPage, currentPage, filmsFilter))
  }, [...Object.keys(filmsFilter).map((key) => filmsFilter[key]), elementsPerPage, currentPage])

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page)
    setElementsPerPage(pageSize)
  }

  return (<>
    <div className='films-container'>
      <FilmsFilter value={filmsFilter} onFilterChanged={onFilterChanged} />

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