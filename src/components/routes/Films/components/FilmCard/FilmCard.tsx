import { FilmType } from "@/components/routes/Film/types"
import './FilmCard.scss'
import { useEffect, useState } from "react";
import { Skeleton } from "antd";


export default function FilmCard({imgSrc, name, id, onCardClick, onLoad}: {
  imgSrc: string, 
  name: string, 
  id: number, 
  onCardClick: (id: number) => void,
  onLoad?: () => void
}) {

  return (
    <div className="film-card" onClick={() => onCardClick(id)}>
      <img src={imgSrc ?? process.env.NO_POSTER_URL} alt={name} className="film-image rounded-border-1" onLoad={() => {onLoad && onLoad()}}/>
      <div className="film-name text-white text-bold overlap-ellipsis-2">
        {name.length ? name : `Название фильма неизвестно`}
      </div>
    </div>
  )
}