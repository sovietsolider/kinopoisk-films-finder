import { useCallback, useEffect, useRef, useState } from 'react'
import './FilmsFilter.scss'
import { FilmsFilterType } from './types'
import { Form, Input, InputNumber, Select, Slider, Spin } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dictCountries, setDictCountries } from '@/store'
import DictsAPI from '@/api/dicts'
import { LoadingOutlined } from '@ant-design/icons';
import FilmsAPI from '@/api/films'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'
import { FilmsAdapter } from '@/adapters/films'

export default function FilmsFilter(
  {onFilterChanged, value}: {onFilterChanged: (filterModel: FilmsFilterType) => void, value: FilmsFilterType}
) {
  const [countries, setCountries] = useRecoilState(dictCountries)
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true)

  const [model, setModel] = useState<FilmsFilterType>(FilmsAdapter.filterFromQuery(searchParams))

  const onModelChanged = useCallback(
    _.debounce(async (model: FilmsFilterType) => {
      onFilterChanged(model)
    }, 1000), []
  )

  useEffect(() => {
    console.log('setting value')
    setModel(value)
  }, [value.ageRating, value.countries, value.year])
  
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
    } else {
      console.log('model changing')
      onModelChanged(model)
    }
  }, [model])

  useEffect(() => {
    setDictCountries(countries, setCountries)
    //FilmsAPI.getFilms(10, 1, {})
  }, [])

  

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
  {JSON.stringify(model)}
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <InputNumber style={{width: '100%'}} value={model.year} min={1850} placeholder="Введите год..." onChange={(val:any) => setModel({...model, year: val})}/>
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Страна</div>
          <Select
            value={model.countries}
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
          <Slider min={0} max={18} defaultValue={model.ageRating} range onChangeComplete={(val: number[]) => {setModel({...model, ageRating: val})}}/>
        </div>
      </div>
    </div>
  </>
}