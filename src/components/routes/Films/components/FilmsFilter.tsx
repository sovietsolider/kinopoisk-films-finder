import { useState } from 'react'
import './FilmsFilter.scss'
import { FilmsFilter } from '../utils/types'
import { Form } from 'react-bootstrap'

export default function FilmsFilter() {
  const [model, setModel] = useState<FilmsFilter>({
    year: [],
    ageRating: [],
    countries: {
      name: []
    }
  })

  return <>
    <div className="filter-container rounded-border-1">
      <div className="filter-inner">
        <div className='filter-item'>
          <Form.Label htmlFor='countriesSelect' className='text-white'>Страна</Form.Label>
          <Form.Select className='filter-input'>
            <option>Выберите страну</option>
            <option value={1}>США</option>
          </Form.Select>
        </div>
        <div className='filter-item'>
          <Form.Label htmlFor='countriesSelect' className='text-white'>Возрастной рейтинг</Form.Label>
          <Form.Select>
            <option>Выберите страну</option>
            <option value={1}>США</option>
          </Form.Select>
        </div>
        <div className='filter-item'>
          <Form.Label htmlFor='countriesSelect' className='text-white'>Возрастной рейтинг</Form.Label>
          <Form.Select>
            <option>Выберите страну</option>
            <option value={1}>США</option>
          </Form.Select>
        </div>
      </div>
    </div>
  </>
}