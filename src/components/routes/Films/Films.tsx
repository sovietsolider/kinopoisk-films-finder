import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { FilmType } from './components/FilmCard/types'
import FilmCard from './components/FilmCard/FilmCard'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { fetchFilms, filmsFilter, foundFilms } from '@/store'
import { FilmsFilterType } from './components/FilmsFilter/types'
import { Pagination, PaginationProps, Skeleton } from 'antd'
import { storedCurrentPage, storedElementsPerPage } from '@/store/filmsPagination'
import { useNavigate } from 'react-router-dom'

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
        total={pages*elementsPerPage}
        locale={{ items_per_page: "элементов" }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  </>
}


export function Films() {
  const [films, setFilms] = useRecoilState(foundFilms)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useRecoilState(storedCurrentPage)
  const [elementsPerPage, setElementsPerPage] = useRecoilState(storedElementsPerPage)
  const [storedFilmsFilter, setStoredFilmsFilter] = useRecoilState(filmsFilter)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const getFilms = async (filter: FilmsFilterType) => {
    console.log('getFilms', elementsPerPage, currentPage)
    setIsLoading(true)
    await fetchFilms(films, setFilms, elementsPerPage, currentPage, filter)
    setIsLoading(false)
  }

  const onFilterChanged = async (filter: FilmsFilterType) => {
    console.log('onFilterChanged')
    setCurrentPage(1)
    setStoredFilmsFilter(filter)
    //await getFilms(filter)
  }

  useEffect(() => {
    if (!isFirstRender) {
      getFilms(storedFilmsFilter as FilmsFilterType)
    } else {
      setIsFirstRender(false)
    }
  }, [storedFilmsFilter, elementsPerPage, currentPage])

  const onPaginationChanged: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page)
    setElementsPerPage(pageSize)
  }

  return (<>
    <div className='films-container'>
      <FilmsFilter onFilterChanged={onFilterChanged} />

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