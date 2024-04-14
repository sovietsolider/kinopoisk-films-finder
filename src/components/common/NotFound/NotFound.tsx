import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className='title-1 text-white text-bold notfound-container'>
      <p>Такой страницы не существует :(</p>
      <div className='notfound-link'>
        <NavLink to='/films' className='text-white'>
          Пойдем за фильмами!
        </NavLink>
      </div>
    </div>
  );
}
