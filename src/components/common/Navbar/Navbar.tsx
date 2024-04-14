import './Navbar.scss';
import { useMatch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist/index';
import React, { useState } from 'react';
import FindByNameModal from '../FindByNameModal/FindByNameModal';
import { LoginModal } from '../LoginModal/LoginModal';
import { useRecoilState } from 'recoil';
import { storedIsAuth } from '@/store';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

function NavbarLink({ children, to }: { children: JSX.Element; to: string }) {
  const navigate = useNavigate();
  const childComponent = React.cloneElement(children, { onClick: () => navigate(to) });
  return childComponent;
}

export default function Navbar() {
  const [findByNameModalOpened, setFindByNameModalOpened] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [isAuth, setIsAuth] = useRecoilState(storedIsAuth);

  return (
    <>
      <div className='navbar-container text-white'>
        <div className='navbar-inner'>
          <div className='navbar-filmfind'>
            <div
              className={`navbar-item title-3 text-bold ${useMatch('/films') ? 'navbar-item-active' : ''}`}
            >
              <NavLink to='/films'>Фильмы</NavLink>
            </div>
            <div
              className='navbar-item title-3 text-bold'
              onClick={() => setFindByNameModalOpened(true)}
            >
              <a>Найти</a>
            </div>
            {isAuth && (
              <div className='navbar-item title-3 text-bold'>
                <NavLink to='/random'>Случайный фильм</NavLink>
              </div>
            )}
          </div>
          <div className='navbar-auth-container'>
            {!isAuth ? (
              <div
                className='navbar-item title-3 text-bold'
                onClick={() => setLoginModalOpened(true)}
              >
                <a>Войти</a>
              </div>
            ) : (
              <div
                className='navbar-item title-3 text-bold'
                onClick={() => {
                  setIsAuth(false);
                  Cookies.remove('auth', { path: '' });
                }}
              >
                <a>Выйти</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <FindByNameModal
        opened={findByNameModalOpened}
        onModalClose={() => setFindByNameModalOpened(false)}
      />
      <LoginModal opened={loginModalOpened} onModalClose={() => setLoginModalOpened(false)} />
    </>
  );
}
