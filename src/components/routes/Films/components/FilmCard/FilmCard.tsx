import { Film } from "./types";
import './FilmCard.scss'

export default function FilmCard({imgSrc, name}: Film) {
  return (
    <div className="film-card">
      <img src={imgSrc} alt={name} className="film-image rounded-border-1"/>
      <div className="film-name text-white">
        Тайтл
      </div>
    </div>
  )
}