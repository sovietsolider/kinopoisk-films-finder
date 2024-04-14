import { useEffect, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { CachedPages, CommonServerPaginationResponse } from '@/types/common'
import './PaginatedSlider.scss'
import { values } from 'lodash'

export interface PaginatedSliderProps {
  data: any[]
  pages: number
  page?: number
  onPageChanged?: (page: number) => void
  onItemClick?: (item: any) => void
  imageUrlGetter: (data: any) => string
  children?: JSX.Element | JSX.Element[] | string[] | string;
  imageClass?: string
  itemClass?: string
  sliderOptions?: Settings
  additionalName?: string
  type?: 'seasons'
  seasonsNames?: { [k: string]: string }
}

const defaultSliderOptions: Settings = {
  slidesToShow: 5,
  slidesToScroll: 5,
}

export default function PaginatedSlider({
  data,
  pages,
  children,
  page,
  onPageChanged,
  imageUrlGetter,
  onItemClick,
  imageClass = "paginated-slider-carousel-image",
  itemClass = "",
  sliderOptions = defaultSliderOptions,
  seasonsNames,
  type
}: PaginatedSliderProps) {
  const [currentPage, setCurrentPage] = useState(page)
  let sliderRef = useRef(null);

  useEffect(() => {
    console.log('setCurPage', page)
    setCurrentPage(page)
  }, [page])
  
  useEffect(() => {
    console.log(currentPage)
    if(sliderRef.current) {
      setTimeout(() => { (sliderRef.current as any).slickGoTo(0) }, 500)
    }
  }, [currentPage])


  return <>
    <div className="paginated-slider-title">
      <div className="title-2 text-bold paginated-slider-title-text">
        {children}
      </div>
      {pages > 1 &&
        <div className='paginated-slider-pagination-list'>
          {
            Array(pages).fill(0).map((nothing: number, index: number) => {
              return <div
                key={index}
                onClick={() => { setCurrentPage(index + 1); onPageChanged && onPageChanged(index + 1); }}
                className={`paginated-slider-pagination-item title-3 
              ${(index + 1) === currentPage && 'paginated-slider-pagination-item-active'}`}
              >
                {type === 'seasons' && seasonsNames && seasonsNames[index] ? seasonsNames[index] : index + 1}
              </div>
            })}
          <div>
          </div>
        </div>
      }
    </div>
    {data.length > 0 ?
      <div className='paginated-slider-episodes-slider'>
        {data.length > 0 && <Slider ref={sliderRef} {...sliderOptions}>
          {data.map((episode: any, index: number) => (
            <div key={index} onClick={() => onItemClick && onItemClick(episode)} className={`${itemClass}`}>
              <div className="paginated-slider-carousel-image-container">
                <img src={imageUrlGetter(episode) ?? process.env.NO_POSTER_URL} className={`${imageClass} rounded-border-1`} />
              </div>
              <div className="text-bold">
                {episode.name}
              </div>
            </div>
          ))}
        </Slider>}
      </div> : <div>Нет информации</div>}
  </>
}