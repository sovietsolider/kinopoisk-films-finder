import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { FilmType } from "@/components/routes/Film/types"
import FilmCard from './components/FilmCard/FilmCard'
import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { FilmsFilterType } from './components/FilmsFilter/types'
import { Pagination, PaginationProps, Skeleton } from 'antd'
import { storedFilms, storedCurrentPage, storedElementsPerPage } from '@/store/filmsPagination'
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { difference } from '@/utils/deep-compare'
import FilmsAPI from '@/api/films'
import { filmsFilter } from '@/store'

interface FilmsGridProps {
  isLoading: boolean,
  films: any[],
  currentPage: number,
  elementsPerPage: number,
  pages: number,
  onPaginationChanged: PaginationProps['onChange']
}

export function FilmsGrid({
  isLoading,
  films,
  currentPage,
  elementsPerPage,
  pages,
  onPaginationChanged
}: FilmsGridProps) {
  const navigate = useNavigate()

  return <>
    <div className='films-list-container'>
      {
        isLoading ? <Skeleton active={true}></Skeleton> :
          films.map((film: FilmType, index: number) => (
            <FilmCard
              imgSrc={film.poster?.previewUrl ?? null}
              name={film?.name ?? ''}
              id={film.id}
              onCardClick={(id) => navigate(`/films/${id}`)}
            />
          ))
      }
    </div>
    <div className='pagination-container'>
      <Pagination
        showSizeChanger
        current={currentPage}
        pageSize={elementsPerPage}
        onChange={onPaginationChanged}
        defaultCurrent={1}
        total={pages * elementsPerPage}
        locale={{ items_per_page: "элементов" }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  </>
}


export function Films() {
  //const [films, setFilms] = useRecoilState(foundFilms)
  const [films, setFilms] = useRecoilState<{docs: FilmType[], pages: number}>(storedFilms)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useRecoilState(storedCurrentPage)
  const [elementsPerPage, setElementsPerPage] = useRecoilState(storedElementsPerPage)
  const [storedFilmsFilter, setStoredFilmsFilter] = useRecoilState(filmsFilter)
  const isFirstRender = useRef(true)
  const cachedPages = useRef<{[k:string]: {docs: never[], pages: number, elementsPerPage: number}}>({})

  const getFilms = async (filter: FilmsFilterType) => {
    setIsLoading(true)

    if (cachedPages.current[currentPage] && elementsPerPage === cachedPages.current[currentPage].elementsPerPage) {
      setFilms(cachedPages.current[currentPage])
    } else {
      const res = (await FilmsAPI.getFilms(elementsPerPage, currentPage, filter)).data
      setFilms({docs: res.docs, pages: res.pages})
      cachedPages.current[currentPage] = {docs: res.docs, pages: res.pages, elementsPerPage}
    }

    setIsLoading(false)
  }

  const onFilterChanged = async (filter: FilmsFilterType) => {
    console.log(_.cloneDeep(storedFilmsFilter), _.cloneDeep(filter))
    cachedPages.current = {}
    console.log(difference(_.cloneDeep(storedFilmsFilter), _.cloneDeep(filter)))
    if(!_.isEmpty(difference(_.cloneDeep(storedFilmsFilter), _.cloneDeep(filter)))) {
      setCurrentPage(1)
      setStoredFilmsFilter(filter)
    }
    await getFilms(filter)
  }

  useEffect(() => {
    console.log('root')
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      getFilms(storedFilmsFilter as FilmsFilterType)
    }
  }, [...Object.keys(storedFilmsFilter).map((key) => storedFilmsFilter[key]), elementsPerPage, currentPage])

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page)
    setElementsPerPage(pageSize)
  }

  return (<>
    <div className='films-container'>
      <FilmsFilter value={storedFilmsFilter} onFilterChanged={onFilterChanged} />

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