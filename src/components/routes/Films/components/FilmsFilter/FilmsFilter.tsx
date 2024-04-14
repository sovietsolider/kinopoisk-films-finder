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
import _, { first } from 'lodash'
import { FilmsAdapter } from '@/adapters/films'
import { difference } from '@/utils/deep-compare'

export default function FilmsFilter(
  {
    onFilterChanged, model
  }: {
    onFilterChanged: (filterModel: FilmsFilterType) => void,
    model: FilmsFilterType,
  }
) {
  const [countries, setCountries] = useRecoilState(dictCountries)
  //const [searchParams, setSearchParams] = useSearchParams()
  const isFirstInnerSet = useRef(true)
  // const innerModel = useRef<FilmsFilterType>(model)
  const [innerModel, setInnerModel] = useState<FilmsFilterType>(model)

  // const onModelChanged = useCallback(
  //   async (model: FilmsFilterType) => {
  //     console.log('insideFilterChange', _.cloneDeep(innerModel))
  //       onFilterChanged(model)
  //   }, []
  // )
  

  useEffect(() => {
    setDictCountries(countries, setCountries)
  }, [])

  useEffect(() => {
    console.log('modelUpdate')
    setInnerModel(model)
  }, [])

  useEffect(() => {
    console.log('fitler model changed', _.cloneDeep(model))
  }, [model])

  useEffect(() => {
    if(isFirstInnerSet.current) {
      isFirstInnerSet.current = false
    } else {
      onFilterChanged(innerModel as FilmsFilterType)
    }
  }, [innerModel])
  


  const notFoundContentNode = () => {
    if (!countries.length) {
      return <span>
        <Spin style={{ marginRight: '0.5rem' }} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        Загрузка
      </span>
    } else {
      return <div>Не найдено</div>
    }
  }

  return <>
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <InputNumber style={{ width: '100%' }} value={innerModel.year} min={1874} placeholder="Введите год..." onChange={(val: any) => {
            //innerModel.current = {   ...model, year: val}; 
            //onModelChanged(innerModel)
            setInnerModel({ ...model, year: val })
          }} />
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
            onChange={(val) => {
              //innerModel.current = {...model, countries: val};
              //onModelChanged(innerModel)
              setInnerModel({ ...model, countries: val })
            }}
          />
        </div>
        <div className='filter-item' >
          <div className='text-white form-label text-bold text-nowrap'>Возрастной рейтинг</div>
          <div style={{ borderBottom: '2px solid white', position: 'relative', top: '30px' }}></div>
          <Slider min={0} max={18} defaultValue={innerModel.ageRating} range onChangeComplete={(val: number[]) => {
            //innerModel.current = {...model, ageRating: val}; 
            //onModelChanged(innerModel)
            setInnerModel({ ...model, ageRating: val })
          }} />
        </div>
      </div>
    </div>
  </>
}