import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { Film } from './components/FilmCard/types'
import FilmCard from './components/FilmCard/FilmCard'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { fetchFilms, foundFilms } from '@/store'
import { FilmsFilterType } from './components/FilmsFilter/types'
import { Pagination, PaginationProps, Skeleton } from 'antd'


export default function Films() {
  const [films, setFilms] = useRecoilState(foundFilms)
  const [isLoading, setIsLoading] = useState(true)

  const onFilterChanged = async (filter: FilmsFilterType) => {
    setIsLoading(true)
    await fetchFilms(films, setFilms, 10, 1, filter)
    setIsLoading(false)
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize)
  }

  return (<>
    <div className='films-container'>
      <FilmsFilter onFilterChanged={onFilterChanged} />

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
            onShowSizeChange={onShowSizeChange}
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