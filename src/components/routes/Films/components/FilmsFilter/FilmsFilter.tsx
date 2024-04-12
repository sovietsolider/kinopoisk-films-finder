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
  {onFilterChanged, model}: {onFilterChanged: (filterModel: FilmsFilterType) => void, model: FilmsFilterType}
) {
  const [countries, setCountries] = useRecoilState(dictCountries)
  const [innerModel, setInnerModel] = useState<FilmsFilterType>(model)
  const isFirstRender = useRef(false)
  
  const onModelChanged = useCallback(
    _.debounce(async (model: FilmsFilterType) => {
      onFilterChanged(model)
    }, 1000), []
  )
  
  useEffect(() => {
    if(isFirstRender.current) {
      setDictCountries(countries, setCountries)
      isFirstRender.current = false
    } else {
      onModelChanged(innerModel)
    }
  }, [innerModel])
  

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
          <InputNumber style={{width: '100%'}} value={innerModel.year} min={1850} placeholder="Введите год..." onChange={(val:any) => setInnerModel({...model, year: val})}/>
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Страна</div>
          <Select
            value={innerModel.countries}
            mode="multiple"
            placeholder="Выберите страну"
            notFoundContent={notFoundContentNode()}
            style={{ width: '100%' }}
            options={countries}
            onChange={(val) => setInnerModel({...model, countries: val})}
          />
        </div>
        <div className='filter-item' >
          <div className='text-white form-label text-bold text-nowrap'>Возрастной рейтинг</div>
          <div style={{borderBottom: '2px solid white', position: 'relative', top: '30px'}}></div>
          <Slider min={0} max={18} defaultValue={innerModel.ageRating} range onChangeComplete={(val: number[]) => {setInnerModel({...model, ageRating: val})}}/>
        </div>
      </div>
    </div>
  </>
}