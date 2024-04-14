import Slider from "react-slick"
import { FilmType } from "../../types"
import './Actors.scss'
import { defaultResponsiveSliderOptions } from "@/types/dicts"
import { useEffect, useMemo, useRef } from "react"


export default function Actors({ film }: { film: FilmType }) {
  const persons = useMemo(() => film.persons?.filter((d) => d.enProfession === 'actor') ?? [], [film.persons])
  let sliderRef = useRef(null);

  const authorSliderOptions = {
    slidesToShow: persons.length < 5 ? persons.length : 5,
    slidesToScroll: persons.length < 5 ? persons.length : 5,
    infinite: false
  }

  useEffect(() => {
    setTimeout(() => { (sliderRef.current as any).slickGoTo(0) }, 750)
  }, [persons])

  return <div className="actors-container">
    <div className="title-2 text-bold" id="actors-title">
      Актерский состав
    </div>
    {persons.length > 0 ? <div className="film-title-name-authors-slider-container">
      <Slider ref={sliderRef} {...{ ...authorSliderOptions, ...defaultResponsiveSliderOptions }}>
        {persons.map((person: FilmType['persons'][number], index) => (
          <div key={index}>
            <div className="carousel-image-container">
              <div>
                <img src={person.photo} className="rounded-border-1" />
              </div>
              <div className="text-bold">
                {person.name ?? person.enName}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
      : <div>Нет информации</div>
    }
  </div>
}

