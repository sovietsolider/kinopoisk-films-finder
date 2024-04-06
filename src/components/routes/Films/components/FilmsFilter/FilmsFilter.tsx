import { useEffect, useState } from 'react'
import './FilmsFilter.scss'
import { FilmsFilter } from './types'
import { Form, Input, InputNumber, Select, Slider, Spin } from 'antd'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dictCountries, setDictCountries } from '@/store'
import DictsAPI from '@/api/dicts'
import { LoadingOutlined } from '@ant-design/icons';
import FilmsAPI from '@/api/films'

export default function FilmsFilter() {
  const [countries, setCountries] = useRecoilState(dictCountries)

  const [model, setModel] = useState<FilmsFilter>({
    name: null,
    year: null,
    ageRating: null,
    countries: {
      name: []
    }
  })

  useEffect(() => {
    setDictCountries(countries, setCountries)
    FilmsAPI.getFilms(10, 2, {name: 'Звездные войны'})
  })

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
      <Input placeholder="Введите название..." />
    </div>
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <InputNumber style={{width: '100%'}}  min={1850} placeholder="Введите год..." />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Страна</div>
          <Select
            mode="multiple"
            placeholder="Выберите страну"
            notFoundContent={notFoundContentNode()}
            style={{ width: '100%' }}
            options={countries}
          />
        </div>
        <div className='filter-item' >
          <div className='text-white form-label text-bold text-nowrap'>Возрастной рейтинг</div>
          <div style={{borderBottom: '2px solid white', position: 'relative', top: '30px'}}></div>
          <Slider min={0} max={21} range defaultValue={[0, 21]} />
          {/* <Select
            mode="multiple"
            placeholder="Выберите рейтинг"
            notFoundContent="Не найдено"
            defaultValue={['a10', 'c12']}
            style={{ width: '100%' }}
            options={[
              { value: 'a10', label: '10' },
              { value: 'c12', label: '12' },
            ]}
          /> */}
        </div>
      </div>
    </div>
  </>
}