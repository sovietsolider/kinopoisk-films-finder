import { useEffect, useRef, useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { CachedPages, CommonServerPaginationResponse } from '@/types/common'
import './PaginatedSlider.scss'

export interface PaginatedSliderProps {
  data: any[]
  pages: number
  onPageChanged: (page: number) => void
  imageUrlGetter: (data: any) => string
  children?: JSX.Element | JSX.Element[] | string[] | string;
  imageClass?: string
  sliderOptions?: Settings
}

const defaultSliderOptions = {
  slidesToShow: 5,
  slidesToScroll: 5,
}

export default function PaginatedSlider({
  data,
  pages,
  children,
  onPageChanged,
  imageUrlGetter,
  imageClass = "paginated-slider-carousel-image",
  sliderOptions=defaultSliderOptions
}: PaginatedSliderProps) {
  const [currentPage, setCurrentPage] = useState(1)
  let sliderRef = useRef(null);

  return <>
    <div className="paginated-slider-title">
      <div className="title-2 text-bold">
        {children}
      </div>
      <div className='paginated-slider-pagination-list'>
        {
          Array(pages).fill(0).map((nothing: number, index: number) => {
            return <div
              onClick={() => { setCurrentPage(index + 1); onPageChanged(index + 1); (sliderRef?.current as any).slickGoTo(0) }}
              className={`paginated-slider-pagination-item title-3 
              ${(index + 1) === currentPage && 'paginated-slider-pagination-item-active'}`}
            >
              {index + 1}
            </div>
          })}
        <div>
        </div>
      </div>
    </div>
    <div className='paginated-slider-episodes-slider'>
      {data.length > 0 && <Slider ref={sliderRef} {...sliderOptions}>
        {data.map((episode: any, index: number) => (
          <div key={index}>
            <div className="">
              <div className="paginated-slider-carousel-image-container">
                <img src={imageUrlGetter(episode) ?? process.env.NO_POSTER_URL} className={`${imageClass} rounded-border-1`} />
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