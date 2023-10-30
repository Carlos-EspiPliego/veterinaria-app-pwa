import React, { useState, useEffect } from "react";
import Pug from "@assets/images/pug.png";
import backpug from "@assets/images/Elipse.png";
import cat from "@assets/images/gato.png";
import male from "@assets/images/male.png";
import female from "@assets/images/female.png";
import "@styles/ItemListCita.scss";
import "@styles/swipeable-list.scss";
import useCitas from "@hooks/useCitas";
import axios from "axios";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

const ItemListCita = ({
  idCita,
  cita,
  citaEdit,
  setCitaEdit,
  showModal,
  handleClose,
}) => {
  const [citaEditItem, setCitaEditItem] = useState({
    idCita: cita.id,
    fecha: cita.fecha,
    descripcion: cita.descripcion,
    idCliente: cita.cliente.id,
    nombreCliente: cita.cliente.nombre,
    apellidosCliente: cita.cliente.apellidos,
    idMascota: cita.mascota.id,
    nombreMascota: cita.mascota.nombre,
  });
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setCitaEdit(citaEditItem);
          console.log(citaEditItem);
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
        onClick={() => {
          console.log("Eliminar");
          console.log(citaEditItem);
          eliminarCita();
        }}
        destructive={true}
        >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  // funcion para eliminar la cita
  const eliminarCita = () => {
    const urlDelete = "http://srchicharron.com:8080/dancing-queen/citas/deletecita";

    const newCitaToDelete = {
      id:citaEditItem.idCita
    };
    console.log("Datos de la newCita");
    console.log(newCitaToDelete);
    axios({
      method: "POST",
      url: urlDelete,
      data: JSON.stringify(newCitaToDelete),
      headers: { 
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Max-Age": "3600",
      "Access-Control-Allow-Headers": "x-requested-with, authorization",
      "Content-Type": "application/json" },
    })
    .then((response) => {
      console.log(response);
      //recargarCitas();
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
            {cita.mascota.especie == "PERRO" ? (
              <img className="pug" src={Pug} alt="Mascota" />
            ) : (
              <img className="cat" src={cat} alt="Mascota" />
            )}
          </div>
          <div className="content__information">
            <div className="content__name">
              <p className="cita__namePet">{cita.mascota.nombre}</p>
            </div>
            <div className="content__info">
              <p>{cita.mascota.raza}</p>
              <p>{cita.mascota.sexo}</p>
              <p>{cita.mascota.edad} años</p>
              <p>{cita.mascota.peso} kg</p>
            </div>
            <div className="content__datetime">
              <p>{cita.fecha}</p>
            </div>
            <div className="content__description">
              <p className="description">{cita.descripcion}</p>
            </div>
            <img
              className="icon__gender"
              src={cita.mascota.sexo == "M" ? male : female}
            />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ItemListCita;
