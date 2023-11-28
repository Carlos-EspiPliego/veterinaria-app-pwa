import React, { useContext, useState } from "react";
import AvatarH from "@assets/images/AvatarH.png";
import "@styles/ItemListCita.scss";
import "@styles/swipeable-list.scss";
import "react-swipeable-list/dist/styles.css";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import axios from "axios";

const ItemListCliente = ( props ) => {
  const {cliente, onDelete} = props;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => {
        // setClienteEdit(clienteEditItem);
        // console.log(clienteEdit);
        // console.log(clienteEditItem);
        // showModal();
      }}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => {
          console.log("eliminar -> " + cliente.username)
          onDelete(cliente.username);
        }}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        // leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        {/* <div className="container__itemListcliente">
          
            <img className="avatar" src={AvatarH} alt="AvatarCliente" />
          
          <div className="content__informationCliente">
            <div className="content__nameCliente">
              <p className="cita__nameCliente">{cliente.nombre} {cliente.apellidos}</p>
            </div>
            <div className="content__infoCliente">
              <p>{cliente.email}</p>
            </div>
            <div className="content__telefonoCliente">
              <p>{cliente.telefono}</p>
            </div>
            <div className="content__descriptionCliente">
            </div>
          </div>
        </div> */}
        <div className="container__itemListcita">
          <div className="content__imagePet">
            <img className="avatar" src={AvatarH} alt="AvatarCliente" />
          </div>
          <div className="content__information">
            <div className="content__name">
              <p className="cita__namePet">{cliente.nombre} {cliente.apellidos}</p>
            </div>
            <div className="content__info">
              <p>{cliente.email}</p>
            </div>
            <div className="content__datetime">
              <p>{cliente.telefono}</p>
            </div>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default ItemListCliente;