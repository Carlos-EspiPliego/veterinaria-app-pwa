import React from 'react'
import '@styles/Inicio.scss'
import Logo from '@assets/images/LogoTrans.svg'

const Inicio = () => {
  return (
    <div className='background'>
      <div className='containerInicio'>
        <div className='container__logoInicio'>
          <img className='logoInicio' src={Logo} alt='Logo' />
          <p className='titleInicio'>La mejor veterinaria</p>
        </div>
        <div className='container__btnInicio'>
            <a href='Home' className='btnInicio'>INICIAR SESIÓN</a>
        </div>
      </div>
    </div>
  )
}

export default Inicio