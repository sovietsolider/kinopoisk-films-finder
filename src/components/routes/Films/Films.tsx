import FilmsFilter from '@/components/routes/Films/components/FilmsFilter/FilmsFilter'
import './Films.scss'
import { Film } from './components/FilmCard/types'
import FilmCard from './components/FilmCard/FilmCard'
import React from 'react'


export default function Films() {
  const films = [
    {
      name: 'Звездные войны',
      imgSrc: 'https://image.openmoviedb.com/kinopoisk-st-images//film_big/893502.jpg'
    },
    {
      name: 'Звездные войны 2',
      imgSrc: 'https://image.openmoviedb.com/kinopoisk-st-images//film_big/893502.jpg'
    },
    {
      name: 'Звездные войны 3',
      imgSrc: 'https://image.openmoviedb.com/kinopoisk-st-images//film_big/893502.jpg'
    },
    {
      name: 'Звездные войны 4',
      imgSrc: 'https://image.openmoviedb.com/kinopoisk-st-images//film_big/893502.jpg'
    },
    {
      name: 'Звездные войны 5',
      imgSrc: 'https://image.openmoviedb.com/kinopoisk-st-images//film_big/893502.jpg'
    },
    {
      name: 'Звездные войны 5',
      imgSrc: 'https://image.openmoviedb.com/kinopoisk-st-images//film_big/893502.jpg'
    },
  ]
  return (<>
    <div className='films-container'>
      <FilmsFilter />
      <div className='films-list-container'>
        {films.map((film: Film, index: number) => (
          <FilmCard imgSrc={film.imgSrc} name={film.name} />
        ))}
      </div>
    </div>
  </>


  )
}