import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { Film } from './components/FilmCard/types'
import FilmCard from './components/FilmCard/FilmCard'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { fetchFilms, filmsFilter, foundFilms } from '@/store'
import { FilmsFilterType } from './components/FilmsFilter/types'
import { Pagination, PaginationProps, Skeleton } from 'antd'
import { storedCurrentPage, storedElementsPerPage } from '@/store/filmsPagination'


export default function Films({onlyList=false}: {onlyList?: boolean}) {
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
    if(!isFirstRender) {
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
      {!onlyList ? <FilmsFilter onFilterChanged={onFilterChanged} /> : null}

      <div className='films-list-container'>
        {
          isLoading ? <Skeleton active={true}></Skeleton> :
            films.map((film: Film, index: number) => (
              <FilmCard imgSrc={film.poster.previewUrl} name={film.name} />
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
            total={50}
            locale={{ items_per_page: "элементов"}}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </div>
    </div>
  </>


  )
}