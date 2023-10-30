import React from 'react'
import '@styles/NavBar.scss'
import Logo from '@assets/images/ImagotipoTransparente.svg'
import User from '@assets/images/user.png'

const NavBar = () => {
  return (
    <nav className="container__navbar-home">
      <div className='content__navbar-home'>
        <div className="navbar__brand">
          <a href="#">
            <img className='logo__navbar' src={Logo}/>
          </a>
        </div>
        <div className="navbar__links">
          <a className='cerrar__sesion' href="#">Cerrar sesión</a>
          <h3 className='title__navbar'> CITAS </h3>
        </div>
        <div className="navbar__user">
          <div className='content__user'>
            <img className='user__navbar' src={User}/>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar