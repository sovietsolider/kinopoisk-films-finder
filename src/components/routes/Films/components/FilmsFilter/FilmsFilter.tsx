import { useCallback, useEffect, useState } from 'react'
import './FilmsFilter.scss'
import { FilmsFilterType } from './types'
import { Form, Input, InputNumber, Select, Slider, Spin } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dictCountries, fetchFilms, foundFilms, setDictCountries } from '@/store'
import DictsAPI from '@/api/dicts'
import { LoadingOutlined } from '@ant-design/icons';
import FilmsAPI from '@/api/films'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'

export default function FilmsFilter({onFilterChanged}: {onFilterChanged: (filterModel: FilmsFilterType) => void}) {
  const [countries, setCountries] = useRecoilState(dictCountries)
  const [films, setFilms] = useRecoilState(foundFilms)

  const [searchParams, setSearchParams] = useSearchParams();
  const [nameToFind, setNameToFind] = useState<string | null>(null)


  const [model, setModel] = useState<FilmsFilterType>({
    year: null,
    ageRating: null,
    countries: {
      name: []
    }
  })

  const onModelChanged = useCallback(
    _.debounce(async (model: FilmsFilterType) => {
      onFilterChanged(model)
      
    }, 3000), []
  )

  useEffect(() => {
    setDictCountries(countries, setCountries)
    //FilmsAPI.getFilms(10, 1, {})
  }, [])

  useEffect(() => {
    console.log('in use effect', model)
    onModelChanged(model)
  }, [model])

  const notFoundContentNode = () => {
    if(!countries.length) {
      return <span>
        <Spin style={{marginRight: '0.5rem'}} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        Загрузка
        </span>
    } else {
      return <div>Не найдено</div>
    }
  }

  return <>
    <div className='filter-container rounded-border-1'>
      <div className='text-white form-label text-bold '>Название</div>
      <Input placeholder="Введите название..." onChange={(e) => setNameToFind(e.target.value)}/>
    </div>
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <InputNumber style={{width: '100%'}}  min={1850} placeholder="Введите год..." onChange={(val:any) => setModel({...model, year: val})}/>
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Страна</div>
          <Select
            mode="multiple"
            placeholder="Выберите страну"
            notFoundContent={notFoundContentNode()}
            style={{ width: '100%' }}
            options={countries}
            onChange={(val) => setModel({...model, countries: val})}
          />
        </div>
        <div className='filter-item' >
          <div className='text-white form-label text-bold text-nowrap'>Возрастной рейтинг</div>
          <div style={{borderBottom: '2px solid white', position: 'relative', top: '30px'}}></div>
          <Slider min={0} max={18} range defaultValue={[0, 18]} onChangeComplete={(val: number[]) => setModel({...model, ageRating: val})}/>
        </div>
      </div>
    </div>
  </>
}