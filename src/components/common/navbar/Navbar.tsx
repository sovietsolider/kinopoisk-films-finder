import './Navbar.scss'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist/index";
import React from "react";


function NavbarLink({children, to}: {children: JSX.Element, to: string}) {
  const navigate = useNavigate()
  const childComponent = React.cloneElement(children, { onClick: () => navigate(to) });
  return (
    childComponent
  )
}

export default function Navbar() {
  return <>
    <div className="navbar-container text-white">
      <div className="navbar-inner">
        <div className="navbar-item title-3 text-bold">
          <NavbarLink to='/films'>
            <div>Фильмы</div>
          </NavbarLink>
        </div>
      </div>
    </div>
  </>
}