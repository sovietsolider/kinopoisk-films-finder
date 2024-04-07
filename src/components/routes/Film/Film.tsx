import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { FilmType } from "../Films/components/FilmCard/types"
import FilmsAPI from "@/api/films"
import './Film.scss'
import { Carousel } from "antd"

export default function Film() {
  const params = useParams()
  const [film, setFilm] = useState<Partial<FilmType>>({})
  const [posters, setPosters] = useState([])
  let sliderRef = useRef(null);
  const [tiles, setTiles] = useState([1, 2, 3, 4, 5])
  const newTiles = [6, 7, 8, 9, 10]

  const fetchFilm = async (id: number) => {
    setFilm((await FilmsAPI.getFilmById(id)).data)
  }

  useEffect(() => {
    fetchFilm(Number(params.id))
  }, [])

  
  const beforeChange = (currentSlide: number, nextSlide: number) => {
    console.log(currentSlide, nextSlide)
    if (nextSlide === 4) {
      setTiles([...tiles, ...newTiles]);
      setTimeout(() => (sliderRef.current as any).goTo(5), 0);
    }
  }

  return <div className="film-container text-white">
    <Carousel 
      ref={sliderRef} 
      autoplay 
      style={{ maxWidth: '100%' }} 
      beforeChange={(currentSlide, nextSlide) => beforeChange(currentSlide, nextSlide)}
    >
      {tiles.map((tile: number, index) => (
        <div key={index}>
          <h3 className="text-white">{tile}</h3>
        </div>
      ))}
    </Carousel>
    <div className="film-title-container">

      <div>

        {/* <img src={film.poster?.url} className="film-title-image" /> */}
      </div>
      <div className="title-2 text-bold">
        {film.name}
      </div>

    </div>

  </div>
}