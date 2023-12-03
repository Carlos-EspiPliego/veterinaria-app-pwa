import React from "react";
import dog from "@assets/images/dog.png";
import backpug from "@assets/images/Elipse.png";
import cat from "@assets/images/cat.png";
import male from "@assets/images/male.png";
import female from "@assets/images/female.png";
import "@styles/ItemListCita.scss";
import "@styles/swipeable-list.scss";

const ItemListHistorial = (props) => {
  const {historial } = props;


  return (

        <div className="container__itemListcita">
          <div className="content__imagePet">
            <img className="back__pug" src={backpug} alt="backpug" />
            {historial.mascota.especie == "Perro" ? (
              <img className="pug" src={dog} alt="Mascota" style={{width:100,height:100}}/>
            ) : (
              <img className="cat" src={cat} alt="Mascota" style={{width:100,height:100}}/>
            )}
          </div>
          <div className="content__information">
            <div className="content__name">
              <p className="cita__namePet">{historial.mascota.nombre}</p>
            </div>
            <div className="content__info">
              <p>{historial.mascota.raza}</p>
              <p>{historial.mascota.sexo}</p>
              <p>{historial.mascota.edad} años</p>
              <p>{historial.mascota.peso} kg</p>
            </div>
            <div className="content__datetime">
              <p>{historial.fecha}</p>
            </div>
            <div className="content__description">
              <p className="description" style={{fontSize:14}}>Malestar: {historial.malestar}</p>
            </div>
            <div className="content__description">
              <p className="description" style={{fontSize:14}}>Tratamiento: {historial.tratamiento}</p>
            </div>
            <img
              className="icon__gender"
              src={historial.mascota.sexo == "M" ? male : female}
            />
          </div>
        </div>
  );
};

export default ItemListHistorial;
