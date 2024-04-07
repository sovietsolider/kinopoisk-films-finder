import { FilmType } from "./types";
import './FilmCard.scss'
import { useEffect, useState } from "react";
import { Skeleton } from "antd";


export default function FilmCard({imgSrc, name, id, onCardClick}: {imgSrc: string, name: string, id: number, onCardClick: (id: number) => void}) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="film-card" onClick={() => onCardClick(id)}>
      <img src={imgSrc ?? process.env.NO_POSTER_URL} alt={name} className="film-image rounded-border-1" onLoad={() => setIsLoading(false)}/>
      <div className="film-name text-white text-bold overlap-ellipsis-2">
        {name.length ? name : `Название фильма неизвестно`}
      </div>
    </div>
  )
}