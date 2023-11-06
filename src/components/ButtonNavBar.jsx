import IconPet from '@assets/icons/dog.svg'
import '@styles/ButtonNavBar.scss'

import { IconHome, IconUser } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const ButtonNavBar = () => {
  return (
    <div className='container__buttonNavBar'>
      <div className='content__buttonNavBar'>
        <div className='container__iconUser containers__icons'>
          <Link to={'/Clientes'}>
            <IconUser className='iconUser iconsbnb'/>
          </Link>
        </div>
        <div className='container__iconHome containers__icons'>
          <a href='/Home'>
            <IconHome className='iconHome iconsbnb'/>
          </a>
        </div>
        <div className='container__iconPet containers__icons'>
          <Link to={'/Mascotas'}>
            <img className='iconPet iconsbnb' src={IconPet}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ButtonNavBar