import React from 'react' 
import '@styles/NotFound.scss'
import CatNotFoundC from '@assets/images/CatNotFoundC.svg'

const NotFound404 = () => {
  return (
    <div className="container__notfound">
      <div className="content__notfound">
        <div className="container__title">
          <h1>Ooops!</h1>
          <p>La página no fue encontrada</p>
        </div>
        <div className="container__image">
          <img className="imgCat" src={CatNotFoundC} alt="CatNotFoundC" />
        </div>
        <div className="container__btn">
          <a className="button btn__notfound" href="/Home">Volver al inicio</a>
        </div>
      </div>
    </div>
  )
}

export default NotFound404