import { Film } from "./types";
import './FilmCard.scss'
import { useState } from "react";
import { Skeleton } from "antd";

export default function FilmCard({imgSrc, name}: {imgSrc: string, name: string}) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="film-card">
      <img src={imgSrc} alt={name} className="film-image rounded-border-1" onLoad={() => setIsLoading(false)}/>
      <div className="film-name text-white text-bold">
        {name}
      </div>
    </div>
  )
}