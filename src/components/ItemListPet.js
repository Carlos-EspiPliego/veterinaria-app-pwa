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

const ItemListPet = ({idMascota,mascota,mascotaEdit,setMascotaEdit,showModal,handleClose,onDelete}) => {
  const [mascotaEditItem, setMascotaEditItem] = useState({
    idMascota: mascota.id,
    nombreMascota: mascota.nombre,
    fechaNacimiento: mascota.fechaNacimiento,
    peso: mascota.peso,
    notas: mascota.notas,
    idCliente: mascota.cliente.id,
    nombreCliente:mascota.cliente.nombre,
    apellidoCliente:mascota.cliente.apellidos,
    sexo: mascota.sexo,
    especie: mascota.especie,
    raza: mascota.raza,
    edad: mascota.edad,
  });
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setMascotaEdit(mascotaEditItem);
          console.log(mascotaEdit);
          console.log(mascotaEditItem);
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
          console.log("eliminar"+mascotaEditItem.idMascota)
          console.log(mascotaEdit);
          console.log(mascotaEditItem);
          console.log("se establecio la pet to deelete");
          deletePet();
        }}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const deletePet = () => {
    
    console.log("onDelete");
      console.log("Es una nueva cita -> ");
      console.log(mascotaEditItem);

      const urlAdd = "http://srchicharron.com:8080/dancing-queen/mascotas/deletemascota";
      //const urlAdd = "http://localhost:2813/mascotas/deletemascota";
      const newPet = {
        id: mascotaEditItem.idMascota,
      };
      console.log("Datos de la newPet");
      console.log(newPet);
      axios({
        method: "POST",
        url: urlAdd,
        data: JSON.stringify(newPet),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          "Content-Type": "application/json",
        },
        mode: "no-cors",
      })
        .then((response) => {
          console.log(response);
          onDelete();
        })
        .catch((error) => {
          console.error(error);
        });
    
  };

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
              mascota.especie == "PERRO" ? (
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
            <img className="icon__gender" src={mascota.sexo == "M" ? male : female} />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ItemListPet;
