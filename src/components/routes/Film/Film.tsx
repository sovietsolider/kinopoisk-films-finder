import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FilmType } from "@/components/routes/Film/types"
import FilmsAPI from "@/api/films"
import './Film.scss'
import { Carousel } from "antd"
import { defaultResponsiveSliderOptions, FilmImagesTypes } from "@/types/dicts"
import Slider from "react-slick"
import { CachedPages, CommonServerPaginationResponse } from "@/types/common"
import _ from 'lodash'
import { PosterType, ReviewType, SeasonType } from "./types"
import PaginatedSlider from "./components/PaginatedSlider/PaginatedSlider"
import Reviews from "./components/Reviews/Reviews"
import { Badge } from "@/components/common/Badge/Badge"
import { LeftOutlined } from "@ant-design/icons"
import { useRecoilState } from "recoil"
import { lastFilmsUrl } from "@/store/filmsPagination"
import useWindowDimensions from "@/components/hooks/useWindowDimensions"
import Actors from "./components/Actors/Actors"


export default function Film() {
  const postersLimit = 20
  const seasonsLimit = 1
  const reviewsLimit = 2

  const params = useParams()
  const [film, setFilm] = useState<FilmType>()
  const [posters, setPosters] = useState<CommonServerPaginationResponse<PosterType>>({ docs: [], pages: 0 })
  const [reviews, setReviews] = useState<CommonServerPaginationResponse<ReviewType>>({ docs: [], pages: 0 })

  const [currentPostersPage, setCurrentPostersPage] = useState(1)
  const [currentSeasonsPage, setCurrentSeasonsPage] = useState(1)
  const [currentReviewPage, setCurrentReviewPage] = useState(1)

  const [seasons, setSeasons] = useState<CommonServerPaginationResponse<SeasonType>>({ docs: [], pages: 0 })
  const [seasonsNames, setSeasonsNames] = useState<{ [k: string]: string }>({})
  const cachedSeasonsPages = useRef<CachedPages<SeasonType>>({})
  const cachedPostersPages = useRef<CachedPages<PosterType>>({})
  const cachedReviewsPages = useRef<CachedPages<any>>({})

  const [storedLastFilmsUrl, setStoredLastFilmsUrl] = useRecoilState(lastFilmsUrl)
  const navigate = useNavigate()
  const { width, height } = useWindowDimensions()

  const resetCache = () => {
    console.log('reset cache', currentPostersPage)
    cachedSeasonsPages.current = {}; setCurrentSeasonsPage(1);
    cachedPostersPages.current = {}; setCurrentPostersPage(1);
    cachedReviewsPages.current = {}; setCurrentReviewPage(1);
  }

  const fetchFilm = async (id: number) => {
    const film = (await FilmsAPI.getFilmById(id)).data
    setFilm(film)
    return film
  }

  const fetchPosters = async (id: number, type: FilmImagesTypes, limit: number, page: number) => {
    if (cachedPostersPages.current[page]) {
      setPosters(cachedPostersPages.current[page])
    }
    else {
      const posters = (await FilmsAPI.getFilmImages(id, type, limit, page)).data
      setPosters({ docs: posters.docs, pages: posters.pages })
      cachedPostersPages.current[page] = { docs: posters.docs, pages: posters.pages }
    }
  }

  const fetchSeasons = async (id: number, limit: number, page: number) => {
    let total;
    if (cachedSeasonsPages.current[page]) {
      setSeasons(cachedSeasonsPages.current[page])
    }
    else {
      const seasons = (await FilmsAPI.getFilmSeasons(id, limit, page)).data
      total = seasons.total
      setSeasons({ docs: seasons.docs, pages: seasons.pages })
      cachedSeasonsPages.current[page] = { docs: seasons.docs, pages: seasons.pages }
    }
    return total
  }
  const fetchSeasonsNames = async (id: number, limit: number, page: number) => {
    const res = (await FilmsAPI.getFilmsSeasonsNames(id, limit, page)).data
    let resByNumber = _.groupBy(res.docs, 'number')

    resByNumber = _.forOwn(resByNumber, (value, key) => {
      resByNumber[key] = value[0].name
    })
    console.log(resByNumber)
    setSeasonsNames(resByNumber as unknown as { [k: string]: string })

  }

  const fetchReviews = async (id: number, limit: number, page: number) => {
    if (cachedReviewsPages.current[page]) {
      setReviews(cachedReviewsPages.current[page])
    }
    else {
      const reviews = (await FilmsAPI.getFilmReviews(id, limit, page)).data
      //reviews.docs[0].review = 'пам пап'
      setReviews({ docs: reviews.docs, pages: reviews.pages })
      cachedReviewsPages.current[page] = { docs: reviews.docs, pages: reviews.pages }
    }
  }


  useEffect(() => {
    resetCache()

    fetchFilm(Number(params.id)).then((film: FilmType) => film.isSeries ?
      fetchSeasons(Number(params.id), seasonsLimit, currentSeasonsPage).then((total: number) => {
        fetchSeasonsNames(Number(params.id), total, 1)
      }) : null
    )
    fetchPosters(Number(params.id), 'frame', postersLimit, currentPostersPage)

    //fetchReviews(Number(params.id), reviewsLimit, currentReviewPage)
  }, [params])

  useEffect(() => {
    fetchReviews(Number(params.id), reviewsLimit, currentReviewPage)
  }, [params, currentReviewPage])

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

  const filmsPostersResponsiveOptions = {
    responsive: [{
      breakpoint: 867,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }]
  }

  const filmsSimilarMoviesResponsiveOptions = {
    responsive: [
      {
        breakpoint: 867,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
  }


  return <>
    {!_.isNil(film) &&
      <div className="film-container text-white">
        <div className="cursor-pointer" id="film-back-button" onClick={() => storedLastFilmsUrl.length ? navigate(storedLastFilmsUrl) : navigate('/films')}>
          <span>
            <LeftOutlined id="film-back-icon" />
          </span><span className="text-bold" >
            К фильмам
          </span>
        </div>

        <div className="film-title-container">
          <img src={film.poster?.url} className="film-title-image rounded-border-1" />
          <div className="film-title-name-container">
            <div className="film-title-name film-title-name-name title-1 text-bold">
              {film.name}
            </div>
            <div className="film-title-name title-2">
              {film.year} {film.ageRating}+
            </div>
            {width > 867 && <div className="film-title-name-description">
              <div className="film-title-name-description" dangerouslySetInnerHTML={{ __html: film.description.replace('&#151', '') }}>
              </div>
            </div>}
            <div className="film-title-name-rating-container">
              {!film.rating.imdb && !film.rating.kp &&
                <div>Отсутствует в рейтингах IMDB и Кинопоиск</div>
              }
              {film.rating.imdb &&
                <Badge iconStyle={ratingBoxStyle(film.rating.imdb as number)} value={film.rating?.imdb?.toFixed(1) as string}>
                  Рейтинг IMDB
                </Badge>
              }
              {film.rating.kp &&
                <Badge iconStyle={ratingBoxStyle(film.rating.kp as number)} value={film.rating?.kp?.toFixed(1) as string}>
                  Рейтинг Кинопоиск
                </Badge>
              }
            </div>
            {width >= 1308 && <Actors film={film} />}
          </div>
        </div>
        {width <= 867 &&
          <div className="film-title-name-description" dangerouslySetInnerHTML={{ __html: film.description.replace('&#151', '') }}>
          </div>
        }
        {width < 1308 && <Actors film={film} />}
        {
          Object.keys(seasonsNames).length > 0 && <div className="film-seasons-container">
            <PaginatedSlider
              pages={seasons.pages}
              page={currentSeasonsPage}
              type={'seasons'}
              seasonsNames={seasonsNames}
              data={seasons.docs[0]?.episodes ?? []}
              additionalName={seasons.docs[0]?.name ?? ''}
              onPageChanged={(page: number) => {fetchSeasons(Number(params.id), seasonsLimit, page); setCurrentSeasonsPage(page)}}
              imageUrlGetter={(d: any) => d.still.previewUrl}
              sliderOptions={{ ...{ slidesToShow: 5, slidesToScroll: 5, infinite: false }, ...defaultResponsiveSliderOptions }}
            >
              Сезоны
            </PaginatedSlider>
          </div>}
        <div className="film-posters-container">
          <PaginatedSlider
            pages={posters.pages}
            page={currentPostersPage}
            data={posters.docs ?? []}
            onPageChanged={(page: number) => {fetchPosters(Number(params.id), 'frame', postersLimit, page); setCurrentPostersPage(page)}}
            imageUrlGetter={(d: any) => d.url}
            sliderOptions={{ ...{ slidesToShow: 2, slidesToScroll: 2, infinite: false }, ...filmsPostersResponsiveOptions }}
            imageClass="film-posters-image"
          >
            Кадры из фильма
          </PaginatedSlider>
        </div>
        <div className="film-reviews-container">
          <Reviews
            currentPage={currentReviewPage}
            onPageChanged={(page: number, pageSize: number) => setCurrentReviewPage(page)}
            pages={reviews.pages}
            reviews={reviews.docs}
            elementsPerPage={reviewsLimit}
          />
        </div>
        <div className="film-similar-movies-container">
          <PaginatedSlider
            pages={0}
            data={film.similarMovies}
            onItemClick={(item: FilmType['similarMovies'][number]) => { navigate(`/films/${item.id}`); window.scrollTo(0, 0); }}
            imageUrlGetter={(d: any) => d.poster.previewUrl}
            itemClass="cursor-pointer"
            imageClass="paginated-slider-carousel-image film-similar-movies-image"
            sliderOptions={{ ...{ slidesToShow: 3, slidesToScroll: 3, infinite: false }, ...filmsSimilarMoviesResponsiveOptions }}
          >
            Похожие фильмы
          </PaginatedSlider>
        </div>
      </div>
    }
  </>
}