import React, { useState, useEffect } from "react";
import Pug from "@assets/images/pug.png";
import cat from "@assets/images/gato.png";
import backpug from "@assets/images/Elipse.png";
import male from "@assets/images/male.png";
import female from "@assets/images/female.png";
import "@styles/ItemListCita.scss";
import "@styles/swipeable-list.scss";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import axios from "axios";
import "react-swipeable-list/dist/styles.css";

const ItemListPet = ( props ) => {
  const { mascota, onDelete, setMascotaData, showModal } = props;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setMascotaData(mascota);
          showModal();
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          onDelete(mascota.id);
        }}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );


  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="container__itemListcita">
          <div className="content__imagePet">
            <img className="back__pug" src={backpug} alt="backpug" />
            {
              mascota.especie === "Perro" ? (
              <img className="pug" src={Pug} alt="Mascota" /> ) : (
                <img className="cat" src={cat} alt="Mascota" /> )
            }
          </div>
          <div className="content__information">
            <div className="content__name">
              <p className="cita__namePet">{mascota.nombre}</p>
            </div>
            <div className="content__info">
              <p>{mascota.raza}</p>
              <p>{mascota.sexo}</p>
              <p>{mascota.edad} años</p>
              <p>{mascota.peso} kg</p>
            </div>
            <div className="content__datetime">
              <p>{mascota.fechaNacimiento}</p>
            </div>
            <div className="content__description">
              <p className="description">
                {mascota.notas}
              </p>
            </div>
            <img className="icon__gender" src={mascota.sexo === "Macho" ? male : female} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ItemListPet;
