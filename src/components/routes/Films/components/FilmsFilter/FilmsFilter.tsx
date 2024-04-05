import { useState } from 'react'
import './FilmsFilter.scss'
import { FilmsFilter } from './types'
import { Form, Input, Select } from 'antd'

export default function FilmsFilter() {
  const [model, setModel] = useState<FilmsFilter>({
    year: [],
    ageRating: [],
    countries: {
      name: []
    }
  })

  return <>
    <div className='filter-container rounded-border-1'>
      <div className='text-white form-label text-bold '>Название</div>
      <Input placeholder="Введите название..." />
    </div>
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <Select
            mode="multiple"
            placeholder="Выберите год"
            notFoundContent="Не найдено"
            defaultValue={['a10', 'c12']}
            style={{ width: '100%' }}
            options={[
              { value: 'a10', label: '10' },
              { value: 'c12', label: '12' },
            ]}
          />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <Select
            mode="multiple"
            placeholder="Выберите год"
            notFoundContent="Не найдено"
            defaultValue={['a10', 'c12']}
            style={{ width: '100%' }}
            options={[
              { value: 'a10', label: '10' },
              { value: 'c12', label: '12' },
            ]}
          />
        </div>
        <div className='filter-item'>
          <div className='text-white form-label text-bold '>Год</div>
          <Select
            mode="multiple"
            placeholder="Выберите год"
            notFoundContent="Не найдено"
            defaultValue={['a10', 'c12']}
            style={{ width: '100%' }}
            options={[
              { value: 'a10', label: '10' },
              { value: 'c12', label: '12' },
            ]}
          />
        </div>
      </div>
    </div>
  </>
}