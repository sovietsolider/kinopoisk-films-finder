import { useState } from 'react'
import './Seasons.scss'
import { SeasonType } from './types'

export interface SeasonsProps {
  seasons: {
    docs: SeasonType[],
    pages: number
  }
}

export default function Seasons({ seasons }: SeasonsProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const sliderOptions = {
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  return <>
    <div className="seasons-title">
      <div className="title-2 text-bold">
        Сезоны
      </div>
      <div className='seasons-pagination-list'>
        {
          Array(seasons.pages).fill(0).map((nothing: number, index: number) => {
            return <div 
            onClick={() => setCurrentPage(index+1)}
              className={`seasons-pagination-item title-3 
              ${(index+1) === currentPage && 'seasons-pagination-item-active'}`}
            >
              {index + 1}
            </div>
          })}
        <div>
        </div>
      </div>
    </div>
    <div>
      
    </div>
  </>
}