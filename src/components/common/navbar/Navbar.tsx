import './Navbar.scss'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/index";
import React, { useState } from "react";
import FindByNameModal from '../find-by-name-modal/FindByNameModal';


function NavbarLink({children, to}: {children: JSX.Element, to: string}) {
  const navigate = useNavigate()
  const childComponent = React.cloneElement(children, { onClick: () => navigate(to) });
  return (
    childComponent
  )
}

export default function Navbar() {
  const [findByNameModalOpened, setFindByNameModalOpened] = useState(false)

  return <>
    <div className="navbar-container text-white">
      <div className="navbar-inner">
        <div className="navbar-item title-3 text-bold">
          <NavbarLink to='/films'>
            <div>Фильмы</div>
          </NavbarLink>
        </div>
        <div className='navbar-item title-3 text-bold' onClick={() => setFindByNameModalOpened(true)}>
          Найти
        </div>
      </div>
    </div>
    <FindByNameModal opened={findByNameModalOpened} onModalClose={() => setFindByNameModalOpened(false)}/>
  </>
}