import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { FilmType } from "../Films/components/FilmCard/types"
import FilmsAPI from "@/api/films"
import './Film.scss'
import { Carousel } from "antd"
import { FilmImagesTypes } from "@/types/dicts"
import Slider from "react-slick"
import { CachedPages, CommonServerPaginationResponse } from "@/types/common"
import _ from 'lodash'
import { PosterType, SeasonType } from "./types"
import PaginatedSlider from "./components/PaginatedSlider/PaginatedSlider"

export default function Film() {
  const postersLimit = 6
  const seasonsLimit = 1
  
  const params = useParams()
  const [film, setFilm] = useState<Partial<FilmType>>({})
  const [posters, setPosters] = useState<CommonServerPaginationResponse<any>>({docs: [], pages: 0})
  const [currentPostersPage, setCurrentPostersPage] = useState(1)
  const [currentSeasonsPage, setCurrentSeasonsPage] = useState(1)
  const [currentPosterPage, setCurrentPosterPage] = useState(1)
  const [seasons, setSeasons] = useState<CommonServerPaginationResponse<SeasonType>>({docs: [], pages: 0})
  const cachedSeasonsPages = useRef<CachedPages<SeasonType>>({})
  const cachedPostersPages = useRef<CachedPages<PosterType>>({})

  let sliderRef = useRef(null);

  const fetchFilm = async (id: number) => {
    setFilm((await FilmsAPI.getFilmById(id)).data)
  }

  const fetchPosters = async (id: number, type: FilmImagesTypes, limit: number, page: number) => {
    if(cachedPostersPages.current[page]) {
      setPosters(cachedPostersPages.current[page])
    }
    else {
      const posters = (await FilmsAPI.getFilmImages(id, type, limit, page)).data
      setPosters({docs: posters.docs, pages: posters.pages})
      cachedPostersPages.current[page] = {docs: posters.docs, pages: posters.pages}
    }
  }

  const fetchSeasons = async (id: number, limit: number, page: number) => {
    console.log(_.cloneDeep(cachedSeasonsPages))
    if(cachedSeasonsPages.current[page]) {
      setSeasons(cachedSeasonsPages.current[page])
    }
    else {
      const seasons = (await FilmsAPI.getFilmSeasons(id, limit, page)).data
      setSeasons({docs: seasons.docs, pages: seasons.pages})
      cachedSeasonsPages.current[page] = {docs: seasons.docs, pages: seasons.pages}
    }
  }


  useEffect(() => {
    cachedSeasonsPages.current = {}
    fetchFilm(Number(params.id))
    fetchPosters(Number(params.id), 'frame', postersLimit, currentPostersPage)
    fetchSeasons(Number(params.id), seasonsLimit, currentSeasonsPage)
  }, [params])


  const beforeChange = (currentSlide: number, nextSlide: number) => {
    console.log(currentSlide, nextSlide)
    // if (nextSlide === 4) {
    //   setTiles([...tiles, ...newTiles]);
    //   setTimeout(() => (sliderRef.current as any).goTo(5), 0);
    // }
  }

  const ratingBoxStyle: (rating: number) => React.CSSProperties = (rating: number) => {
    const res: React.CSSProperties = {
      padding: '0.5rem',
      borderRadius: '0.5rem'
    }
    if (rating > 8) {
      res.backgroundColor = 'green'
    } else if (rating > 5) {
      res.backgroundColor = 'yellow',
        res.color = 'black'
    } else {
      res.backgroundColor = 'red'
      res.color = 'black'
    }
    return res
  }

  const authorSliderOptions = {
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  return <div className="film-container text-white">
    <div className="film-title-container">
      <img src={film.poster?.url} className="film-title-image rounded-border-1" />
      <div className="film-title-name-container">
        <div className="film-title-name title-1 text-bold">
          {film.name}
        </div>
        <div className="film-title-name title-2">
          {film.year} {film.ageRating}+
        </div>
        <div className="film-title-name-description">
          {film.description}
        </div>
        <div className="film-title-name-rating-container">
          <div className="film-title-name-rating-inner">
            <div style={ratingBoxStyle(film.rating?.imdb as number)}>
              {film.rating?.imdb?.toFixed(1)}
            </div>
            <div className="">
              Рейтинг IMDB
            </div>
          </div>
          <div className="film-title-name-rating-inner">
            <div style={ratingBoxStyle(film.rating?.kp as number)}>
              {film.rating?.kp?.toFixed(1)}
            </div>
            <div className="rating-box">
              Рейтинг Кинопоиск
            </div>
          </div>
        </div>
        <div className="title-2 text-center text-bold" id="actors-title">
          Актерский состав
        </div>
        <div className="film-title-name-authors-slider-container">
          <Slider {...authorSliderOptions}>
            {film.persons?.map((person: { name: string, photo: string }, index) => (
              <div key={index}>
                <div className="carousel-image-container">
                  <div>
                  <img src={person.photo} className="film-title-image rounded-border-1" />
                  </div>
                  <div className="text-bold">
                    {person.name}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
    <div className="film-seasons-container">
      <PaginatedSlider  
        pages={seasons.pages} 
        data={seasons.docs[0]?.episodes ?? []} 
        onPageChanged={(page: number) => fetchSeasons(Number(params.id), seasonsLimit, page)}
        imageUrlGetter={(d: any) => d.still.previewUrl}
        sliderOptions={{slidesToShow: 5, slidesToScroll: 5, infinite: false}}
      >
        Сезоны
      </PaginatedSlider>
    </div>
    <div className="film-posters-container">
      <PaginatedSlider 
        pages={posters.pages} 
        data={posters.docs ?? []} 
        onPageChanged={(page: number) => fetchPosters(Number(params.id), 'still', postersLimit, page)}
        imageUrlGetter={(d: any) => d.url}
        sliderOptions={{slidesToShow: 2, slidesToScroll: 2, infinite: false}}
        imageClass="film-posters-image"
      >
        Кадры из фильма
      </PaginatedSlider>
    </div>

    {/* <Carousel
            ref={sliderRef}
            slidesToShow={3}
            dots={{ className: "carousel-dots" }}
            className=""
            prevArrow={'left'} nextArrow={'right'}
            beforeChange={(currentSlide, nextSlide) => beforeChange(currentSlide, nextSlide)}
          >
            {film.persons?.map((person: {name: string, photo: string}, index) => (
              <div key={index}>
                <img src={person.photo} className="film-title-image" />
              </div>
            ))}
          </Carousel> */}
    {/* <Carousel 
      ref={sliderRef}  
      dots={{className: "carousel-dots"}}
      className=""
      beforeChange={(currentSlide, nextSlide) => beforeChange(currentSlide, nextSlide)}
    >
      {posters.map((image: any, index) => (
        <div key={index}>
          <img src={image.url} className="film-title-image" />
        </div>
      ))}
    </Carousel> */}

  </div>
}