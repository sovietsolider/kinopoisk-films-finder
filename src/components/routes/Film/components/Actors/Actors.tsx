import Slider from "react-slick"
import { FilmType } from "../../types"
import './Actors.scss'
import { defaultResponsiveSliderOptions } from "@/types/dicts"


export default function Actors({film}: {film:FilmType}) {
  const authorSliderOptions = {
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  

  return <div className="actors-container">
    <div className="title-2 text-bold" id="actors-title">
      Актерский состав
    </div>
    <div className="film-title-name-authors-slider-container">
      <Slider {...{ ...authorSliderOptions, ...defaultResponsiveSliderOptions }}>
        {film.persons?.map((person: { name: string, photo: string }, index) => (
          <div key={index}>
            <div className="carousel-image-container">
              <div>
                <img src={person.photo} className="rounded-border-1" />
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
}

