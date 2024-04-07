import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { FilmType } from "../Films/components/FilmCard/types"
import FilmsAPI from "@/api/films"
import './Film.scss'
import { Carousel } from "antd"
import { FilmImagesTypes } from "@/types/dicts"
import Slider from "react-slick"

export default function Film() {
  const postersLimit = 5
  const seasonsLimit = 1
  const params = useParams()
  const [film, setFilm] = useState<Partial<FilmType>>({})
  const [posters, setPosters] = useState([])
  const [currentPostersPage, setCurrentPostersPage] = useState(1)
  const [currentSeasonsPage, setCurrentSeasonsPage] = useState(1)
  const [seasons, setSeasons] = useState({docs: [], pages: 0})

  let sliderRef = useRef(null);

  const fetchFilm = async (id: number) => {
    setFilm((await FilmsAPI.getFilmById(id)).data)
  }

  const fetchPosters = async (id: number, type: FilmImagesTypes, limit: number, page: number) => {
    setPosters((await FilmsAPI.getFilmImages(id, type, limit, page)).data.docs)
  }

  const fetchSeasons = async (id: number, limit: number, page: number) => {
    const seasons = (await FilmsAPI.getFilmSeasons(id, limit, page)).data
    setSeasons({docs: seasons.docs, pages: seasons.pages})
  }


  useEffect(() => {
    fetchFilm(Number(params.id))
    fetchPosters(Number(params.id), 'backdrops', postersLimit, currentPostersPage)
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