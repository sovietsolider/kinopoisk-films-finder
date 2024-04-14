import { Button, Input, InputNumber, Select, Slider, SliderSingleProps, Spin } from "antd"
import '@/components/routes/Films/components/FilmsFilter/FilmsFilter.scss'
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { dictCountries, setDictCountries, setDictsForRandomFilm, storedDictGenres, storedDictTypes } from "@/store"
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons"
import './RandomFilm.scss'
import { FilmType } from "../Film/types"
import FilmsAPI from "@/api/films"
import { useNavigate } from "react-router-dom"
import { notFoundContentNode } from "../Films/components/FilmsFilter/FilmsFilter"

export interface RandomFilmFilterType {
  [k: string]: any
  year: number[]
  countries: string[]
  genres: string[]
  contentTypes: string[]
  kpRating: number[]
  networks: string
}

export default function RandomFilm() {
  const [model, setModel] = useState<RandomFilmFilterType>({
    year: [1874, 2024],
    countries: [],
    genres: [],
    contentTypes: [],
    kpRating: [0, 10],
    networks: ''
  })

  const [film, setFilm] = useState<FilmType>()
  const [countries, setCountries] = useRecoilState(dictCountries)
  const [types, setTypes] = useRecoilState(storedDictTypes)
  const [genres, setGenres] = useRecoilState(storedDictGenres)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setDictCountries(countries, setCountries)
    setDictsForRandomFilm(genres, types, setGenres, setTypes)
  }, [])

  useEffect(() => {
  }, [...Object.keys(model).map((key) => model[key])])

  const fetchFilm = async () => {
    setIsLoading(true)
    const film = await (await FilmsAPI.getRandomFilm(model)).data
    setFilm(film)
    setIsLoading(false)
    navigate(`/films/${film.id}`)
  }

  return <>
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <div className='text-white form-label text-bold'>Год ({model.year[0]}-{model.year[1]})</div>
          <div style={{ borderBottom: '2px solid white', position: 'relative', top: '30px' }}></div>
          <Slider min={1874} defaultValue={[1874, 2024]} max={new Date().getFullYear() + 20} range onChange={(val: number[]) => {
            setModel({ ...model, year: val })
          }} />
        </div>
        {/* <div className='filter-item' >
          <div className='text-white form-label text-bold text-nowrap'>Возрастной рейтинг</div>
          <div style={{ borderBottom: '2px solid white', position: 'relative', top: '30px' }}></div>
          <Slider min={0} max={18} range onChangeComplete={(val: number[]) => {
          }} />
        </div> */}
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Страна</div>
          <Select
            mode="multiple"
            placeholder="Выберите страну"
            style={{ width: '100%' }}
            options={countries}
            notFoundContent={notFoundContentNode(countries)}
            onChange={(val) => {
              setModel({ ...model, countries: val })
            }}
          />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold'>Жанры</div>
          <Select
            mode="multiple"
            placeholder="Выберите жанры"
            style={{ width: '100%' }}
            options={genres}
            notFoundContent={notFoundContentNode(countries)}
            onChange={(val) => {
              setModel({ ...model, genres: val })
            }}
          />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Тип</div>
          <Select
            mode="multiple"
            placeholder="Выберите тип"
            style={{ width: '100%' }}
            options={types}
            notFoundContent={notFoundContentNode(countries)}
            onChange={(val, option) => {
              setModel({ ...model, contentTypes: option.map((d: any) => d.value) })
            }}
          />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Рейтинг Кинопоиска ({model.kpRating[0]}-{model.kpRating[1]})</div>
          <div style={{ borderBottom: '2px solid white', position: 'relative', top: '30px' }}></div>
          <Slider min={0} defaultValue={[0, 10]} step={0.1} max={10} range onChange={(val: number[]) => {
            setModel({ ...model, kpRating: val })
          }} />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Сеть производства</div>
          <Input
            style={{ width: '100%' }}
            placeholder="Например: HBO, Netflix, Amazon..."
            onChange={(val: any) => {
              setModel({ ...model, networks: val })
            }}
          />
        </div>
      </div>
    </div>
    <div className="random-film-button-container">
      {!isLoading ? <Button type="primary" icon={<SearchOutlined />} style={{ borderRadius: '1rem' }} size={'large'} onClick={() => fetchFilm()}>
        Мне повезет!
      </Button> :
        <Spin indicator={<LoadingOutlined style={{ fontSize: 64 }} spin />} />
      }
    </div>
  </>
}