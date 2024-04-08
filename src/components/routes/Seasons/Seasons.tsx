import { useEffect, useRef, useState } from 'react'
import './Seasons.scss'
import { EpisodeType, SeasonType } from './types'
import Slider from 'react-slick'
import { CachedPages, CommonServerPaginationResponse } from '@/types/common'

export interface SeasonsProps {
  seasons: {
    docs: SeasonType[],
    pages: number
  }
  onSeasonPageChanged: (page: number) => void
}


export default function Seasons({ seasons, onSeasonPageChanged }: SeasonsProps) {
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
              onClick={() => {setCurrentPage(index + 1); onSeasonPageChanged(index+1)}}
              className={`seasons-pagination-item title-3 
              ${(index + 1) === currentPage && 'seasons-pagination-item-active'}`}
            >
              {index + 1}
            </div>
          })}
        <div>
        </div>
      </div>
    </div>
    <div className='seasons-episodes-slider'>
      {seasons.docs.length && <Slider {...sliderOptions}>
        {seasons.docs[0].episodes.map((episode: EpisodeType, index: number) => (
          <div key={index}>
            <div className="">
              <div className="seasons-carousel-image-container">
                <img src={episode.still.previewUrl ?? process.env.NO_POSTER_URL} className="seasons-carousel-image rounded-border-1" />
              </div>
              <div className="text-bold">
                {episode.name}
              </div>
            </div>
          </div>
        ))}
      </Slider>}
    </div>
    <div>

    </div>
  </>
}