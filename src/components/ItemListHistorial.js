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

const ItemListHistorial = ({
  id,
  cita,
  citaEdit,
  setCitaEdit,
  showModal,
  handleClose,
}) => {
  const [citaEditItem, setCitaEditItem] = useState({
    id: cita.id,
    fecha: cita.fecha,
    descripcion: cita.descripcion,
    idCliente: cita.idCliente,
    idMascota: cita.idMascota,
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
          eliminarHistorial();
        }}
        destructive={true}
        >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  // funcion para eliminar el historial
  const eliminarHistorial = () => {
    const urlDelete = "http://localhost:2813/sadvet/historial/deleteHistorial";

    const newCitaToDelete = {
      id:citaEditItem.id
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
// ----------------- LISTAR LAS CITAS -----------------
const [mascota, setMascota] = useState([]);
//const url = "http://srchicharron.com:8080/dancing-queen/citas/getallcitas";
const url = "http://localhost:2813/sadvet/mascota/getMascotaById?id="+citaEditItem.idMascota;
const getMascota = async () => {
  const req = await axios.get(url);
  setMascota(req.data);
};
useEffect(() => {
  getMascota();
}, []);

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="container__itemListcita">
          <div className="content__imagePet">
            <img className="back__pug" src={backpug} alt="backpug" />
            {mascota.idEspecie == 2 ? (
              <img className="pug" src={Pug} alt="Mascota" />
            ) : (
              <img className="cat" src={cat} alt="Mascota" />
            )}
          </div>
          <div className="content__information">
            <div className="content__name">
              <p className="cita__namePet">{mascota.nombre}</p>
            </div>
            <div className="content__info">
              <p>{mascota.peso}</p>
              <p>{cita.idMascota}</p>
              <p>{mascota.peso} kg</p>
            </div>
            <div className="content__datetime">
              <p>{cita.fecha}</p>
            </div>
            <div className="content__description">
              <p className="description">{cita.descripcion}</p>
            </div>
            <img
              className="icon__gender"
              src={mascota.idSexo == 2 ? male : female}
            />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ItemListHistorial;
